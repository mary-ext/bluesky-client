import type { RefOf, UnionOf } from '../../atp-schema.js';

import type { ModerationDecision } from '../types.js';

type PostEmbed = RefOf<'app.bsky.feed.defs#postView'>['embed'];

export type PostEmbedRecord = UnionOf<'app.bsky.embed.record#view'>;
export type PostEmbedRecordWithMedia = UnionOf<'app.bsky.embed.recordWithMedia#view'>;

export function assert(condition: any): asserts condition {
	if (!condition) {
		throw new Error(`Assertion failed`);
	}
}

export const mergeModerationDecisions = (...decisions: ModerationDecision[]): ModerationDecision => {
	// sort by highest priority
	decisions.sort((a, b) => {
		if (a.cause && b.cause) {
			return a.cause.priority - b.cause.priority;
		}

		if (a.cause) {
			return -1;
		}

		if (b.cause) {
			return 1;
		}

		return 0;
	});

	// use the top priority
	return decisions[0];
};

export const downgradeDecision = (decision: ModerationDecision, { alert }: { alert: boolean }) => {
	decision.blur = false;
	decision.blurMedia = false;
	decision.filter = false;
	decision.noOverride = false;
	decision.alert = alert;
};

export const isModerationDecisionNoop = (
	decision: ModerationDecision | undefined,
	opts?: { ignoreFilter: boolean },
): boolean => {
	if (!decision) {
		return true;
	}

	if (decision.alert) {
		return false;
	}

	if (decision.blur) {
		return false;
	}

	if (decision.filter && !opts?.ignoreFilter) {
		return false;
	}

	return true;
};

export const isQuotedPost = (embed: PostEmbed): embed is PostEmbedRecord => {
	return (
		!!embed &&
		embed.$type === 'app.bsky.embed.record#view' &&
		embed.record.$type === 'app.bsky.embed.record#viewRecord'
	);
};

export const isQuotedPostWithMedia = (embed: PostEmbed): embed is PostEmbedRecordWithMedia => {
	return (
		!!embed &&
		embed.$type === 'app.bsky.embed.recordWithMedia#view' &&
		embed.record.record.$type === 'app.bsky.embed.record#viewRecord'
	);
};
