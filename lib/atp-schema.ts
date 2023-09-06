// This file is automatically generated, do not edit!
// Run scripts/generate-atp-schema.js to update this file.

export type CID = string;

export type DID = `did:${string}`;

export type Handle = string;

export type AtUri = string;

export type AtIdentifier = AtUri | Handle;

export interface AtBlob<T extends string = string> {
	$type: 'blob';
	mimeType: T;
	ref: {
		$link: string;
	};
	size: number;
}

export type ResponseOf<K extends keyof Queries | keyof Procedures> = K extends keyof Queries
	? Queries[K] extends { response: any }
		? Queries[K]['response']
		: unknown
	: K extends keyof Procedures
	? Procedures[K] extends { response: any }
		? Procedures[K]['response']
		: unknown
	: never;

export type RefOf<K extends keyof Objects> = Objects[K];
export type UnionOf<K extends keyof Objects> = Objects[K] & { $type: K };

export interface Queries {
	'app.bsky.actor.getPreferences': {
		response: {
			preferences: RefOf<'app.bsky.actor.defs#preferences'>;
		};
	};
	'app.bsky.actor.getProfile': {
		params: {
			actor: string;
		};
		response: RefOf<'app.bsky.actor.defs#profileViewDetailed'>;
	};
	'app.bsky.actor.getProfiles': {
		params: {
			actors: string[];
		};
		response: {
			profiles: RefOf<'app.bsky.actor.defs#profileViewDetailed'>[];
		};
	};
	'app.bsky.actor.getSuggestions': {
		params: {
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			actors: RefOf<'app.bsky.actor.defs#profileView'>[];
		};
	};
	'app.bsky.actor.searchActors': {
		params: {
			term?: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			actors: RefOf<'app.bsky.actor.defs#profileView'>[];
		};
	};
	'app.bsky.actor.searchActorsTypeahead': {
		params: {
			term?: string;
			limit?: number;
		};
		response: {
			actors: RefOf<'app.bsky.actor.defs#profileViewBasic'>[];
		};
	};
	'app.bsky.feed.describeFeedGenerator': {
		response: {
			did: DID;
			feeds: RefOf<'app.bsky.feed.describeFeedGenerator#feed'>[];
			links?: RefOf<'app.bsky.feed.describeFeedGenerator#links'>;
		};
	};
	'app.bsky.feed.getActorFeeds': {
		params: {
			actor: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			feeds: RefOf<'app.bsky.feed.defs#generatorView'>[];
		};
	};
	'app.bsky.feed.getActorLikes': {
		params: {
			actor: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			feed: RefOf<'app.bsky.feed.defs#feedViewPost'>[];
		};
		errors: {
			BlockedActor: {};
			BlockedByActor: {};
		};
	};
	'app.bsky.feed.getAuthorFeed': {
		params: {
			actor: string;
			limit?: number;
			cursor?: string;
			filter?: 'posts_with_replies' | 'posts_no_replies' | 'posts_with_media' | (string & {});
		};
		response: {
			cursor?: string;
			feed: RefOf<'app.bsky.feed.defs#feedViewPost'>[];
		};
		errors: {
			BlockedActor: {};
			BlockedByActor: {};
		};
	};
	'app.bsky.feed.getFeed': {
		params: {
			feed: AtUri;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			feed: RefOf<'app.bsky.feed.defs#feedViewPost'>[];
		};
		errors: {
			UnknownFeed: {};
		};
	};
	'app.bsky.feed.getFeedGenerator': {
		params: {
			feed: AtUri;
		};
		response: {
			view: RefOf<'app.bsky.feed.defs#generatorView'>;
			isOnline: boolean;
			isValid: boolean;
		};
	};
	'app.bsky.feed.getFeedGenerators': {
		params: {
			feeds: AtUri[];
		};
		response: {
			feeds: RefOf<'app.bsky.feed.defs#generatorView'>[];
		};
	};
	'app.bsky.feed.getFeedSkeleton': {
		params: {
			feed: AtUri;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			feed: RefOf<'app.bsky.feed.defs#skeletonFeedPost'>[];
		};
		errors: {
			UnknownFeed: {};
		};
	};
	'app.bsky.feed.getLikes': {
		params: {
			uri: AtUri;
			cid?: CID;
			limit?: number;
			cursor?: string;
		};
		response: {
			uri: AtUri;
			cid?: CID;
			cursor?: string;
			likes: RefOf<'app.bsky.feed.getLikes#like'>[];
		};
	};
	'app.bsky.feed.getPostThread': {
		params: {
			uri: AtUri;
			depth?: number;
			parentHeight?: number;
		};
		response: {
			thread:
				| UnionOf<'app.bsky.feed.defs#threadViewPost'>
				| UnionOf<'app.bsky.feed.defs#notFoundPost'>
				| UnionOf<'app.bsky.feed.defs#blockedPost'>;
		};
		errors: {
			NotFound: {};
		};
	};
	'app.bsky.feed.getPosts': {
		params: {
			uris: AtUri[];
		};
		response: {
			posts: RefOf<'app.bsky.feed.defs#postView'>[];
		};
	};
	'app.bsky.feed.getRepostedBy': {
		params: {
			uri: AtUri;
			cid?: CID;
			limit?: number;
			cursor?: string;
		};
		response: {
			uri: AtUri;
			cid?: CID;
			cursor?: string;
			repostedBy: RefOf<'app.bsky.actor.defs#profileView'>[];
		};
	};
	'app.bsky.feed.getSuggestedFeeds': {
		params: {
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			feeds: RefOf<'app.bsky.feed.defs#generatorView'>[];
		};
	};
	'app.bsky.feed.getTimeline': {
		params: {
			algorithm?: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			feed: RefOf<'app.bsky.feed.defs#feedViewPost'>[];
		};
	};
	'app.bsky.graph.getBlocks': {
		params: {
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			blocks: RefOf<'app.bsky.actor.defs#profileView'>[];
		};
	};
	'app.bsky.graph.getFollowers': {
		params: {
			actor: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			subject: RefOf<'app.bsky.actor.defs#profileView'>;
			cursor?: string;
			followers: RefOf<'app.bsky.actor.defs#profileView'>[];
		};
	};
	'app.bsky.graph.getFollows': {
		params: {
			actor: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			subject: RefOf<'app.bsky.actor.defs#profileView'>;
			cursor?: string;
			follows: RefOf<'app.bsky.actor.defs#profileView'>[];
		};
	};
	'app.bsky.graph.getList': {
		params: {
			list: AtUri;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			list: RefOf<'app.bsky.graph.defs#listView'>;
			items: RefOf<'app.bsky.graph.defs#listItemView'>[];
		};
	};
	'app.bsky.graph.getListMutes': {
		params: {
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			lists: RefOf<'app.bsky.graph.defs#listView'>[];
		};
	};
	'app.bsky.graph.getLists': {
		params: {
			actor: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			lists: RefOf<'app.bsky.graph.defs#listView'>[];
		};
	};
	'app.bsky.graph.getMutes': {
		params: {
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			mutes: RefOf<'app.bsky.actor.defs#profileView'>[];
		};
	};
	'app.bsky.notification.getUnreadCount': {
		params: {
			seenAt?: string;
		};
		response: {
			count: number;
		};
	};
	'app.bsky.notification.listNotifications': {
		params: {
			limit?: number;
			cursor?: string;
			seenAt?: string;
		};
		response: {
			cursor?: string;
			notifications: RefOf<'app.bsky.notification.listNotifications#notification'>[];
		};
	};
	'app.bsky.unspecced.getPopular': {
		params: {
			includeNsfw?: boolean;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			feed: RefOf<'app.bsky.feed.defs#feedViewPost'>[];
		};
	};
	'app.bsky.unspecced.getPopularFeedGenerators': {
		params: {
			limit?: number;
			cursor?: string;
			query?: string;
		};
		response: {
			cursor?: string;
			feeds: RefOf<'app.bsky.feed.defs#generatorView'>[];
		};
	};
	'app.bsky.unspecced.getTimelineSkeleton': {
		params: {
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			feed: RefOf<'app.bsky.feed.defs#skeletonFeedPost'>[];
		};
		errors: {
			UnknownFeed: {};
		};
	};
	'com.atproto.admin.getInviteCodes': {
		params: {
			sort?: 'recent' | 'usage' | (string & {});
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			codes: RefOf<'com.atproto.server.defs#inviteCode'>[];
		};
	};
	'com.atproto.admin.getModerationAction': {
		params: {
			id: number;
		};
		response: RefOf<'com.atproto.admin.defs#actionViewDetail'>;
	};
	'com.atproto.admin.getModerationActions': {
		params: {
			subject?: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			actions: RefOf<'com.atproto.admin.defs#actionView'>[];
		};
	};
	'com.atproto.admin.getModerationReport': {
		params: {
			id: number;
		};
		response: RefOf<'com.atproto.admin.defs#reportViewDetail'>;
	};
	'com.atproto.admin.getModerationReports': {
		params: {
			subject?: string;
			ignoreSubjects?: string[];
			actionedBy?: DID;
			reporters?: string[];
			resolved?: boolean;
			actionType?:
				| 'com.atproto.admin.defs#takedown'
				| 'com.atproto.admin.defs#flag'
				| 'com.atproto.admin.defs#acknowledge'
				| 'com.atproto.admin.defs#escalate'
				| (string & {});
			limit?: number;
			cursor?: string;
			reverse?: boolean;
		};
		response: {
			cursor?: string;
			reports: RefOf<'com.atproto.admin.defs#reportView'>[];
		};
	};
	'com.atproto.admin.getRecord': {
		params: {
			uri: AtUri;
			cid?: CID;
		};
		response: RefOf<'com.atproto.admin.defs#recordViewDetail'>;
		errors: {
			RecordNotFound: {};
		};
	};
	'com.atproto.admin.getRepo': {
		params: {
			did: DID;
		};
		response: RefOf<'com.atproto.admin.defs#repoViewDetail'>;
		errors: {
			RepoNotFound: {};
		};
	};
	'com.atproto.admin.searchRepos': {
		params: {
			term?: string;
			invitedBy?: string;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			repos: RefOf<'com.atproto.admin.defs#repoView'>[];
		};
	};
	'com.atproto.identity.resolveHandle': {
		params: {
			handle: Handle;
		};
		response: {
			did: DID;
		};
	};
	'com.atproto.label.queryLabels': {
		params: {
			uriPatterns: string[];
			sources?: DID[];
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			labels: RefOf<'com.atproto.label.defs#label'>[];
		};
	};
	'com.atproto.repo.describeRepo': {
		params: {
			repo: string;
		};
		response: {
			handle: Handle;
			did: DID;
			didDoc: unknown;
			collections: string[];
			handleIsCorrect: boolean;
		};
	};
	'com.atproto.repo.getRecord': {
		params: {
			repo: string;
			collection: string;
			rkey: string;
			cid?: CID;
		};
		response: {
			uri: AtUri;
			cid?: CID;
			value: unknown;
		};
	};
	'com.atproto.repo.listRecords': {
		params: {
			repo: string;
			collection: string;
			limit?: number;
			cursor?: string;
			rkeyStart?: string;
			rkeyEnd?: string;
			reverse?: boolean;
		};
		response: {
			cursor?: string;
			records: RefOf<'com.atproto.repo.listRecords#record'>[];
		};
	};
	'com.atproto.server.describeServer': {
		response: {
			inviteCodeRequired?: boolean;
			availableUserDomains: string[];
			links?: RefOf<'com.atproto.server.describeServer#links'>;
		};
	};
	'com.atproto.server.getAccountInviteCodes': {
		params: {
			includeUsed?: boolean;
			createAvailable?: boolean;
		};
		response: {
			codes: RefOf<'com.atproto.server.defs#inviteCode'>[];
		};
		errors: {
			DuplicateCreate: {};
		};
	};
	'com.atproto.server.getSession': {
		response: {
			handle: Handle;
			did: DID;
			email?: string;
		};
	};
	'com.atproto.server.listAppPasswords': {
		response: {
			passwords: RefOf<'com.atproto.server.listAppPasswords#appPassword'>[];
		};
		errors: {
			AccountTakedown: {};
		};
	};
	'com.atproto.sync.getBlob': {
		params: {
			did: DID;
			cid: CID;
		};
		response: unknown;
	};
	'com.atproto.sync.getBlocks': {
		params: {
			did: DID;
			cids: CID[];
		};
		response: unknown;
	};
	'com.atproto.sync.getCheckout': {
		params: {
			did: DID;
		};
		response: unknown;
	};
	'com.atproto.sync.getHead': {
		params: {
			did: DID;
		};
		response: {
			root: CID;
		};
		errors: {
			HeadNotFound: {};
		};
	};
	'com.atproto.sync.getLatestCommit': {
		params: {
			did: DID;
		};
		response: {
			cid: CID;
			rev: string;
		};
		errors: {
			RepoNotFound: {};
		};
	};
	'com.atproto.sync.getRecord': {
		params: {
			did: DID;
			collection: string;
			rkey: string;
			commit?: CID;
		};
		response: unknown;
	};
	'com.atproto.sync.getRepo': {
		params: {
			did: DID;
			since?: CID;
		};
		response: unknown;
	};
	'com.atproto.sync.listBlobs': {
		params: {
			did: DID;
			since?: CID;
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			cids: CID[];
		};
	};
	'com.atproto.sync.listRepos': {
		params: {
			limit?: number;
			cursor?: string;
		};
		response: {
			cursor?: string;
			repos: RefOf<'com.atproto.sync.listRepos#repo'>[];
		};
	};
}

export interface Procedures {
	'app.bsky.actor.putPreferences': {
		data: {
			preferences: RefOf<'app.bsky.actor.defs#preferences'>;
		};
	};
	'app.bsky.graph.muteActor': {
		data: {
			actor: string;
		};
	};
	'app.bsky.graph.muteActorList': {
		data: {
			list: AtUri;
		};
	};
	'app.bsky.graph.unmuteActor': {
		data: {
			actor: string;
		};
	};
	'app.bsky.graph.unmuteActorList': {
		data: {
			list: AtUri;
		};
	};
	'app.bsky.notification.registerPush': {
		data: {
			serviceDid: DID;
			token: string;
			platform: 'ios' | 'android' | 'web' | (string & {});
			appId: string;
		};
	};
	'app.bsky.notification.updateSeen': {
		data: {
			seenAt: string;
		};
	};
	'app.bsky.unspecced.applyLabels': {
		data: {
			labels: RefOf<'com.atproto.label.defs#label'>[];
		};
	};
	'com.atproto.admin.disableAccountInvites': {
		data: {
			account: DID;
			note?: string;
		};
	};
	'com.atproto.admin.disableInviteCodes': {
		data: {
			codes?: string[];
			accounts?: string[];
		};
	};
	'com.atproto.admin.enableAccountInvites': {
		data: {
			account: DID;
			note?: string;
		};
	};
	'com.atproto.admin.resolveModerationReports': {
		data: {
			actionId: number;
			reportIds: number[];
			createdBy: DID;
		};
		response: RefOf<'com.atproto.admin.defs#actionView'>;
	};
	'com.atproto.admin.reverseModerationAction': {
		data: {
			id: number;
			reason: string;
			createdBy: DID;
		};
		response: RefOf<'com.atproto.admin.defs#actionView'>;
	};
	'com.atproto.admin.sendEmail': {
		data: {
			recipientDid: DID;
			content: string;
			subject?: string;
		};
		response: {
			sent: boolean;
		};
	};
	'com.atproto.admin.takeModerationAction': {
		data: {
			action:
				| 'com.atproto.admin.defs#takedown'
				| 'com.atproto.admin.defs#flag'
				| 'com.atproto.admin.defs#acknowledge'
				| (string & {});
			subject: UnionOf<'com.atproto.admin.defs#repoRef'> | UnionOf<'com.atproto.repo.strongRef'>;
			subjectBlobCids?: CID[];
			createLabelVals?: string[];
			negateLabelVals?: string[];
			reason: string;
			durationInHours?: number;
			createdBy: DID;
		};
		response: RefOf<'com.atproto.admin.defs#actionView'>;
		errors: {
			SubjectHasAction: {};
		};
	};
	'com.atproto.admin.updateAccountEmail': {
		data: {
			account: string;
			email: string;
		};
	};
	'com.atproto.admin.updateAccountHandle': {
		data: {
			did: DID;
			handle: Handle;
		};
	};
	'com.atproto.identity.updateHandle': {
		data: {
			handle: Handle;
		};
	};
	'com.atproto.moderation.createReport': {
		data: {
			reasonType: RefOf<'com.atproto.moderation.defs#reasonType'>;
			reason?: string;
			subject: UnionOf<'com.atproto.admin.defs#repoRef'> | UnionOf<'com.atproto.repo.strongRef'>;
		};
		response: {
			id: number;
			reasonType: RefOf<'com.atproto.moderation.defs#reasonType'>;
			reason?: string;
			subject: UnionOf<'com.atproto.admin.defs#repoRef'> | UnionOf<'com.atproto.repo.strongRef'>;
			reportedBy: DID;
			createdAt: string;
		};
	};
	'com.atproto.repo.applyWrites': {
		data: {
			repo: string;
			validate?: boolean;
			writes: (
				| UnionOf<'com.atproto.repo.applyWrites#create'>
				| UnionOf<'com.atproto.repo.applyWrites#update'>
				| UnionOf<'com.atproto.repo.applyWrites#delete'>
			)[];
			swapCommit?: CID;
		};
		errors: {
			InvalidSwap: {};
		};
	};
	'com.atproto.repo.createRecord': {
		data: {
			repo: string;
			collection: string;
			rkey?: string;
			validate?: boolean;
			record: unknown;
			swapCommit?: CID;
		};
		response: {
			uri: AtUri;
			cid: CID;
		};
		errors: {
			InvalidSwap: {};
		};
	};
	'com.atproto.repo.deleteRecord': {
		data: {
			repo: string;
			collection: string;
			rkey: string;
			swapRecord?: CID;
			swapCommit?: CID;
		};
		errors: {
			InvalidSwap: {};
		};
	};
	'com.atproto.repo.putRecord': {
		data: {
			repo: string;
			collection: string;
			rkey: string;
			validate?: boolean;
			record: unknown;
			swapRecord?: CID;
			swapCommit?: CID;
		};
		response: {
			uri: AtUri;
			cid: CID;
		};
		errors: {
			InvalidSwap: {};
		};
	};
	'com.atproto.repo.uploadBlob': {
		data: Blob;
		response: {
			blob: AtBlob;
		};
	};
	'com.atproto.server.createAccount': {
		data: {
			email: string;
			handle: Handle;
			did?: DID;
			inviteCode?: string;
			password: string;
			recoveryKey?: string;
		};
		response: {
			accessJwt: string;
			refreshJwt: string;
			handle: Handle;
			did: DID;
		};
		errors: {
			InvalidHandle: {};
			InvalidPassword: {};
			InvalidInviteCode: {};
			HandleNotAvailable: {};
			UnsupportedDomain: {};
			UnresolvableDid: {};
			IncompatibleDidDoc: {};
		};
	};
	'com.atproto.server.createAppPassword': {
		data: {
			name: string;
		};
		response: RefOf<'com.atproto.server.createAppPassword#appPassword'>;
		errors: {
			AccountTakedown: {};
		};
	};
	'com.atproto.server.createInviteCode': {
		data: {
			useCount: number;
			forAccount?: DID;
		};
		response: {
			code: string;
		};
	};
	'com.atproto.server.createInviteCodes': {
		data: {
			codeCount: number;
			useCount: number;
			forAccounts?: DID[];
		};
		response: {
			codes: RefOf<'com.atproto.server.createInviteCodes#accountCodes'>[];
		};
	};
	'com.atproto.server.createSession': {
		data: {
			identifier: string;
			password: string;
		};
		response: {
			accessJwt: string;
			refreshJwt: string;
			handle: Handle;
			did: DID;
			email?: string;
		};
		errors: {
			AccountTakedown: {};
		};
	};
	'com.atproto.server.deleteAccount': {
		data: {
			did: DID;
			password: string;
			token: string;
		};
		errors: {
			ExpiredToken: {};
			InvalidToken: {};
		};
	};
	'com.atproto.server.deleteSession': {};
	'com.atproto.server.refreshSession': {
		response: {
			accessJwt: string;
			refreshJwt: string;
			handle: Handle;
			did: DID;
		};
		errors: {
			AccountTakedown: {};
		};
	};
	'com.atproto.server.requestAccountDelete': {};
	'com.atproto.server.requestPasswordReset': {
		data: {
			email: string;
		};
	};
	'com.atproto.server.resetPassword': {
		data: {
			token: string;
			password: string;
		};
		errors: {
			ExpiredToken: {};
			InvalidToken: {};
		};
	};
	'com.atproto.server.revokeAppPassword': {
		data: {
			name: string;
		};
	};
	'com.atproto.sync.notifyOfUpdate': {
		data: {
			hostname: string;
		};
	};
	'com.atproto.sync.requestCrawl': {
		data: {
			hostname: string;
		};
	};
	'com.atproto.temp.upgradeRepoVersion': {
		data: {
			did: DID;
			force?: boolean;
		};
	};
}

export interface Subscriptions {}

export interface Objects {
	'app.bsky.actor.defs#profileViewBasic': {
		did: DID;
		handle: Handle;
		displayName?: string;
		avatar?: string;
		viewer?: RefOf<'app.bsky.actor.defs#viewerState'>;
		labels?: RefOf<'com.atproto.label.defs#label'>[];
	};
	'app.bsky.actor.defs#profileView': {
		did: DID;
		handle: Handle;
		displayName?: string;
		description?: string;
		avatar?: string;
		indexedAt?: string;
		viewer?: RefOf<'app.bsky.actor.defs#viewerState'>;
		labels?: RefOf<'com.atproto.label.defs#label'>[];
	};
	'app.bsky.actor.defs#profileViewDetailed': {
		did: DID;
		handle: Handle;
		displayName?: string;
		description?: string;
		avatar?: string;
		banner?: string;
		followersCount?: number;
		followsCount?: number;
		postsCount?: number;
		indexedAt?: string;
		viewer?: RefOf<'app.bsky.actor.defs#viewerState'>;
		labels?: RefOf<'com.atproto.label.defs#label'>[];
	};
	'app.bsky.actor.defs#viewerState': {
		muted?: boolean;
		mutedByList?: RefOf<'app.bsky.graph.defs#listViewBasic'>;
		blockedBy?: boolean;
		blocking?: AtUri;
		following?: AtUri;
		followedBy?: AtUri;
	};
	'app.bsky.actor.defs#preferences': (
		| UnionOf<'app.bsky.actor.defs#adultContentPref'>
		| UnionOf<'app.bsky.actor.defs#contentLabelPref'>
		| UnionOf<'app.bsky.actor.defs#savedFeedsPref'>
	)[];
	'app.bsky.actor.defs#adultContentPref': {
		enabled: boolean;
	};
	'app.bsky.actor.defs#contentLabelPref': {
		label: string;
		visibility: 'show' | 'warn' | 'hide' | (string & {});
	};
	'app.bsky.actor.defs#savedFeedsPref': {
		pinned: AtUri[];
		saved: AtUri[];
	};
	'app.bsky.embed.external': {
		external: RefOf<'app.bsky.embed.external#external'>;
	};
	'app.bsky.embed.external#external': {
		uri: string;
		title: string;
		description: string;
		thumb?: AtBlob<`image/${string}`>;
	};
	'app.bsky.embed.external#view': {
		external: RefOf<'app.bsky.embed.external#viewExternal'>;
	};
	'app.bsky.embed.external#viewExternal': {
		uri: string;
		title: string;
		description: string;
		thumb?: string;
	};
	'app.bsky.embed.images': {
		images: RefOf<'app.bsky.embed.images#image'>[];
	};
	'app.bsky.embed.images#image': {
		image: AtBlob<`image/${string}`>;
		alt: string;
	};
	'app.bsky.embed.images#view': {
		images: RefOf<'app.bsky.embed.images#viewImage'>[];
	};
	'app.bsky.embed.images#viewImage': {
		thumb: string;
		fullsize: string;
		alt: string;
	};
	'app.bsky.embed.record': {
		record: RefOf<'com.atproto.repo.strongRef'>;
	};
	'app.bsky.embed.record#view': {
		record:
			| UnionOf<'app.bsky.embed.record#viewRecord'>
			| UnionOf<'app.bsky.embed.record#viewNotFound'>
			| UnionOf<'app.bsky.embed.record#viewBlocked'>
			| UnionOf<'app.bsky.feed.defs#generatorView'>
			| UnionOf<'app.bsky.graph.defs#listView'>;
	};
	'app.bsky.embed.record#viewRecord': {
		uri: AtUri;
		cid: CID;
		author: RefOf<'app.bsky.actor.defs#profileViewBasic'>;
		value: unknown;
		labels?: RefOf<'com.atproto.label.defs#label'>[];
		embeds?: (
			| UnionOf<'app.bsky.embed.images#view'>
			| UnionOf<'app.bsky.embed.external#view'>
			| UnionOf<'app.bsky.embed.record#view'>
			| UnionOf<'app.bsky.embed.recordWithMedia#view'>
		)[];
		indexedAt: string;
	};
	'app.bsky.embed.record#viewNotFound': {
		uri: AtUri;
		notFound: boolean;
	};
	'app.bsky.embed.record#viewBlocked': {
		uri: AtUri;
		blocked: boolean;
		author: RefOf<'app.bsky.feed.defs#blockedAuthor'>;
	};
	'app.bsky.embed.recordWithMedia': {
		record: RefOf<'app.bsky.embed.record'>;
		media: UnionOf<'app.bsky.embed.images'> | UnionOf<'app.bsky.embed.external'>;
	};
	'app.bsky.embed.recordWithMedia#view': {
		record: RefOf<'app.bsky.embed.record#view'>;
		media: UnionOf<'app.bsky.embed.images#view'> | UnionOf<'app.bsky.embed.external#view'>;
	};
	'app.bsky.feed.defs#postView': {
		uri: AtUri;
		cid: CID;
		author: RefOf<'app.bsky.actor.defs#profileViewBasic'>;
		record: unknown;
		embed?:
			| UnionOf<'app.bsky.embed.images#view'>
			| UnionOf<'app.bsky.embed.external#view'>
			| UnionOf<'app.bsky.embed.record#view'>
			| UnionOf<'app.bsky.embed.recordWithMedia#view'>;
		replyCount?: number;
		repostCount?: number;
		likeCount?: number;
		indexedAt: string;
		viewer?: RefOf<'app.bsky.feed.defs#viewerState'>;
		labels?: RefOf<'com.atproto.label.defs#label'>[];
	};
	'app.bsky.feed.defs#viewerState': {
		repost?: AtUri;
		like?: AtUri;
	};
	'app.bsky.feed.defs#feedViewPost': {
		post: RefOf<'app.bsky.feed.defs#postView'>;
		reply?: RefOf<'app.bsky.feed.defs#replyRef'>;
		reason?: UnionOf<'app.bsky.feed.defs#reasonRepost'>;
	};
	'app.bsky.feed.defs#replyRef': {
		root:
			| UnionOf<'app.bsky.feed.defs#postView'>
			| UnionOf<'app.bsky.feed.defs#notFoundPost'>
			| UnionOf<'app.bsky.feed.defs#blockedPost'>;
		parent:
			| UnionOf<'app.bsky.feed.defs#postView'>
			| UnionOf<'app.bsky.feed.defs#notFoundPost'>
			| UnionOf<'app.bsky.feed.defs#blockedPost'>;
	};
	'app.bsky.feed.defs#reasonRepost': {
		by: RefOf<'app.bsky.actor.defs#profileViewBasic'>;
		indexedAt: string;
	};
	'app.bsky.feed.defs#threadViewPost': {
		post: RefOf<'app.bsky.feed.defs#postView'>;
		parent?:
			| UnionOf<'app.bsky.feed.defs#threadViewPost'>
			| UnionOf<'app.bsky.feed.defs#notFoundPost'>
			| UnionOf<'app.bsky.feed.defs#blockedPost'>;
		replies?: (
			| UnionOf<'app.bsky.feed.defs#threadViewPost'>
			| UnionOf<'app.bsky.feed.defs#notFoundPost'>
			| UnionOf<'app.bsky.feed.defs#blockedPost'>
		)[];
	};
	'app.bsky.feed.defs#notFoundPost': {
		uri: AtUri;
		notFound: boolean;
	};
	'app.bsky.feed.defs#blockedPost': {
		uri: AtUri;
		blocked: boolean;
		author: RefOf<'app.bsky.feed.defs#blockedAuthor'>;
	};
	'app.bsky.feed.defs#blockedAuthor': {
		did: DID;
		viewer?: RefOf<'app.bsky.actor.defs#viewerState'>;
	};
	'app.bsky.feed.defs#generatorView': {
		uri: AtUri;
		cid: CID;
		did: DID;
		creator: RefOf<'app.bsky.actor.defs#profileView'>;
		displayName: string;
		description?: string;
		descriptionFacets?: RefOf<'app.bsky.richtext.facet'>[];
		avatar?: string;
		likeCount?: number;
		viewer?: RefOf<'app.bsky.feed.defs#generatorViewerState'>;
		indexedAt: string;
	};
	'app.bsky.feed.defs#generatorViewerState': {
		like?: AtUri;
	};
	'app.bsky.feed.defs#skeletonFeedPost': {
		post: AtUri;
		reason?: UnionOf<'app.bsky.feed.defs#skeletonReasonRepost'>;
	};
	'app.bsky.feed.defs#skeletonReasonRepost': {
		repost: AtUri;
	};
	'app.bsky.feed.describeFeedGenerator#feed': {
		uri: AtUri;
	};
	'app.bsky.feed.describeFeedGenerator#links': {
		privacyPolicy?: string;
		termsOfService?: string;
	};
	'app.bsky.feed.getLikes#like': {
		indexedAt: string;
		createdAt: string;
		actor: RefOf<'app.bsky.actor.defs#profileView'>;
	};
	'app.bsky.feed.post#replyRef': {
		root: RefOf<'com.atproto.repo.strongRef'>;
		parent: RefOf<'com.atproto.repo.strongRef'>;
	};
	'app.bsky.feed.post#entity': {
		index: RefOf<'app.bsky.feed.post#textSlice'>;
		type: string;
		value: string;
	};
	'app.bsky.feed.post#textSlice': {
		start: number;
		end: number;
	};
	'app.bsky.graph.defs#listViewBasic': {
		uri: AtUri;
		cid: CID;
		name: string;
		purpose: RefOf<'app.bsky.graph.defs#listPurpose'>;
		avatar?: string;
		viewer?: RefOf<'app.bsky.graph.defs#listViewerState'>;
		indexedAt?: string;
	};
	'app.bsky.graph.defs#listView': {
		uri: AtUri;
		cid: CID;
		creator: RefOf<'app.bsky.actor.defs#profileView'>;
		name: string;
		purpose: RefOf<'app.bsky.graph.defs#listPurpose'>;
		description?: string;
		descriptionFacets?: RefOf<'app.bsky.richtext.facet'>[];
		avatar?: string;
		viewer?: RefOf<'app.bsky.graph.defs#listViewerState'>;
		indexedAt: string;
	};
	'app.bsky.graph.defs#listItemView': {
		subject: RefOf<'app.bsky.actor.defs#profileView'>;
	};
	'app.bsky.graph.defs#listPurpose': 'app.bsky.graph.defs#modlist' | (string & {});
	'app.bsky.graph.defs#modlist': 'app.bsky.graph.defs#modlist';
	'app.bsky.graph.defs#listViewerState': {
		muted?: boolean;
	};
	'app.bsky.notification.listNotifications#notification': {
		uri: AtUri;
		cid: CID;
		author: RefOf<'app.bsky.actor.defs#profileView'>;
		reason: 'like' | 'repost' | 'follow' | 'mention' | 'reply' | 'quote' | (string & {});
		reasonSubject?: AtUri;
		record: unknown;
		isRead: boolean;
		indexedAt: string;
		labels?: RefOf<'com.atproto.label.defs#label'>[];
	};
	'app.bsky.richtext.facet': {
		index: RefOf<'app.bsky.richtext.facet#byteSlice'>;
		features: (UnionOf<'app.bsky.richtext.facet#mention'> | UnionOf<'app.bsky.richtext.facet#link'>)[];
	};
	'app.bsky.richtext.facet#mention': {
		did: DID;
	};
	'app.bsky.richtext.facet#link': {
		uri: string;
	};
	'app.bsky.richtext.facet#byteSlice': {
		byteStart: number;
		byteEnd: number;
	};
	'com.atproto.admin.defs#actionView': {
		id: number;
		action: RefOf<'com.atproto.admin.defs#actionType'>;
		durationInHours?: number;
		subject: UnionOf<'com.atproto.admin.defs#repoRef'> | UnionOf<'com.atproto.repo.strongRef'>;
		subjectBlobCids: string[];
		createLabelVals?: string[];
		negateLabelVals?: string[];
		reason: string;
		createdBy: DID;
		createdAt: string;
		reversal?: RefOf<'com.atproto.admin.defs#actionReversal'>;
		resolvedReportIds: number[];
	};
	'com.atproto.admin.defs#actionViewDetail': {
		id: number;
		action: RefOf<'com.atproto.admin.defs#actionType'>;
		durationInHours?: number;
		subject:
			| UnionOf<'com.atproto.admin.defs#repoView'>
			| UnionOf<'com.atproto.admin.defs#repoViewNotFound'>
			| UnionOf<'com.atproto.admin.defs#recordView'>
			| UnionOf<'com.atproto.admin.defs#recordViewNotFound'>;
		subjectBlobs: RefOf<'com.atproto.admin.defs#blobView'>[];
		createLabelVals?: string[];
		negateLabelVals?: string[];
		reason: string;
		createdBy: DID;
		createdAt: string;
		reversal?: RefOf<'com.atproto.admin.defs#actionReversal'>;
		resolvedReports: RefOf<'com.atproto.admin.defs#reportView'>[];
	};
	'com.atproto.admin.defs#actionViewCurrent': {
		id: number;
		action: RefOf<'com.atproto.admin.defs#actionType'>;
		durationInHours?: number;
	};
	'com.atproto.admin.defs#actionReversal': {
		reason: string;
		createdBy: DID;
		createdAt: string;
	};
	'com.atproto.admin.defs#actionType': '#takedown' | '#flag' | '#acknowledge' | '#escalate' | (string & {});
	'com.atproto.admin.defs#takedown': 'com.atproto.admin.defs#takedown';
	'com.atproto.admin.defs#flag': 'com.atproto.admin.defs#flag';
	'com.atproto.admin.defs#acknowledge': 'com.atproto.admin.defs#acknowledge';
	'com.atproto.admin.defs#escalate': 'com.atproto.admin.defs#escalate';
	'com.atproto.admin.defs#reportView': {
		id: number;
		reasonType: RefOf<'com.atproto.moderation.defs#reasonType'>;
		reason?: string;
		subjectRepoHandle?: string;
		subject: UnionOf<'com.atproto.admin.defs#repoRef'> | UnionOf<'com.atproto.repo.strongRef'>;
		reportedBy: DID;
		createdAt: string;
		resolvedByActionIds: number[];
	};
	'com.atproto.admin.defs#reportViewDetail': {
		id: number;
		reasonType: RefOf<'com.atproto.moderation.defs#reasonType'>;
		reason?: string;
		subject:
			| UnionOf<'com.atproto.admin.defs#repoView'>
			| UnionOf<'com.atproto.admin.defs#repoViewNotFound'>
			| UnionOf<'com.atproto.admin.defs#recordView'>
			| UnionOf<'com.atproto.admin.defs#recordViewNotFound'>;
		reportedBy: DID;
		createdAt: string;
		resolvedByActions: RefOf<'com.atproto.admin.defs#actionView'>[];
	};
	'com.atproto.admin.defs#repoView': {
		did: DID;
		handle: Handle;
		email?: string;
		relatedRecords: unknown[];
		indexedAt: string;
		moderation: RefOf<'com.atproto.admin.defs#moderation'>;
		invitedBy?: RefOf<'com.atproto.server.defs#inviteCode'>;
		invitesDisabled?: boolean;
		inviteNote?: string;
	};
	'com.atproto.admin.defs#repoViewDetail': {
		did: DID;
		handle: Handle;
		email?: string;
		relatedRecords: unknown[];
		indexedAt: string;
		moderation: RefOf<'com.atproto.admin.defs#moderationDetail'>;
		labels?: RefOf<'com.atproto.label.defs#label'>[];
		invitedBy?: RefOf<'com.atproto.server.defs#inviteCode'>;
		invites?: RefOf<'com.atproto.server.defs#inviteCode'>[];
		invitesDisabled?: boolean;
		inviteNote?: string;
	};
	'com.atproto.admin.defs#repoViewNotFound': {
		did: DID;
	};
	'com.atproto.admin.defs#repoRef': {
		did: DID;
	};
	'com.atproto.admin.defs#recordView': {
		uri: AtUri;
		cid: CID;
		value: unknown;
		blobCids: CID[];
		indexedAt: string;
		moderation: RefOf<'com.atproto.admin.defs#moderation'>;
		repo: RefOf<'com.atproto.admin.defs#repoView'>;
	};
	'com.atproto.admin.defs#recordViewDetail': {
		uri: AtUri;
		cid: CID;
		value: unknown;
		blobs: RefOf<'com.atproto.admin.defs#blobView'>[];
		labels?: RefOf<'com.atproto.label.defs#label'>[];
		indexedAt: string;
		moderation: RefOf<'com.atproto.admin.defs#moderationDetail'>;
		repo: RefOf<'com.atproto.admin.defs#repoView'>;
	};
	'com.atproto.admin.defs#recordViewNotFound': {
		uri: AtUri;
	};
	'com.atproto.admin.defs#moderation': {
		currentAction?: RefOf<'com.atproto.admin.defs#actionViewCurrent'>;
	};
	'com.atproto.admin.defs#moderationDetail': {
		currentAction?: RefOf<'com.atproto.admin.defs#actionViewCurrent'>;
		actions: RefOf<'com.atproto.admin.defs#actionView'>[];
		reports: RefOf<'com.atproto.admin.defs#reportView'>[];
	};
	'com.atproto.admin.defs#blobView': {
		cid: CID;
		mimeType: string;
		size: number;
		createdAt: string;
		details?: UnionOf<'com.atproto.admin.defs#imageDetails'> | UnionOf<'com.atproto.admin.defs#videoDetails'>;
		moderation?: RefOf<'com.atproto.admin.defs#moderation'>;
	};
	'com.atproto.admin.defs#imageDetails': {
		width: number;
		height: number;
	};
	'com.atproto.admin.defs#videoDetails': {
		width: number;
		height: number;
		length: number;
	};
	'com.atproto.label.defs#label': {
		src: DID;
		uri: string;
		cid?: CID;
		val: string;
		neg?: boolean;
		cts: string;
	};
	'com.atproto.label.defs#selfLabels': {
		values: RefOf<'com.atproto.label.defs#selfLabel'>[];
	};
	'com.atproto.label.defs#selfLabel': {
		val: string;
	};
	'com.atproto.label.subscribeLabels#labels': {
		seq: number;
		labels: RefOf<'com.atproto.label.defs#label'>[];
	};
	'com.atproto.label.subscribeLabels#info': {
		name: 'OutdatedCursor' | (string & {});
		message?: string;
	};
	'com.atproto.moderation.defs#reasonType':
		| 'com.atproto.moderation.defs#reasonSpam'
		| 'com.atproto.moderation.defs#reasonViolation'
		| 'com.atproto.moderation.defs#reasonMisleading'
		| 'com.atproto.moderation.defs#reasonSexual'
		| 'com.atproto.moderation.defs#reasonRude'
		| 'com.atproto.moderation.defs#reasonOther'
		| (string & {});
	'com.atproto.moderation.defs#reasonSpam': 'com.atproto.moderation.defs#reasonSpam';
	'com.atproto.moderation.defs#reasonViolation': 'com.atproto.moderation.defs#reasonViolation';
	'com.atproto.moderation.defs#reasonMisleading': 'com.atproto.moderation.defs#reasonMisleading';
	'com.atproto.moderation.defs#reasonSexual': 'com.atproto.moderation.defs#reasonSexual';
	'com.atproto.moderation.defs#reasonRude': 'com.atproto.moderation.defs#reasonRude';
	'com.atproto.moderation.defs#reasonOther': 'com.atproto.moderation.defs#reasonOther';
	'com.atproto.repo.applyWrites#create': {
		collection: string;
		rkey?: string;
		value: unknown;
	};
	'com.atproto.repo.applyWrites#update': {
		collection: string;
		rkey: string;
		value: unknown;
	};
	'com.atproto.repo.applyWrites#delete': {
		collection: string;
		rkey: string;
	};
	'com.atproto.repo.listRecords#record': {
		uri: AtUri;
		cid: CID;
		value: unknown;
	};
	'com.atproto.repo.strongRef': {
		uri: AtUri;
		cid: CID;
	};
	'com.atproto.server.createAppPassword#appPassword': {
		name: string;
		password: string;
		createdAt: string;
	};
	'com.atproto.server.createInviteCodes#accountCodes': {
		account: string;
		codes: string[];
	};
	'com.atproto.server.defs#inviteCode': {
		code: string;
		available: number;
		disabled: boolean;
		forAccount: string;
		createdBy: string;
		createdAt: string;
		uses: RefOf<'com.atproto.server.defs#inviteCodeUse'>[];
	};
	'com.atproto.server.defs#inviteCodeUse': {
		usedBy: DID;
		usedAt: string;
	};
	'com.atproto.server.describeServer#links': {
		privacyPolicy?: string;
		termsOfService?: string;
	};
	'com.atproto.server.listAppPasswords#appPassword': {
		name: string;
		createdAt: string;
	};
	'com.atproto.sync.listRepos#repo': {
		did: DID;
		head: CID;
	};
	'com.atproto.sync.subscribeRepos#commit': {
		seq: number;
		rebase: boolean;
		tooBig: boolean;
		repo: DID;
		commit: unknown;
		prev?: unknown;
		rev: string;
		since: string;
		blocks: unknown;
		ops: RefOf<'com.atproto.sync.subscribeRepos#repoOp'>[];
		blobs: unknown[];
		time: string;
	};
	'com.atproto.sync.subscribeRepos#handle': {
		seq: number;
		did: DID;
		handle: Handle;
		time: string;
	};
	'com.atproto.sync.subscribeRepos#migrate': {
		seq: number;
		did: DID;
		migrateTo: string;
		time: string;
	};
	'com.atproto.sync.subscribeRepos#tombstone': {
		seq: number;
		did: DID;
		time: string;
	};
	'com.atproto.sync.subscribeRepos#info': {
		name: 'OutdatedCursor' | (string & {});
		message?: string;
	};
	'com.atproto.sync.subscribeRepos#repoOp': {
		action: 'create' | 'update' | 'delete' | (string & {});
		path: string;
		cid: unknown;
	};
}

export interface Records {
	'app.bsky.actor.profile': {
		displayName?: string;
		description?: string;
		avatar?: AtBlob<`image/png` | `image/jpeg`>;
		banner?: AtBlob<`image/png` | `image/jpeg`>;
		labels?: UnionOf<'com.atproto.label.defs#selfLabels'>;
	};
	'app.bsky.feed.generator': {
		did: DID;
		displayName: string;
		description?: string;
		descriptionFacets?: RefOf<'app.bsky.richtext.facet'>[];
		avatar?: AtBlob<`image/png` | `image/jpeg`>;
		labels?: UnionOf<'com.atproto.label.defs#selfLabels'>;
		createdAt: string;
	};
	'app.bsky.feed.like': {
		subject: RefOf<'com.atproto.repo.strongRef'>;
		createdAt: string;
	};
	'app.bsky.feed.post': {
		text: string;
		entities?: RefOf<'app.bsky.feed.post#entity'>[];
		facets?: RefOf<'app.bsky.richtext.facet'>[];
		reply?: RefOf<'app.bsky.feed.post#replyRef'>;
		embed?:
			| UnionOf<'app.bsky.embed.images'>
			| UnionOf<'app.bsky.embed.external'>
			| UnionOf<'app.bsky.embed.record'>
			| UnionOf<'app.bsky.embed.recordWithMedia'>;
		langs?: string[];
		labels?: UnionOf<'com.atproto.label.defs#selfLabels'>;
		createdAt: string;
	};
	'app.bsky.feed.repost': {
		subject: RefOf<'com.atproto.repo.strongRef'>;
		createdAt: string;
	};
	'app.bsky.graph.block': {
		subject: DID;
		createdAt: string;
	};
	'app.bsky.graph.follow': {
		subject: DID;
		createdAt: string;
	};
	'app.bsky.graph.list': {
		purpose: RefOf<'app.bsky.graph.defs#listPurpose'>;
		name: string;
		description?: string;
		descriptionFacets?: RefOf<'app.bsky.richtext.facet'>[];
		avatar?: AtBlob<`image/png` | `image/jpeg`>;
		labels?: UnionOf<'com.atproto.label.defs#selfLabels'>;
		createdAt: string;
	};
	'app.bsky.graph.listitem': {
		subject: DID;
		list: AtUri;
		createdAt: string;
	};
}
