'use strict';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.{astro,md,mdx,tsx}', 'blog/**/*.{md,mdx}', 'labs/**/*.{mdx,tsx,ts}'],
	plugins: [
		require('@tailwindcss/typography'),
		function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					tab: (value) => ({
						tabSize: value,
					}),
				},
				{ values: theme('tabSize') }
			);
		},
		function ({ addUtilities }) {
			addUtilities({
				'.bustout': {
					marginLeft: 'calc(50% - 50vw)',
					marginRight: 'calc(50% - 50vw)',
					width: '80vw',
					transform: 'translateX(calc(50vw - 50%))',
				},
				'.bustout-sm': {
					marginLeft: 'calc(50% - 50vw)',
					marginRight: 'calc(50% - 50vw)',
					width: '60vw',
					transform: 'translateX(calc(50vw - 50%))',
				},
				'.shape-circle': {
					aspectRatio: 1,
					shapeOutside: 'circle(50%)',
					clipPath: 'circle(50%)',
					shapeMargin: '1.25rem',
					overflow: 'hidden',
				},
				'.shape-half-tl': {
					clipPath: 'polygon(0 0, 0 100%, 100% 0)',
				},
				'.shape-half-br': {
					clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
				},
				'.shape-triangle-up': {
					clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
				},
				'.shape-triangle-down': {
					clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
				},
			});
		},
	],
	darkMode: 'class',
	theme: {
		tabSize: {
			1: '1',
			2: '2',
			4: '4',
			8: '8',
		},
		extend: {
			colors: {
				blue: {
					50: '#f6f9fb',
					100: '#e2f1fc',
					200: '#c1ddf9',
					300: '#94bbef',
					400: '#6994e3',
					500: '#526fd8',
					600: '#4353c6',
					700: '#343ea3',
					800: '#242a76',
					900: '#141a4a',
				},
				purple: {
					50: '#fafbfb',
					100: '#f2f1fa',
					200: '#e5d6f4',
					300: '#caafe5',
					400: '#b683d1',
					500: '#9d5dc0',
					600: '#8142a5',
					700: '#603180',
					800: '#422256',
					900: '#251531',
				},
				cerise: {
					50: '#fdfcfb',
					100: '#fbf1ee',
					200: '#f7d0dd',
					300: '#eda3ba',
					400: '#e97291',
					500: '#dc4e70',
					600: '#c43450',
					700: '#9c273a',
					800: '#701b26',
					900: '#441114',
				},
				cocoa: {
					50: '#fcfbf8',
					100: '#faf0d6',
					200: '#f5d7ac',
					300: '#e6af78',
					400: '#d9814b',
					500: '#c35f2c',
					600: '#a6441c',
					700: '#803317',
					800: '#592312',
					900: '#38160b',
				},
				yellow: {
					50: '#faf9f3',
					100: '#f6efbe',
					200: '#ebdf83',
					300: '#cebd50',
					400: '#a2952b',
					500: '#807715',
					600: '#665e0e',
					700: '#4f470d',
					800: '#36310b',
					900: '#241e09',
				},
				green: {
					50: '#f0f5f2',
					100: '#d6f0e7',
					200: '#a3e8c8',
					300: '#65cf97',
					400: '#25b165',
					500: '#19983d',
					600: '#16832c',
					700: '#166525',
					800: '#11451e',
					900: '#0c2a19',
				},
			},
			typography: (theme) => ({
				'a-img': {
					css: {
						'a:hover img': {
							outline: `4px solid ${theme('colors.blue.500')}77`,
						},
					},
				},
			}),
		},
	},
};
