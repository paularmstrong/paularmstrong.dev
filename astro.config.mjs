import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
import image from '@astrojs/image';
import compress from 'astro-compress';
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
		image(),
		compress({
			img: false,
			svg: false,
		}),
	],
	markdown: {
		remarkPlugins,
		shikiConfig: {
			theme: 'rose-pine-moon',
		},
		extendDefaultPlugins: true,
	},
});
