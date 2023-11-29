import type { CollectionEntry } from 'astro:content';

function padTwo(num: number) {
	return `${num}`.padStart(2, '0');
}

export function getPostSlug(post: CollectionEntry<'blog'>) {
	const {
		slug,
		data: { pubDate },
	} = post;
	return `${pubDate.getFullYear()}/${padTwo(pubDate.getUTCMonth() + 1)}/${padTwo(pubDate.getUTCDate())}/${slug}`;
}
