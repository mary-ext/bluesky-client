import * as Accumulator from '../internal/actions.js';

import type { ModerationDecision, ModerationOpts, ModerationSubjectPost } from '../types.js';

export const decidePost = (subject: ModerationSubjectPost, opts: ModerationOpts): ModerationDecision => {
	const accu = Accumulator.createModerationAccumulator();

	Accumulator.setDid(accu, subject.author.did);

	if (subject.labels?.length) {
		for (const label of subject.labels) {
			Accumulator.addLabel(accu, label, opts);
		}
	}

	return Accumulator.finalizeDecision(accu, opts);
};
