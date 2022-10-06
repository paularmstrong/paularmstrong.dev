'use strict';

module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:astro/recommended',
		'plugin:tailwindcss/recommended',
	],
	plugins: ['astro', 'tailwindcss'],
	root: true,
	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
	},
	globals: {
		astroHTML: 'readonly',
	},
	env: {
		node: true,
		browser: true,
	},
};
