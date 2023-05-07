/** @type import('onerepo').graph.TaskConfig */
export default {
	'pre-commit': {
		sequential: [
			{ match: '**/*.{ts,tsx,js,jsx,astro}', cmd: '$0 lint --add' },
			{ cmd: '$0 astro -- sync', match: 'src/content/**' },
			'$0 format --add',
			'$0 tsc',
		],
	},
	'pre-merge': {
		sequential: ['$0 lint --all --no-fix', '$0 format --check', '$0 tsc', '$0 tasks -c build'],
	},
	'post-checkout': {
		sequential: ['yarn'],
	},
	build: {
		sequential: ['$0 astro -- build'],
	},
};
