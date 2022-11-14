// @ts-ignore
import type { Context } from 'https://edge.netlify.com/';
// @ts-ignore
import { HTMLRewriter, Element } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

const COOKIE_NAME = 'dt';

export default async (req: Request, context: Context) => {
	const res = await context.next();
	const type = res.headers.get('content-type') as string;
	if (!type.startsWith('text/html')) {
		return;
	}

	const prefers = req.headers.get('sec-ch-prefers-color-scheme');
	const cookie = context.cookies.get(COOKIE_NAME);

	let theme = cookie ?? 'auto';
	if (theme.startsWith('auto')) {
		theme = prefers ?? (theme.split('-')[1] || 'auto');
	}

	console.log({ cookie, prefers, theme, ua: req.headers.get('user-agent') });

	return new HTMLRewriter()
		.on('body', {
			element(element: Element) {
				const original = element.getAttribute('class') || false;
				element.setAttribute('class', [original, theme].filter(Boolean).join(' '));
				element.setAttribute('data-auto-theme', `${!cookie || cookie.startsWith('auto')}`);
			},
		})
		.transform(res);
};
