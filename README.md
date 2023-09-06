# bluesky-client

[![library size badge](https://deno.bundlejs.com/badge?q=@intrnl/bluesky-client@latest/agent)](https://bundlejs.com/?q=@intrnl/bluesky-client@latest/agent)

Lightweight API client for Bluesky/AT Protocol.

```
npm install @intrnl/bluesky-client
```

## Why?

The official `@atproto/api` library is big! [![library size badge](https://deno.bundlejs.com/badge?q=@atproto/api@latest)](https://bundlejs.com/?q=@atproto/api@latest)

- The lexicon codegen generates a ton of classes and functions due to the API being designed around RPC and namespaces. These can't be treeshaken at all if you only need access to some of the endpoints.
- The library unnecessarily bundles dependencies like `graphemer` and `zod`, which causes duplication in your app code if you also rely on said libraries.

The points above leads to `@intrnl/bluesky-client`, where the following tradeoffs are made instead:

- We only provide TypeScript definitions for endpoints, objects, and records, **there is no runtime validation done in the library, proceed with caution**.
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

- No RichText class for handling texts with facets, examples as to how you can deal with RichText are available on the `examples/` folder.
- No Moderation API for taking actions based on certain labels or status, this should be very trivial so long as you [follow the official documentations on how it should be dealt with](https://github.com/bluesky-social/atproto/blob/main/packages/api/docs/moderation.md).

## Usage

### Creating an agent to make requests...

```ts
import { Agent } from '@intrnl/bluesky-client/agent';

const agent = new Agent({ serviceUri: 'https://bsky.social' });

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

### Fiddling with AT Proto schema...

```ts
import { type UnionOf } from '@intrnl/bluesky-client/atp-schema';

type MentionFacet = UnionOf<'app.bsky.richtext.facet#mention'>;

const mention: MentionFacet = {
	$type: 'app.bsky.richtext.facet#mention',
	did: 'did:plc:ragtjsm2j2vknwkz3zp4oxrd',
};
```

- `RefOf` types are used for referencing an object within another object or record.
- `UnionOf` types are used in places where a field can contain multiple references, requiring a `$type` field to differentiate the reference.
