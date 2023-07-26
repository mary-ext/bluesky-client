import { createModerationDecision } from '../internal/actions.js';

import type { ModerationDecision, ModerationOpts, ModerationSubjectFeedGenerator } from '../types.js';

export const decideFeedGenerator = (
	_subject: ModerationSubjectFeedGenerator,
	_opts: ModerationOpts,
): ModerationDecision => {
	// TODO handle labels applied on the feed generator itself
	return createModerationDecision();
};
