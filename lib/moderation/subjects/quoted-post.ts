import * as Accumulator from '../internal/actions.js';
import { assert, type PostEmbedRecord, type PostEmbedRecordWithMedia } from '../internal/utils.js';

import type { ModerationApplyOpts, ModerationDecision } from '../types.js';

import { decideAccount } from './account.js';

// `isQuotedPost` and `isQuotedPostWithMedia` already checked the types for the
// record, there isn't any need to do that again here.

export const decideQuotedPost = (subject: PostEmbedRecord, opts: ModerationApplyOpts): ModerationDecision => {
	const accu = Accumulator.createModerationAccumulator();
	const record = subject.record;

	dev: assert(record.$type === 'app.bsky.embed.record#viewRecord');

	const labels = record.labels;

	Accumulator.setIsMe(accu, record.author.did === opts.userDid);

	if (labels?.length) {
		for (const label of labels) {
			Accumulator.addLabel(accu, label, opts);
		}
	}

	return Accumulator.finalizeDecision(accu, opts);
};

export const decideQuotedPostAccount = (
	subject: PostEmbedRecord,
	opts: ModerationApplyOpts,
): ModerationDecision => {
	dev: assert(subject.record.$type === 'app.bsky.embed.record#viewRecord');

	return decideAccount(subject.record.author, opts);
};

export const decideQuotedPostWithMedia = (
	subject: PostEmbedRecordWithMedia,
	opts: ModerationApplyOpts,
): ModerationDecision => {
	const accu = Accumulator.createModerationAccumulator();
	const record = subject.record.record;

	dev: assert(record.$type === 'app.bsky.embed.record#viewRecord');

	const labels = record.labels;

	Accumulator.setIsMe(accu, record.author.did === opts.userDid);

	if (labels?.length) {
		for (const label of labels) {
			Accumulator.addLabel(accu, label, opts);
		}
	}

	return Accumulator.finalizeDecision(accu, opts);
};

export const decideQuotedPostWithMediaAccount = (
	subject: PostEmbedRecordWithMedia,
	opts: ModerationApplyOpts,
): ModerationDecision => {
	dev: assert(subject.record.record.$type === 'app.bsky.embed.record#viewRecord');

	return decideAccount(subject.record.record.author, opts);
};
