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
	let theme = context.cookies.get(COOKIE_NAME) ?? 'auto';

	if (theme.startsWith('auto')) {
		theme = prefers ?? (theme.split('-')[1] || 'auto');
	}

	return new HTMLRewriter()
		.on('body', {
			element(element: Element) {
				element.setAttribute('data-theme', theme);
			},
		})
		.transform(res);
};
