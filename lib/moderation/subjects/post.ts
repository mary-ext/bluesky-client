import * as Accumulator from '../internal/actions.js';

import type { ModerationSubjectPost, ModerationApplyOpts, ModerationDecision } from '../types.js';

export const decidePost = (subject: ModerationSubjectPost, opts: ModerationApplyOpts): ModerationDecision => {
	const accu = Accumulator.createModerationAccumulator();

	Accumulator.setIsMe(accu, subject.author.did === opts.userDid);

	if (subject.labels?.length) {
		for (const label of subject.labels) {
			Accumulator.addLabel(accu, label, opts);
		}
	}

	return Accumulator.finalizeDecision(accu, opts);
};
