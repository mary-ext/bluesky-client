// https://github.com/bluesky-social/atproto/blob/7e060ea7746d64278c0c0f6c97c103bff7299bc2/packages/api/src/moderation/accumulator.ts#L113

import type { DID, RefOf } from '../../atp-schema.js';

import { LABELS } from '../constants/labels.js';

import type {
	Label,
	LabelDefinitionPreference,
	ModerationCause,
	ModerationDecision,
	ModerationOpts,
} from '../types.js';

export const createModerationDecision = (did?: DID): ModerationDecision => {
	return {
		did: did,
		cause: undefined,
		alert: false,
		blur: false,
		blurMedia: false,
		filter: false,
		noOverride: false,
		additionalCauses: [],
	};
};

interface ModerationAccumulator {
	_did?: DID;
	_causes: ModerationCause[];
}

export const createModerationAccumulator = (): ModerationAccumulator => {
	return {
		_did: undefined,
		_causes: [],
	};
};

export const setDid = (accu: ModerationAccumulator, did: DID) => {
	accu._did = did;
};

export const addBlocking = (accu: ModerationAccumulator, blocking: string | undefined) => {
	if (blocking) {
		accu._causes.push({
			type: 'blocking',
			source: { type: 'user' },
			priority: 3,
		});
	}
};

export const addBlockedBy = (accu: ModerationAccumulator, blockedBy: boolean | undefined) => {
	if (blockedBy) {
		accu._causes.push({
			type: 'blocked-by',
			source: { type: 'user' },
			priority: 4,
		});
	}
};

export const addMuted = (accu: ModerationAccumulator, muted: boolean | undefined) => {
	if (muted) {
		accu._causes.push({
			type: 'muted',
			source: { type: 'user' },
			priority: 6,
		});
	}
};

export const addMutedByList = (
	accu: ModerationAccumulator,
	list: RefOf<'app.bsky.graph.defs#listViewBasic'> | undefined,
) => {
	if (list) {
		accu._causes.push({
			type: 'muted',
			source: { type: 'list', list: list },
			priority: 6,
		});
	}
};

export const addLabel = (accu: ModerationAccumulator, label: Label, opts: ModerationOpts) => {
	// look up the label definition
	const labelDef = LABELS[label.val];
	if (!labelDef) {
		// ignore labels we don't understand
		return;
	}

	// look up the label preference
	const labelerSettings = opts.labelerSettings.find((s) => s.labeler.did === label.src);
	if (!labelerSettings) {
		// ignore labels from labelers we don't use
		return;
	}

	// establish the label preference for interpretation
	let labelPref: LabelDefinitionPreference = 'ignore';
	if (!labelDef.configurable) {
		labelPref = labelDef.preferences[0];
	} else if (labelDef.flags.includes('adult') && !opts.adultContentEnabled) {
		labelPref = 'hide';
	} else if (labelerSettings.settings[label.val]) {
		labelPref = labelerSettings.settings[label.val];
	}

	// ignore labels the user has asked to ignore
	if (labelPref === 'ignore') {
		return;
	}

	// establish the priority of the label
	let priority: 1 | 2 | 5 | 7 | 8
	if (labelDef.flags.includes('no-override')) {
		priority = 1
	} else if (labelPref === 'hide') {
		priority = 2
	} else if (labelDef.onwarn === 'blur') {
		priority = 5;
	} else if (labelDef.onwarn === 'blur-media') {
		priority = 7;
	} else {
		priority = 8;
	}

	accu._causes.push({
		type: 'label',
		label,
		labelDef,
		labeler: labelerSettings.labeler,
		setting: labelPref,
		priority,
	});
};

export const finalizeDecision = (accu: ModerationAccumulator, opts: ModerationOpts): ModerationDecision => {
	const mod = createModerationDecision(accu._did!);
	if (!accu._causes.length) {
		return mod;
	}

	// sort the causes by priority and then choose the top one
	accu._causes.sort((a, b) => a.priority - b.priority);
	mod.cause = accu._causes[0];
	mod.additionalCauses = accu._causes.slice(1);

	// blocked user
	if (mod.cause.type === 'blocking' || mod.cause.type === 'blocked-by') {
		// filter and blur, dont allow override
		mod.filter = true;
		mod.blur = true;
		mod.noOverride = true;
	}
	// muted user
	else if (mod.cause.type === 'muted') {
		// filter and blur
		mod.filter = true;
		mod.blur = true;
	}
	// labeled subject
	else if (mod.cause.type === 'label') {
		// 'hide' setting
		if (mod.cause.setting === 'hide') {
			// filter
			mod.filter = true;
		}

		// 'hide' and 'warn' setting, apply onwarn
		switch (mod.cause.labelDef.onwarn) {
			case 'alert':
				mod.alert = true;
				break;
			case 'blur':
				mod.blur = true;
				break;
			case 'blur-media':
				mod.blurMedia = true;
				break;
			case null:
				// do nothing
				break;
		}

		// apply noOverride as needed
		if (mod.cause.labelDef.flags.includes('no-override')) {
			mod.noOverride = true;
		} else if (mod.cause.labelDef.flags.includes('adult') && !opts.adultContentEnabled) {
			mod.noOverride = true;
		}
	}

	return mod;
};
