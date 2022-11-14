// @ts-ignore
import type { Context } from 'https://edge.netlify.com/';

const COOKIE_NAME = 'dt';
type Theme = 'light' | 'dark' | 'auto-dark' | 'auto-light';
const themes: Array<Theme> = ['light', 'dark', 'auto-dark', 'auto-light'];

export default async (request: Request, context: Context) => {
	const url = new URL(request.url);

	if (!url.searchParams.has('theme')) {
		return new Response(JSON.stringify({ error: 'Missing theme parameter' }), {
			status: 400,
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	const theme = url.searchParams.get('theme') as Theme;

	if (!themes.includes(theme)) {
		return new Response(JSON.stringify({ error: `Invalid theme: ${theme}` }), {
			status: 400,
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	context.cookies.set({
		name: COOKIE_NAME,
		value: theme,
		path: '/',
		secure: true,
		httpOnly: true,
		sameSite: 'Strict',
		expires: new Date(Date.now() + 2_592_000_000),
	});

	return new Response(JSON.stringify({ error: false }), {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	});
};
