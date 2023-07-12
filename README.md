# bluesky-client

Lightweight API client for Bluesky/AT Protocol.

```
npm install @intrnl/bluesky-client
```

## Why?

The official `@atproto/api` library is big!

- The lexicon codegen generates a ton of classes and functions due to the API being designed around RPC and namespaces. These can't be treeshaken at all if you only need access to some of the endpoints.
- The library unnecessarily bundles dependencies like `graphemer` and `zod`, which causes duplication in your app code if you also rely on said libraries.

The points above leads to `@intrnl/bluesky-client`, where the following tradeoffs are made instead:

- We only provide TypeScript definitions for endpoints, objects, and records, as such **there is no validation done in the library, proceed with caution**.
- Queries and procedures are not accessed via property access, you're typing the nsid as a string instead.

  ```typescript
  // ❎️
  agent.app.bsky.actor.getProfile({ actor: 'did:plc:ragtjsm2j2vknwkz3zp4oxrd' });

  // ✅️
  agent.rpc.get('app.bsky.actor.getProfile', {
  	params: {
  		actor: 'did:plc:ragtjsm2j2vknwkz3zp4oxrd',
  	},
  });
  ```

- No RichText class for handling texts with facets, examples as to how you can
  deal with RichText are available on the `examples/` folder.

## Usage

Creating an agent to make requests...

```ts
import { Agent } from '@intrnl/bluesky-client/agent';

const agent = new Agent({ serviceUri: '...' });

await agent.login({
	identifier: '...',
	password: '...',
});

const profile = await agent.rpc.get('app.bsky.actor.getProfile', {
	params: {
		actor: 'did:plc:ragtjsm2j2vknwkz3zp4oxrd',
	},
});

console.log(profile);
```

Fiddling with AT Proto schema...

```ts
import { type UnionOf } from '@intrnl/bluesky-client/atp-schema';

type MentionFacet = UnionOf<'app.bsky.richtext.facet#mention'>;

const mention: MentionFacet = {
	$type: 'app.bsky.richtext.facet#mention',
	did: 'did:plc:ragtjsm2j2vknwkz3zp4oxrd',
};
```
