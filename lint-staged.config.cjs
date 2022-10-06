'use strict';

module.exports = {
	'*.{mjs,md,mdx,astro,cjs,js,ts,tsx}': () => 'yarn lint',
	'*.{tsx,ts}': 'yarn tsc',
	'*': 'yarn format',
};
