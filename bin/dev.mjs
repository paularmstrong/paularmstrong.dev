#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setup } from 'onerepo';
import { eslint } from '@onerepo/plugin-eslint';
import { prettier } from '@onerepo/plugin-prettier';
import { typescript } from '@onerepo/plugin-typescript';

setup({
	root: path.join(path.dirname(fileURLToPath(import.meta.url)), '..'),
	name: 'dev',
	subcommandDir: 'commands',
	core: {
		generate: {
			templatesDir: './config/templates',
		},
		graph: false,
	},
	plugins: [
		eslint({ name: 'lint', extensions: ['ts', 'tsx', 'js', 'jsx', 'cjs', 'mjs', 'astro', 'md', 'mdx'] }),
		prettier({ name: 'format' }),
		typescript({}),
	],
}).then(({ run }) => run());
