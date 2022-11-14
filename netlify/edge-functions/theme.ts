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
	const rawCookie = context.cookies.get(COOKIE_NAME);
	let cookieVal = { auto: true, theme: 'light' };
	if (rawCookie) {
		try {
			const params = new URLSearchParams(rawCookie);
			cookieVal = {
				auto: params.get('auto') === 'true',
				theme: params.get('theme') || 'light',
			};
		} catch (e) {
			console.error('Invalid cookie', rawCookie);
		}
	}

	const auto = cookieVal.auto as boolean;
	const theme = (auto ? prefers : cookieVal.theme) as 'light' | 'dark';

	console.log({ rawCookie, auto, prefers, theme, ua: req.headers.get('user-agent') });

	return new HTMLRewriter()
		.on('body', {
			element(element: Element) {
				const original = element.getAttribute('class') || false;
				element.setAttribute('class', [original, theme].filter(Boolean).join(' '));
				element.setAttribute('data-auto-theme', auto ? 'true' : 'false');
			},
		})
		.transform(res);
};
