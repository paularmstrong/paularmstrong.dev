export function get() {
	const date = new Date();
	return {
		body: `/* TEAM */
Author: Paul Armstrong
Site: https://paularmstrong.dev
Twitter: @paularmstrong
Github: @paularmstrong

/* SITE */
Last updated: ${date.toISOString().split('T')[0]}
Software: Astro, Solid-js, Typescript, JavaScript, Markdown
`,
	};
}
