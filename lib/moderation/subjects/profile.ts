import * as Accumulator from '../internal/actions.js';

import type { Label, ModerationDecision, ModerationOpts, ModerationSubjectProfile } from '../types.js';

export const decideProfile = (
	subject: ModerationSubjectProfile,
	opts: ModerationOpts,
): ModerationDecision => {
	const accu = Accumulator.createModerationAccumulator();

	Accumulator.setDid(accu, subject.did);

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
