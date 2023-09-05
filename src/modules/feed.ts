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
const copyright = (date: Date) => `©${date.getFullYear()} Paul Armstrong. All rights reserved.`;

export const feed = new Feed({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	id: SITE_URL,
	link: SITE_URL,
	language: 'en',
	image: `${SITE_URL}/img/square.jpg`,
	favicon: `${SITE_URL}/img/favicon.ico`,
	copyright: copyright(new Date()),
	updated: new Date(),
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
).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

for (const post of rawPosts) {
	const match = post.slug.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})-(?<slug>.+)/);
	if (!match || !post.slug || post.data.draft) {
		continue;
	}
	const slug = Object.values(match.groups!).join('/');

	const url = `${SITE_URL}/blog/${slug}/`;
	const { code: description } = await renderMarkdown(
		`${post.data.description || ''}\n\n[Continue reading…](${url})`,
		{},
	);

	const item: Item = {
		title: post.data.title,
		description,
		id: url,
		link: url,
		date: post.data.pubDate,
		published: post.data.pubDate,
		author: [author],
		copyright: copyright(post.data.pubDate),
	};
	if (post.data.heroImage?.src) {
		item.image = `${SITE_URL}${post.data.heroImage.src}`;
	}

	feed.addItem(item);
}
