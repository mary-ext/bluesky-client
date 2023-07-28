import * as Accumulator from '../internal/actions.js';

import type { Label, ModerationDecision, ModerationOpts, ModerationSubjectProfile } from '../types.js';

export const decideAccount = (
	subject: ModerationSubjectProfile,
	opts: ModerationOpts,
): ModerationDecision => {
	const accu = Accumulator.createModerationAccumulator();
	const viewer = subject.viewer;

	Accumulator.setDid(accu, subject.did);

	if (subject.viewer?.muted) {
		if (subject.viewer?.mutedByList) {
			Accumulator.addMutedByList(accu, subject.viewer?.mutedByList);
		} else {
			Accumulator.addMuted(accu, subject.viewer?.muted);
		}
	}

	Accumulator.addBlocking(accu, viewer?.blocking);
	Accumulator.addBlockedBy(accu, viewer?.blockedBy);

	for (const label of filterAccountLabels(subject.labels)) {
		Accumulator.addLabel(accu, label, opts);
	}

	return Accumulator.finalizeDecision(accu, opts);
};

export const filterAccountLabels = (labels?: Label[]): Label[] => {
	if (!labels) {
		return [];
	}

	return labels.filter((label) => !label.uri.endsWith('/app.bsky.actor.profile/self'));
};
