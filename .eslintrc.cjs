'use strict';

module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:astro/recommended',
		'plugin:tailwindcss/recommended',
		'plugin:mdx/recommended',
	],
	plugins: ['astro', 'tailwindcss', 'mdx'],
	root: true,
	rules: {
		'tailwindcss/no-custom-classname': 'error',
		'no-console': 'error',
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
			config: 'tailwind.config.ts',
		},
	},
	overrides: [
		{ files: ['**/*.mdx'], rules: { 'no-unused-vars': 'off' } },
		{
			files: ['**/*.ts', '**/*.tsx', '**/*.mjs', '**/*.cjs', '**/*.js'],
			extends: ['plugin:@typescript-eslint/recommended'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'@typescript-eslint/no-unused-vars': 'error',
			},
		},
	],
};
