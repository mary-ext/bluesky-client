import type { LabelGroupDefinitionMap } from '../types.js';
import { LABELS } from './labels.js';

export const LABEL_GROUPS: LabelGroupDefinitionMap = {
	system: {
		id: 'system',
		configurable: false,
		labels: [LABELS['!hide'], LABELS['!no-promote'], LABELS['!warn']],
	},
	legal: {
		id: 'legal',
		configurable: false,
		labels: [LABELS['nudity-nonconsensual'], LABELS['dmca-violation'], LABELS['doxxing']],
	},

	sexual: {
		id: 'sexual',
		configurable: true,
		labels: [LABELS['porn'], LABELS['sexual'], LABELS['nudity']],
	},
	violence: {
		id: 'violence',
		configurable: true,
		labels: [LABELS['nsfl'], LABELS['corpse'], LABELS['gore'], LABELS['torture'], LABELS['self-harm']],
	},
	intolerance: {
		id: 'intolerance',
		configurable: true,
		labels: [
			LABELS['intolerant-race'],
			LABELS['intolerant-gender'],
			LABELS['intolerant-sexual-orientation'],
			LABELS['intolerant-religion'],
			LABELS['intolerant'],
			LABELS['icon-intolerant'],
		],
	},
	rude: {
		id: 'rude',
		configurable: true,
		labels: [LABELS['trolling'], LABELS['harassment'], LABELS['bullying'], LABELS['threat']],
	},
	curation: {
		id: 'curation',
		configurable: true,
		labels: [
			LABELS['disgusting'],
			LABELS['upsetting'],
			LABELS['profane'],
			LABELS['politics'],
			LABELS['troubling'],
			LABELS['negative'],
			LABELS['discourse'],
			LABELS['spoiler'],
		],
	},
	spam: {
		id: 'spam',
		configurable: true,
		labels: [LABELS['spam'], LABELS['clickbait'], LABELS['shill'], LABELS['promotion']],
	},
	misinfo: {
		id: 'misinfo',
		configurable: true,
		labels: [
			LABELS['account-security'],
			LABELS['net-abuse'],
			LABELS['impersonation'],
			LABELS['scam'],
			LABELS['misinformation'],
			LABELS['unverified'],
			LABELS['manipulated'],
			LABELS['fringe'],
			LABELS['bullshit'],
		],
	},
};
