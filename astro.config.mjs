import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import { remarkReadingTime } from './plugins/remark-reading-time.mjs';

const remarkPlugins = [remarkReadingTime];

// https://astro.build/config
export default defineConfig({
	site: 'https://paularmstrong.dev',
	integrations: [
		solid(),
		tailwind(),
		mdx({
			remarkPlugins,
			extendPlugins: 'astroDefaults',
		}),
		sitemap(),
	],
	markdown: {
		remarkPlugins,
		shikiConfig: {
			theme: 'rose-pine-moon',
		},
		extendDefaultPlugins: true,
	},
});
