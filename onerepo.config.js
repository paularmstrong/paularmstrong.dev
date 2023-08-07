/** @type import('onerepo').graph.TaskConfig */
export default {
	'pre-commit': {
		serial: [
			{ match: '**/*.{ts,tsx,js,jsx,astro}', cmd: '$0 lint --add' },
			{ cmd: '$0 astro -- sync', match: 'src/content/**' },
			'$0 format --add',
			'$0 tsc',
		],
	},
	'pre-merge': {
		serial: ['$0 lint --all --no-fix', '$0 format --check', '$0 tsc', '$0 tasks -c build'],
	},
	'post-checkout': {
		serial: ['yarn'],
	},
	build: {
		serial: ['$0 astro -- build'],
	},
};
