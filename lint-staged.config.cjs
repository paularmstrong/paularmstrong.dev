'use strict';

module.exports = {
	'*.{mjs,md,mdx,astro,cjs,js,ts,tsx}': 'yarn lint:cmd --fix',
	'*.{tsx,ts}': () => 'yarn tsc',
	'*.astro': () => 'yarn astro check',
	'*': 'yarn format',
};
