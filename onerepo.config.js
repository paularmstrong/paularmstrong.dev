/** @type import('onerepo').graph.TaskConfig */
export default {
	'pre-commit': {
		parallel: [
			[{ match: '**/*.{ts,tsx,js,jsx,astro}', cmd: '$0 lint --add' }, '$0 format --add'],
			{ cmd: '$0 astro -- check', match: '**/*.astro' },
		],
		serial: [{ cmd: '$0 astro -- sync', match: 'src/content/**' }, '$0 tsc'],
	},
	'pre-merge': {
		serial: ['$0 lint --all --no-fix', '$0 format --check', '$0 tsc', '$0 tasks -c build', '$0 astro -- check'],
	},
	'post-checkout': {
		serial: ['yarn'],
	},
	build: {
		serial: ['$0 astro -- build'],
	},
};
