// @ts-ignore
import type { Context, Config } from 'https://edge.netlify.com/';
// @ts-ignore
import { HTMLRewriter, Element } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
// @ts-ignore
import { generateRandomNonce } from 'https://deno.land/x/oauth4webapi@v2.3.0/mod.ts';

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

	const nonce = generateRandomNonce();
	const nonceWriter = new NonceHandler(nonce);

	const rewriter = new HTMLRewriter().on('html', new HtmlHandler(theme, isAuto)).on('script', nonceWriter);
	res.headers.set('content-security-policy', getCsp(nonce));

	return rewriter.transform(res);
};

class HtmlHandler {
	#theme = 'light';
	#isAuto = true;

	constructor(theme: string, isAuto: boolean) {
		this.#theme = theme;
		this.#isAuto = isAuto;
	}

	element(element: Element) {
		const original = element.getAttribute('class') || false;
		element.setAttribute('class', [original, this.#theme].filter(Boolean).join(' '));
		element.setAttribute('data-auto-theme', this.#isAuto ? 'true' : 'false');
	}
}

class NonceHandler {
	#nonce: string;

	constructor(nonce: string) {
		this.#nonce = nonce;
	}

	element(element: Element) {
		element.setAttribute('nonce', this.#nonce);
	}
}

export const config: Config = {
	onError: 'bypass',
};

function getCsp(nonce: string) {
	const csp = {
		'base-uri': ["'self'"],
		'default-src': ["'self'"],
		'style-src': ["'self'", "'unsafe-inline'"],
		'style-src-elem': ["'self'", "'unsafe-inline'"],
		'script-src': ["'strict-dynamic'", "'unsafe-inline'", `'nonce-${nonce}'`],
		'img-src': ["'self'", 'https://paularmstrong.goatcounter.com/count', 'https://img.youtube.com'],
		'connect-src': ["'self'", 'https://paularmstrong.goatcounter.com', 'https://www.youtube-nocookie.com/oembed'],
		'frame-src': ["'self'", 'https://www.youtube-nocookie.com https://docs.google.com'],
		'object-src': ["'none'"],
	};

	return Object.entries(csp).reduce((memo, [key, val]) => {
		return `${memo}${key} ${val.filter(Boolean).join(' ')}; `;
	}, '');
}
