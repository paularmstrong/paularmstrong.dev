// @ts-ignore
import type { Context } from 'https://edge.netlify.com/';
// @ts-ignore
// import { HTMLRewriter, Element, Config } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

const COOKIE_NAME = 'dt';

export default async (req: Request, context: Context) => {
	if (req.headers.get('user-agent') === 'undici') {
		console.log(req);
		return new Response('', {
			status: 403,
		});
	}

	const res = await context.next();
	const type = res.headers.get('content-type');
	if (!type?.startsWith('text/html')) {
		return;
	}

	const prefers = req.headers.get('sec-ch-prefers-color-scheme');
	const rawCookie = context.cookies.get(COOKIE_NAME) ?? 'auto=true&theme=light';
	const params = new URLSearchParams(rawCookie);
	const isAuto = params.get('auto') === 'true';
	const theme = isAuto && prefers ? prefers : params.get('theme') || 'light';

	console.log({
		cookie: context.cookies.get(COOKIE_NAME) || undefined,
		isAuto,
		prefers,
		theme,
		ua: req.headers.get('user-agent'),
	});

	const body = await res.text();
	const newBody = body.replace('html class="', `html data-auto-theme="${JSON.stringify(isAuto)}" class="${theme}`);
	console.log(newBody);

	return new Response(newBody, { headers: res.headers, status: res.status });

	// const rewriter = new HTMLRewriter().on('html', new HtmlHandler(theme, isAuto));
	// console.log(JSON.stringify(Object.fromEntries(res.headers)));

	// try {
	// 	const newRes = rewriter.transform(res);
	// 	return newRes;
	// } catch (e) {
	// 	console.log(e);
	// 	return new Response('it is broken :(');
	// }
};

// class HtmlHandler {
// 	#theme = 'light';
// 	#isAuto = true;

// 	constructor(theme: string, isAuto: boolean) {
// 		this.#theme = theme;
// 		this.#isAuto = isAuto;
// 	}

// 	element(element: Element) {
// 		const original = element.getAttribute('class') || false;
// 		element.setAttribute('class', [original, this.#theme].filter(Boolean).join(' '));
// 		element.setAttribute('data-auto-theme', this.#isAuto ? 'true' : 'false');
// 	}
// }

export const config: Config = {
	onError: 'bypass',
};
