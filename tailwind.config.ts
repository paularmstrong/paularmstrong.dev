import type { Config } from 'tailwindcss';
import type { KeyValuePair, PluginAPI } from 'tailwindcss/types/config';
import typography from '@tailwindcss/typography';

export default {
	content: ['src/**/*.{astro,md,mdx,tsx}', 'astro.config.mjs'],
	darkMode: ['class', '[data-theme="dark"]'],
	plugins: [
		typography,
		function ({ addBase, theme }: PluginAPI) {
			addBase({
				'[id]': {
					position: 'relative',
					zIndex: '1',
				},
				'*:not(main):target::before': {
					content: '" "',
					position: 'absolute',
					backgroundColor: theme('colors.purple.400'),
					borderRadius: theme('borderRadius.DEFAULT'),
					opacity: '0.2',
					zIndex: '-1',
					inset: `-${theme('spacing.2')}`,
				},
				'.prose :not(:where([class~="not-prose"], [class~="not-prose"] *)) .expressive-code': {
					margin: `${theme('spacing.8')} 0 !important`,
				},
			});
		},
		function ({ matchUtilities, theme }: PluginAPI) {
			matchUtilities(
				{
					tab: (value) => ({
						tabSize: value,
					}),
				},
				{ values: theme('tabSize') as KeyValuePair<string> },
			);
		},
		function ({ addUtilities }: PluginAPI) {
			addUtilities({
				'.no-bustout': {},
				'.bustout': {
					marginLeft: 'calc(50% - 50vw)',
					marginRight: 'calc(50% - 50vw)',
					width: '80vw',
					maxWidth: '1280px',
					transform: 'translateX(calc(50vw - 50%))',
				},
				'.bustout-sm': {
					marginLeft: 'calc(50% - 50vw)',
					marginRight: 'calc(50% - 50vw)',
					width: '60vw',
					maxWidth: '1024px',
					transform: 'translateX(calc(50vw - 50%))',
				},
				'.shape-circle': {
					aspectRatio: '1',
					shapeOutside: 'circle(50%)',
					clipPath: 'circle(50%)',
					shapeMargin: '1.25rem',
					marginLeft: '1.25rem',
					marginBottom: '1.25rem',
					overflow: 'hidden',
				},
				'.shape-half-tl': {
					clipPath: 'polygon(0 0, 0 100%, 100% 0)',
				},
				'.shape-half-br': {
					clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
				},
			});
		},
	],
	theme: {
		tabSize: {
			1: '1',
			2: '2',
			4: '4',
			8: '8',
		},

		extend: {
			keyframes: ({ theme }) => ({
				'ring-ping': {
					'0%': {
						'box-shadow': `0 0 0 0 ${theme('colors.slate.100')}ff, 0 0 0 0 ${theme('colors.blue.500')}00`,
					},
					'5%': {
						'box-shadow': `0 0 0 0px ${theme('colors.slate.100')}ff, 0 0 0 4px ${theme('colors.blue.500')}aa`,
					},
					'20%, 100%': {
						'box-shadow': `0 0 0 4px ${theme('colors.slate.100')}ff, 0 0 0 8px ${theme('colors.blue.500')}00`,
					},
				},
				'ring-ping-dark': {
					'0%': {
						'box-shadow': `0 0 0 0 ${theme('colors.slate.900')}ff, 0 0 0 0 ${theme('colors.blue.500')}00`,
					},
					'5%': {
						'box-shadow': `0 0 0 0px ${theme('colors.slate.900')}ff, 0 0 0 4px ${theme('colors.blue.500')}aa`,
					},
					'20%, 100%': {
						'box-shadow': `0 0 0 4px ${theme('colors.slate.900')}ff, 0 0 0 8px ${theme('colors.blue.500')}00`,
					},
				},
			}),
			animation: {
				'ring-ping': 'ring-ping 2s linear infinite',
				'ring-ping-dark': 'ring-ping-dark 2s linear infinite',
			},
			// @ts-ignore ugh
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'code::before': { content: '""' },
						'code::after': { content: '""' },
					},
				},
				'a-img': {
					css: {
						'a:hover img': {
							outline: `4px solid ${theme('colors.blue.500')}aa`,
						},
					},
				},
			}),
		},
	},
} satisfies Config;
