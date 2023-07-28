import type { RefOf, UnionOf } from '../../atp-schema.js';

import type { ModerationDecision, ModerationUI } from '../types.js';
import { createModerationDecision } from './actions.js';

type PostEmbed = RefOf<'app.bsky.feed.defs#postView'>['embed'];

export type PostEmbedRecord = UnionOf<'app.bsky.embed.record#view'>;
export type PostEmbedRecordWithMedia = UnionOf<'app.bsky.embed.recordWithMedia#view'>;

export function assert(condition: any): asserts condition {
	if (!condition) {
		throw new Error(`Assertion failed`);
	}
}

export const takeHighestPriorityDecision = (
	...decisions: (ModerationDecision | undefined)[]
): ModerationDecision => {
	// remove undefined decisions
	const filtered = decisions.filter((d) => !!d) as ModerationDecision[];

	if (filtered.length === 0) {
		return createModerationDecision();
	}

	// sort by highest priority
	filtered.sort((a, b) => {
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
	return filtered[0];
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

export const toModerationUI = (decision: ModerationDecision): ModerationUI => {
	return {
		cause: decision.cause,
		filter: decision.filter,
		blur: decision.blur,
		alert: decision.alert,
		noOverride: decision.noOverride,
	};
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
