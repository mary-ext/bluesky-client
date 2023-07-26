import { createModerationDecision } from '../internal/actions.js';

import type { ModerationDecision, ModerationOpts, ModerationSubjectUserList } from '../types.js';

export const decideUserList = (
	_subject: ModerationSubjectUserList,
	_opts: ModerationOpts,
): ModerationDecision => {
	// TODO handle labels applied on the list itself
	return createModerationDecision();
};
