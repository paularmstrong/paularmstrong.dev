import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { getPostSlug } from '../../modules/blog-post';

const collectionEntries = await getCollection('blog');
const posts = Object.fromEntries(collectionEntries.map((post) => [`blog/${getPostSlug(post)}`, post.data]));
const labCollectionEntries = await getCollection('labs');
const labs = Object.fromEntries(labCollectionEntries.map((page) => [`labs/${page.slug}`, page.data]));

export const { getStaticPaths, GET } = OGImageRoute({
	param: 'route',
	pages: { ...posts, ...labs },
	getImageOptions: (_path, page) => ({
		title: page.title,
		description: page.description,
		logo: {
			// This is actually transparent
			// The logo is embedded in the BG image to control positioning
			path: './src/images/og-logo.png',
		},
		bgImage: {
			path: './src/images/og-background.jpg',
			fit: 'none',
		},
		font: {
			title: {
				weight: 'Bold',
				size: 56,
				color: [96, 165, 250],
			},
			description: {
				weight: 'Medium',
				size: 32,
			},
		},
	}),
});
