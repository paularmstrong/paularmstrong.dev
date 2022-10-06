import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import { astroAsides } from './integrations/asides';
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://paularmstrong.dev',
	integrations: [
		solid(),
		tailwind(),
		mdx({
			extendPlugins: 'astroDefaults',
		}),
		sitemap(),
		astroAsides(),
	],
	markdown: {
		remarkPlugins: [remarkReadingTime],
		extendDefaultPlugins: true,
	},
});
