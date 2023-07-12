import * as process from 'node:process';
import * as fs from 'node:fs';

const writers = {
	queries: [],
	procedures: [],
	subscriptions: [],
	objects: [],
	records: [],
};

const wrap = (chunks, prefix, suffix) => {
	return prefix + (chunks.length > 0 ? '\n\t' + chunks.join('\n\t') : '') + '\n' + suffix;
};

const t = (level, input) => {
	return level > 0 ? '\t'.repeat(level).concat(input) : input;
};

const resolveType = (lv, ns, def) => {
	const type = def.type;
	let value = 'unknown';

	if (type === 'unknown') {
		value = 'unknown';
	} else if (type === 'number' || type === 'integer') {
		value = 'number';
	} else if (type === 'boolean') {
		value = 'boolean';
	} else if (type === 'string') {
		const known = def.knownValues;
		const format = def.format;

		if (known) {
			value = `${known.map((val) => `'${val}'`).join(' | ')} | (string & {})`;
		} else if (format === 'did') {
			value = 'DID';
		} else if (format === 'cid') {
			value = 'CID';
		} else if (format === 'handle') {
			value = 'Handle';
		} else if (format === 'at-uri') {
			value = 'AtUri';
		} else {
			value = 'string';
		}
	} else if (type === 'array') {
		value = `(${resolveType(lv, ns, def.items)})[]`;
	} else if (type === 'blob') {
		const accept = def.accept?.map((mime) => `\`${mime.replaceAll('*', '${string}')}\``);
		value = `AtBlob${accept ? `<${accept.join(' | ')}>` : ''}`;
	} else if (type === 'ref') {
		const ref = def.ref;
		value = `RefOf<'${ref[0] === '#' ? ns + ref : ref}'>`;
	} else if (type === 'union') {
		const refs = def.refs.map((ref) => `UnionOf<'${ref[0] === '#' ? ns + ref : ref}'>`);
		value = refs.join(' | ');
	} else if (type === 'object' || type === 'params') {
		const required = def.required;
		const properties = def.properties;

		const chunks = ['{'];
		lv++;

		for (const prop in properties) {
			const optional = !required || !required.includes(prop);
			chunks.push(t(lv, `${prop}${optional ? '?' : ''}: ${resolveType(lv, ns, properties[prop])};`));
		}

		lv--;
		chunks.push(t(lv, `}`));
		value = chunks.join('\n');
	} else {
		console.log(`unknown type: ${type}`);
	}

	return value;
};

for (const filename of process.argv.slice(2)) {
	const jsonString = fs.readFileSync(filename);
	const json = JSON.parse(jsonString);

	const ns = json.id;
	const definitions = json.defs;

	for (const key in definitions) {
		const def = definitions[key];
		const type = def.type;

		const nsid = `${ns}${key !== 'main' ? `#${key}` : ''}`;

		if (type === 'token') {
			const chunks = writers.objects;

			chunks.push(`'${nsid}': '${nsid}';`);
		} else if (type === 'record') {
			const chunks = writers.records;

			chunks.push(`'${nsid}': ${resolveType(1, ns, def.record)}`);
		} else if (type === 'query' || type === 'procedure') {
			const chunks = type === 'query' ? writers.queries : writers.procedures;

			const parameters = def.parameters;
			const input = def.input;
			const output = def.output;
			const errors = def.errors;

			chunks.push(`'${nsid}': {`);

			if (parameters && Object.keys(parameters.properties).length > 0) {
				chunks.push(t(1, `params: ${resolveType(2, ns, parameters)};`));
			}

			if (input) {
				if (input.encoding === 'application/json') {
					chunks.push(t(1, `data: ${resolveType(2, ns, input.schema)};`));
				} else {
					chunks.push(t(1, `data: Blob;`));
				}
			}

			if (output) {
				if (output.encoding === 'application/json') {
					chunks.push(t(1, `response: ${resolveType(2, ns, output.schema)};`));
				} else {
					chunks.push(t(1, `response: unknown;`));
				}
			}

			if (errors) {
				chunks.push(t(1, `errors: {`));

				for (const error of errors) {
					chunks.push(t(2, `${error.name}: {};`));
				}

				chunks.push(t(1, `};`));
			}

			chunks.push('};');
		} else if (type === 'subscription') {
			console.log(`unhandled subscription: ${nsid}`);
		} else {
			const chunks = writers.objects;

			chunks.push(`'${nsid}': ${resolveType(1, ns, def)};`);
		}
	}
}

const result = `
export type CID = string;

export type DID = \`did:\${string}\`;

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

${wrap(writers.queries, 'export interface Queries {', '}')}

${wrap(writers.procedures, 'export interface Procedures {', '}')}

${wrap(writers.subscriptions, 'export interface Subscriptions {', '}')}

${wrap(writers.objects, 'export interface Objects {', '}')}

${wrap(writers.records, 'export interface Records {', '}')}
`;

fs.writeFileSync('./lib/atp-schema.ts', result);
