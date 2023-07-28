import type { DID, RefOf } from '../atp-schema.js';

// labels
// =

export type Label = RefOf<'com.atproto.label.defs#label'>;

export type LabelPreference = 'ignore' | 'warn' | 'hide';
export type LabelDefinitionFlag = 'no-override' | 'adult';
export type LabelDefinitionOnWarnBehavior = 'blur' | 'blur-media' | 'alert' | null;

export interface LabelDefinitionLocalizedStrings {
	name: string;
	description: string;
}

export type LabelDefinitionLocalizedStringsMap = Record<string, LabelDefinitionLocalizedStrings>;

export interface LabelDefinition {
	id: string;
	groupId: string;
	configurable: boolean;
	preferences: LabelPreference[];
	flags: LabelDefinitionFlag[];
	onwarn: LabelDefinitionOnWarnBehavior;
}

export interface LabelGroupDefinition {
	id: string;
	configurable: boolean;
	labels: LabelDefinition[];
}

export type LabelDefinitionMap = Record<string, LabelDefinition>;
export type LabelGroupDefinitionMap = Record<string, LabelGroupDefinition>;

// labelers
// =

interface Labeler {
	did: string;
	displayName: string;
}

export interface LabelerSettings {
	labeler: Labeler;
	settings: Record<string, LabelPreference>;
}

// subjects
// =

export type ModerationSubjectProfile =
	| RefOf<'app.bsky.actor.defs#profileViewBasic'>
	| RefOf<'app.bsky.actor.defs#profileView'>
	| RefOf<'app.bsky.actor.defs#profileViewDetailed'>;

export type ModerationSubjectPost = RefOf<'app.bsky.feed.defs#postView'>;

export type ModerationSubjectFeedGenerator = RefOf<'app.bsky.feed.defs#generatorView'>;

export type ModerationSubjectUserList =
	| RefOf<'app.bsky.graph.defs#listViewBasic'>
	| RefOf<'app.bsky.graph.defs#listView'>;

export type ModerationSubject =
	| ModerationSubjectProfile
	| ModerationSubjectPost
	| ModerationSubjectFeedGenerator
	| ModerationSubjectUserList;

// behaviors
// =

export type ModerationCauseSource =
	| { type: 'user' }
	| { type: 'list'; list: RefOf<'app.bsky.graph.defs#listViewBasic'> };

export type ModerationCause =
	| { type: 'blocking'; source: ModerationCauseSource; priority: 3 }
	| { type: 'blocked-by'; source: ModerationCauseSource; priority: 4 }
	| {
			type: 'label';
			labeler: Labeler;
			label: Label;
			labelDef: LabelDefinition;
			setting: LabelPreference;
			priority: 1 | 2 | 5 | 7 | 8;
	  }
	| { type: 'muted'; source: ModerationCauseSource; priority: 6 };

export interface ModerationOpts {
	userDid: string;
	adultContentEnabled: boolean;
	labelerSettings: LabelerSettings[];
}

export interface ModerationDecision {
	did: DID | undefined;
	cause: ModerationCause | undefined;
	alert: boolean;
	blur: boolean;
	blurMedia: boolean;
	filter: boolean;
	noOverride: boolean;
	additionalCauses: ModerationCause[];
}

export interface ModerationUI {
	filter?: boolean;
	blur?: boolean;
	alert?: boolean;
	cause?: ModerationCause;
	noOverride?: boolean;
}
