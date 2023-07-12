
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
}

export interface Procedures {
}

export interface Subscriptions {
}

export interface Objects {
}

export interface Records {
}
