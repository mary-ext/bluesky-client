import * as Accumulator from '../internal/actions.js';

import type { Label, ModerationSubjectProfile, ModerationApplyOpts, ModerationDecision } from '../types.js';

export const decideAccount = (
	subject: ModerationSubjectProfile,
	opts: ModerationApplyOpts,
): ModerationDecision => {
	const accu = Accumulator.createModerationAccumulator();
	const viewer = subject.viewer;

	Accumulator.setIsMe(accu, subject.did === opts.userDid);
	Accumulator.addMuted(accu, viewer?.muted);
	Accumulator.addMutedByList(accu, viewer?.mutedByList);
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
