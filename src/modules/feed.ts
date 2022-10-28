import { Feed } from 'feed';
import type { Item } from 'feed';
import { SITE_TITLE, SITE_URL, SITE_DESCRIPTION } from '../config';

const author = {
	name: 'Paul Armstrong',
	email: 'me@paularmstrong.dev',
	link: `${SITE_URL}/about`,
};

export const feed = new Feed({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	id: SITE_URL,
	link: SITE_URL,
	language: 'en',
	image: `${SITE_URL}/assets/icon-512.png`,
	favicon: `${SITE_URL}/assets/favicon.ico`,
	copyright: `©${new Date().getFullYear()} Paul Armstrong. All rights reserved.`,
	feedLinks: {
		json: `${SITE_URL}/feed.json`,
		rss: `${SITE_URL}/feed.xml`,
	},
	author,
});

interface Post {
	url?: string;
	frontmatter: {
		title: string;
		description?: string;
		draft?: boolean;
		pubDate: string;
		heroImage?: { src: string; width: number; height: number };
	};
}

const rawPosts = import.meta.glob<Post>('../../blog/**/*.{md,mdx}', { eager: true });

for (const post of Object.values(rawPosts)) {
	if (!post || !post.url || post.frontmatter.draft) {
		continue;
	}

	const urlMatch = post.url
		.replace(/\.mdx?\/?$/, '')
		.match(/^blog\/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})-(?<slug>.+)$/);
	if (!urlMatch?.groups) {
		continue;
	}

	const url = `${SITE_URL}/blog/${Object.values(urlMatch.groups).join('/')}/`;

	const item: Item = {
		title: post.frontmatter.title,
		description: post.frontmatter.description || '',
		id: url,
		link: url,
		date: new Date(post.frontmatter.pubDate),
		author: [author],
	};
	if (post.frontmatter.heroImage?.src) {
		item.image = `${SITE_URL}${post.frontmatter.heroImage.src}`;
	}

	feed.addItem(item);
}

// @ts-ignore silly TS
feed.items.sort((a, b) => b.date - a.date);
