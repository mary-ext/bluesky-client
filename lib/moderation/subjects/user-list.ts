import { createModerationDecision } from '../internal/actions.js';

import type { ModerationSubjectUserList, ModerationApplyOpts, ModerationDecision } from '../types.js';

export const decideUserList = (
	_subject: ModerationSubjectUserList,
	_opts: ModerationApplyOpts,
): ModerationDecision => {
	// TODO handle labels applied on the list itself
	return createModerationDecision();
};
