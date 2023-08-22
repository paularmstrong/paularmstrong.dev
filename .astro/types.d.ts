declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S | ((context: SchemaContext) => S);
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	const entryMap: {
		"blog": {
"2017-04-11-twitter-lite-and-high-performance-react-progressive-web-apps-at-scale.mdx": {
  id: "2017-04-11-twitter-lite-and-high-performance-react-progressive-web-apps-at-scale.mdx",
  slug: "2017-04-11-twitter-lite-and-high-performance-react-progressive-web-apps-at-scale",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2020-05-16-git-helpers.mdx": {
  id: "2020-05-16-git-helpers.mdx",
  slug: "2020-05-16-git-helpers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2020-11-16-ducky.mdx": {
  id: "2020-11-16-ducky.mdx",
  slug: "2020-11-16-ducky",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2020-12-22-javascript-html-templating.mdx": {
  id: "2020-12-22-javascript-html-templating.mdx",
  slug: "2020-12-22-javascript-html-templating",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2021-10-24-open-source-break.mdx": {
  id: "2021-10-24-open-source-break.mdx",
  slug: "open-source-break",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2021-11-08-abandoning-amp.mdx": {
  id: "2021-11-08-abandoning-amp.mdx",
  slug: "2021-11-08-abandoning-amp",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-05-17-nine-years-sober.mdx": {
  id: "2022-05-17-nine-years-sober.mdx",
  slug: "2022-05-17-nine-years-sober",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-06-04-custom-wedding-website-part-1.mdx": {
  id: "2022-06-04-custom-wedding-website-part-1.mdx",
  slug: "2022-06-04-custom-wedding-website-part-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-06-04-custom-wedding-website.mdx": {
  id: "2022-06-04-custom-wedding-website.mdx",
  slug: "2022-06-04-custom-wedding-website",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-08-29-shootings.mdx": {
  id: "2022-08-29-shootings.mdx",
  slug: "2022-08-29-shootings",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-09-26-hacking-express-nodejs-timeout-middleware.mdx": {
  id: "2022-09-26-hacking-express-nodejs-timeout-middleware.mdx",
  slug: "2022-09-26-hacking-express-nodejs-timeout-middleware",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-10-11-diy-photobooth.mdx": {
  id: "2022-10-11-diy-photobooth.mdx",
  slug: "2022-10-11-diy-photobooth",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-10-12-new-site-who-dis.mdx": {
  id: "2022-10-12-new-site-who-dis.mdx",
  slug: "2022-10-12-new-site-who-dis",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-10-13-custom-wedding-website-part-2.mdx": {
  id: "2022-10-13-custom-wedding-website-part-2.mdx",
  slug: "2022-10-13-custom-wedding-website-part-2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-10-14-tech-design-template.mdx": {
  id: "2022-10-14-tech-design-template.mdx",
  slug: "2022-10-14-tech-design-template",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-10-18-current-tool-chest.mdx": {
  id: "2022-10-18-current-tool-chest.mdx",
  slug: "2022-10-18-current-tool-chest",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-10-26-diy-photobooth-nerdy-details.mdx": {
  id: "2022-10-26-diy-photobooth-nerdy-details.mdx",
  slug: "2022-10-26-diy-photobooth-nerdy-details",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-10-31-why-tailwindcss.mdx": {
  id: "2022-10-31-why-tailwindcss.mdx",
  slug: "2022-10-31-why-tailwindcss",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-11-03-inhumanity-of-twitter-management.mdx": {
  id: "2022-11-03-inhumanity-of-twitter-management.mdx",
  slug: "2022-11-03-inhumanity-of-twitter-management",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-11-04-mourning-twitter.mdx": {
  id: "2022-11-04-mourning-twitter.mdx",
  slug: "2022-11-04-mourning-twitter",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-11-09-the-case-for-astro.mdx": {
  id: "2022-11-09-the-case-for-astro.mdx",
  slug: "2022-11-09-the-case-for-astro",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-11-10-css-box-sizing-border-box.mdx": {
  id: "2022-11-10-css-box-sizing-border-box.mdx",
  slug: "2022-11-10-css-box-sizing-border-box",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-11-21-client-hint-headers-for-dark-mode-theme.mdx": {
  id: "2022-11-21-client-hint-headers-for-dark-mode-theme.mdx",
  slug: "2022-11-21-client-hint-headers-for-dark-mode-theme",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-11-22-my-biggest-technical-mistakes.mdx": {
  id: "2022-11-22-my-biggest-technical-mistakes.mdx",
  slug: "2022-11-22-my-biggest-technical-mistakes",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-11-28-lessons-learned-how-i-would-rebuild-twitter-today.mdx": {
  id: "2022-11-28-lessons-learned-how-i-would-rebuild-twitter-today.mdx",
  slug: "2022-11-28-lessons-learned-how-i-would-rebuild-twitter-today",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2022-12-19-healthy-meetings-in-tech.mdx": {
  id: "2022-12-19-healthy-meetings-in-tech.mdx",
  slug: "2022-12-19-healthy-meetings-in-tech",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2023-01-20-javascript-and-frontend-things-to-see-in-2023.mdx": {
  id: "2023-01-20-javascript-and-frontend-things-to-see-in-2023.mdx",
  slug: "2023-01-20-javascript-and-frontend-things-to-see-in-2023",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2023-01-30-why-and-how-of-monorepos.mdx": {
  id: "2023-01-30-why-and-how-of-monorepos.mdx",
  slug: "2023-01-30-why-and-how-of-monorepos",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2023-03-13-why-we-do-not-write-web-components.mdx": {
  id: "2023-03-13-why-we-do-not-write-web-components.mdx",
  slug: "2023-03-13-why-we-do-not-write-web-components",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2023-03-24-a-clean-codebase-is-a-happy-codebase.mdx": {
  id: "2023-03-24-a-clean-codebase-is-a-happy-codebase.mdx",
  slug: "2023-03-24-a-clean-codebase-is-a-happy-codebase",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2023-08-14-the-line-between-writing-functions-yourself-and-using-open-source-modules.mdx": {
  id: "2023-08-14-the-line-between-writing-functions-yourself-and-using-open-source-modules.mdx",
  slug: "2023-08-14-the-line-between-writing-functions-yourself-and-using-open-source-modules",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"2023-08-23-import-path-aliasing-is-a-crutch-for-poor-architecture.mdx": {
  id: "2023-08-23-import-path-aliasing-is-a-crutch-for-poor-architecture.mdx",
  slug: "2023-08-23-import-path-aliasing-is-a-crutch-for-poor-architecture",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
