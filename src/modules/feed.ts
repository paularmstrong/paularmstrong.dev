import { getCollection } from 'astro:content';
import { renderMarkdown } from '@astrojs/markdown-remark';
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

const rawPosts = (
	await getCollection('blog', ({ data }) => {
		return import.meta.env.DEV || !data.draft;
	})
)
	.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf())
	.map((post) => {
		const match = post.slug.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})-(?<slug>.+)/);
		if (!match) {
			return null;
		}
		return { ...post, slug: Object.values(match.groups!).join('/') };
	})
	.filter((post) => Boolean(post) && (import.meta.env.DEV || !post?.data?.draft));

for (const post of rawPosts) {
	if (!post || !post.slug || post.data.draft) {
		continue;
	}

	const url = `${SITE_URL}/blog/${post.slug}/`;
	const { code: description } = await renderMarkdown(
		`${post.data.description || ''}\n\n[Continue reading…](${url})`,
		{}
	);

	const item: Item = {
		title: post.data.title,
		description,
		id: url,
		link: url,
		date: post.data.pubDate,
		author: [author],
	};
	if (post.data.heroImage?.src) {
		item.image = `${SITE_URL}${post.data.heroImage.src}`;
	}

	feed.addItem(item);
}

// @ts-ignore silly TS
feed.items.sort((a, b) => b.date - a.date);
