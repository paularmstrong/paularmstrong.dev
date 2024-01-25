import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
import react from '@astrojs/react';
import rehypePrettyCode from 'rehype-pretty-code';

const remarkPlugins = [remarkReadingTime];
const rehypePlugins = [
	[
		rehypePrettyCode,
		{
			theme: JSON.parse(
				readFileSync(
					path.join(fileURLToPath(import.meta.url), '..', './config/theme/moonlight-ii-custom.json'),
					'utf-8',
				),
			),
			// @ts-ignore getting replaced
			onVisitLine(node) {
				// Prevent lines from collapsing in `display: grid` mode, and
				// allow empty lines to be copy/pasted
				if (node.children.length === 0) {
					node.children = [{ type: 'text', value: ' ' }];
				}
				if (!node.properties.className) {
					node.properties.className = [''];
				}
				node.properties.className.push('inline-block', 'w-full', 'px-4', 'lg:px-8', 'border-l-4', 'border-transparent');
			},
			// @ts-ignore getting replaced
			onVisitHighlightedLine(node) {
				if (!node.properties.className) {
					node.properties.className = [''];
				}
				node.properties.className.push('bg-pink-500/20', 'py-px', 'border-l-pink-500/80');
			},
			// @ts-ignore getting replaced
			onVisitHighlightedWord(node) {
				if (!node.properties.className) {
					node.properties.className = [''];
				}
				node.properties.className = ['bg-pink-700/40', 'rounded', 'p-1', '-m-1'];
			},
		},
	],
];

/** @type {import('@types/astro').AstroUserConfig} */
export default defineConfig({
	site: 'https://paularmstrong.dev',
	trailingSlash: 'always',
	compressHTML: true,
	integrations: [
		icon(),
		solid({
			include: ['src/**'],
			exclude: ['**/*react*/**'],
		}),
		react({
			include: ['**/*react*/**'],
		}),
		tailwind(),
		mdx({
			remarkPlugins,
			// @ts-ignore getting replaced soon
			rehypePlugins,
			extendPlugins: 'astroDefaults',
		}),
		sitemap({
			serialize(item) {
				if (item.url.endsWith('paularmstrong.dev/')) {
					item.priority = 1.0;
				} else if (item.url.endsWith('paularmstrong.dev/blog/')) {
					// @ts-expect-error they used a TS enum <smh>
					item.changefreq = 'daily';
					item.priority = 0.9;
				}

				return item;
			},
		}),
	],
	markdown: {
		remarkPlugins,
		// @ts-ignore getting replaced soon
		rehypePlugins,
		syntaxHighlight: false,
		extendDefaultPlugins: true,
	},
	vite: {
		build: {
			sourcemap: true,
		},
		ssr: {
			noExternal: ['react-component-benchmark'],
		},
	},
});
