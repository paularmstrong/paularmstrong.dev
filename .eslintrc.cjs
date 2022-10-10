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
		'@typescript-eslint/no-unused-vars': 'error',
		'tailwindcss/no-custom-classname': 'error',
	},
	globals: {
		astroHTML: 'readonly',
	},
	env: {
		node: true,
		browser: true,
	},
	settings: {
		tailwindcss: {
			config: 'tailwind.config.cjs',
		},
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx', '**/*.mjs', '**/*.cjs', '**/*.js'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
		},
	],
};
