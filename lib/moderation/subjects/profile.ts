import * as Accumulator from '../internal/actions.js';

import type { Label, ModerationSubjectProfile, ModerationApplyOpts, ModerationDecision } from '../types.js';

export const decideProfile = (
	subject: ModerationSubjectProfile,
	opts: ModerationApplyOpts,
): ModerationDecision => {
	const accu = Accumulator.createModerationAccumulator();

	Accumulator.setIsMe(accu, subject.did === opts.userDid);

	for (const label of filterProfileLabels(subject.labels)) {
		Accumulator.addLabel(accu, label, opts);
	}

	return Accumulator.finalizeDecision(accu, opts);
};

export const filterProfileLabels = (labels?: Label[]): Label[] => {
	if (!labels) {
		return [];
	}

	return labels.filter((label) => label.uri.endsWith('/app.bsky.actor.profile/self'));
};
