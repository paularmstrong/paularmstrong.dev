import { getCollection } from 'astro:content';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { Feed } from 'feed';
import type { Item } from 'feed';
import { SITE_TITLE, SITE_URL, SITE_DESCRIPTION } from '../config';
import { getPostSlug } from './blog-post';

const author = {
	name: 'Paul Armstrong',
	email: 'me@paularmstrong.dev',
	link: `${SITE_URL}/about`,
};
const copyright = (date: Date) => `&copy;${date.getFullYear()} Paul Armstrong. All rights reserved.`;

export const feed = new Feed({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	id: SITE_URL,
	link: SITE_URL,
	language: 'en',
	image: `${SITE_URL}/img/favicon-32x32.png`,
	favicon: `${SITE_URL}/favicon.ico`,
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

const { render: renderMarkdown } = await createMarkdownProcessor({});

for (const post of rawPosts) {
	if (post.data.draft) {
		continue;
	}

	const url = `${SITE_URL}/blog/${getPostSlug(post)}/`;
	const { code: description } = await renderMarkdown(`${post.data.description || ''}\n\n[Continue reading…](${url})`);
	const { code: content } = await renderMarkdown(post.body);

	const item: Item = {
		title: post.data.title,
		description,
		id: url,
		link: url,
		date: post.data.pubDate,
		published: post.data.pubDate,
		author: [author],
		copyright: copyright(post.data.pubDate),
		content,
	};
	if (post.data.heroImage?.src) {
		item.image = `${SITE_URL}${post.data.heroImage.src}`;
	}

	feed.addItem(item);
}
