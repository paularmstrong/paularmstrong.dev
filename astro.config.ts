import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './plugins/remark-reading-time.mjs';
import react from '@astrojs/react';
import expressiveCode, { ExpressiveCodeTheme } from 'astro-expressive-code';

const darkTheme = readFileSync(new URL('./config/theme/tailwind-dark-slate.json', import.meta.url), 'utf-8');
const lightTheme = readFileSync(new URL('./config/theme/tailwind-breeze.json', import.meta.url), 'utf-8');

const remarkPlugins = [remarkReadingTime];

export default defineConfig({
	site: 'https://paularmstrong.dev',
	trailingSlash: 'always',
	compressHTML: true,
	integrations: [
		expressiveCode({
			themes: [ExpressiveCodeTheme.fromJSONString(darkTheme), ExpressiveCodeTheme.fromJSONString(lightTheme)],
			tabWidth: 2,
			useDarkModeMediaQuery: false,
			styleOverrides: {
				codeLineHeight: '1.4',
				frames: {
					frameBoxShadowCssValue: 'none',
				},
			},
		}),
		icon(),
		solid({
			include: ['src/**'],
			exclude: ['**/*react*/**'],
		}),
		react({
			include: ['**/*react*/**'],
		}),
		tailwind(),
		mdx({}),
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
