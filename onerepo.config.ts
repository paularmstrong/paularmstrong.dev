import type { Config } from 'onerepo';
import { eslint } from '@onerepo/plugin-eslint';
import { prettier } from '@onerepo/plugin-prettier';
import { typescript } from '@onerepo/plugin-typescript';

export default {
	root: true,

	codeowners: {
		'.': ['@paularmstrong'],
	},

	dependencies: {
		mode: 'loose',
		dedupe: true,
	},

	tasks: {
		'pre-commit': {
			parallel: [['$0 lint --add', '$0 format --add'], { cmd: '$0 astro -- check', match: '**/*.astro' }],
			serial: [{ cmd: '$0 astro -- sync', match: 'src/content/**' }, '$0 tsc'],
		},
		'pre-merge': {
			serial: ['$0 lint --all --no-fix', '$0 format --check', '$0 tsc', '$0 astro -- build', '$0 astro -- check'],
		},
		'post-checkout': {
			serial: ['yarn'],
		},
	},

	plugins: [
		eslint({ name: ['lint', 'eslint'], extensions: ['ts', 'tsx', 'js', 'jsx', 'cjs', 'mjs', 'astro'] }),
		prettier({ name: ['format', 'prettier'] }),
		typescript({ tsconfig: 'tsconfig.json', useProjectReferences: false }),
	],

	vcs: {
		autoSyncHooks: true,
	},

	templateDir: './templates',
} satisfies Config;
