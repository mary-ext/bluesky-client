import { EventEmitter } from './events.js';
import { decodeJwt } from './jwt.js';

import { type FetchHandlerResponse, defaultFetchHandler, isErrorResponse, XRPC } from './xrpc.js';
import { type Headers, ResponseType, httpResponseCodeToEnum } from './xrpc-utils.js';

import type { DID, Procedures, Queries } from './atp-schema.js';

export interface JwtToken {
	exp: number;
	iat: number;
}

export interface AtpAccessJwt extends JwtToken {
	scope: 'com.atproto.access' | 'com.atproto.appPass';
	sub: DID;
}

export interface AtpRefreshJwt extends JwtToken {
	scope: 'com.atproto.refresh';
	sub: DID;
	jti: string;
}

export interface AtpSessionData {
	refreshJwt: string;
	accessJwt: string;
	handle: string;
	did: DID;
	email?: string;
}

export type AgentEventMap = {
	sessionExpired: () => void;
	sessionUpdate: (session: AtpSessionData) => void;
};

export interface AgentOptions {
	serviceUri: string;
	fetch?: typeof defaultFetchHandler;
}

export class Agent extends EventEmitter<AgentEventMap> {
	rpc: XRPC<Queries, Procedures>;
	fetch: typeof defaultFetchHandler;

	session?: AtpSessionData;

	#refreshSessionPromise?: Promise<void>;

	constructor(options: AgentOptions) {
		super();

		this.fetch = options.fetch ?? defaultFetchHandler;

		this.rpc = new XRPC(options.serviceUri);
		this.rpc.fetch = this.#fetch.bind(this);
	}

	async login(options: AtpLoginOptions): Promise<AtpSessionData> {
		this.session = undefined;

		const res = await this.rpc.call('com.atproto.server.createSession', {
			data: {
				identifier: options.identifier,
				password: options.password,
			},
		});

		return (this.session = {
			accessJwt: res.data.accessJwt,
			refreshJwt: res.data.refreshJwt,
			handle: res.data.handle,
			did: res.data.did,
			email: res.data.email,
		});
	}

	async resumeSession(session: AtpSessionData): Promise<AtpSessionData> {
		const now = Date.now() / 1000 + 60 * 5;

		const refreshToken = decodeJwt(session.refreshJwt) as AtpRefreshJwt;

		if (now >= refreshToken.exp) {
			throw new Error('INVALID_TOKEN');
		}

		const accessToken = decodeJwt(session.accessJwt) as AtpAccessJwt;
		this.session = session;

		if (now >= accessToken.exp) {
			await this.#refreshSession();
		}

		if (!this.session) {
			throw new Error(`INVALID_TOKEN`);
		}

		return this.session;
	}

	async #fetch(
		httpUri: string,
		httpMethod: string,
		httpHeaders: Headers,
		httpReqBody: unknown,
	): Promise<FetchHandlerResponse> {
		await this.#refreshSessionPromise;

		let res = await this.fetch(httpUri, httpMethod, this.#addAuthHeader(httpHeaders), httpReqBody);

		if (isErrorResponse(res.body, ['ExpiredToken']) && this.session?.refreshJwt) {
			// refresh session
			await this.#refreshSession();

			if (this.session) {
				// retry fetch
				res = await this.fetch(httpUri, httpMethod, this.#addAuthHeader(httpHeaders), httpReqBody);
			}
		}

		return res;
	}

	#addAuthHeader(httpHeaders: Headers) {
		const session = this.session;

		if (!httpHeaders['authorization'] && session) {
			return {
				...httpHeaders,
				authorization: `Bearer ${session.accessJwt}`,
			};
		}

		return httpHeaders;
	}

	async #refreshSession() {
		if (this.#refreshSessionPromise) {
			return this.#refreshSessionPromise;
		}

		this.#refreshSessionPromise = this.#refreshSessionInner();

		try {
			await this.#refreshSessionPromise;
		} finally {
			this.#refreshSessionPromise = undefined;
		}
	}

	async #refreshSessionInner() {
		const session = this.session;

		if (!session || !session.refreshJwt) {
			return;
		}

		// we can't use `rpc.call` here because we've monkeypatched it to handle
		// expired token, as this is part of the expired token handling, we must
		// manually craft an rpc request

		// send the refresh request
		const url = new URL(`/xrpc/com.atproto.server.refreshSession`, this.rpc.serviceUri);

		const res = await this.fetch(
			url.toString(),
			'POST',
			{
				authorization: `Bearer ${session.refreshJwt}`,
			},
			undefined,
		);

		if (isErrorResponse(res.body, ['ExpiredToken', 'InvalidToken'])) {
			// failed due to a bad refresh token
			this.session = undefined;
			this.emit('sessionExpired');
		} else if (httpResponseCodeToEnum(res.status) === ResponseType.Success) {
			// succeeded, update the session
			this.session = {
				accessJwt: res.body.accessJwt,
				refreshJwt: res.body.refreshJwt,
				handle: res.body.handle,
				did: res.body.did,
			};

			this.emit('sessionUpdate', this.session);
		}
	}
}

export interface AtpLoginOptions {
	identifier: string;
	password: string;
}
