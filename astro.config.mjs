import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
import image from '@astrojs/image';
import compress from 'astro-compress';
const remarkPlugins = [remarkReadingTime];

/** @type {import('@types/astro').AstroUserConfig} */
export default defineConfig({
	site: 'https://paularmstrong.dev',
	integrations: [
		solid(),
		tailwind(),
		mdx({
			remarkPlugins,
			extendPlugins: 'astroDefaults',
		}),
		sitemap({
			serialize(item) {
				if (item.url.endsWith('paularmstrong.dev/')) {
					item.priority = 1.0;
				} else if (item.url.endsWith('paularmstrong.dev/blog/')) {
					item.changefreq = 'daily';
					item.priority = 0.9;
				}
				return item;
			},
		}),
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
			wrap: true,
		},
		extendDefaultPlugins: true,
	},
});
