import { createModerationDecision } from '../internal/actions.js';

import type { ModerationSubjectFeedGenerator, ModerationDecision, ModerationApplyOpts } from '../types.js';

export const decideFeedGenerator = (
	_subject: ModerationSubjectFeedGenerator,
	_opts: ModerationApplyOpts,
): ModerationDecision => {
	// TODO handle labels applied on the feed generator itself
	return createModerationDecision();
};
