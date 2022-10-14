import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

const postResult = import.meta.glob('../../blog/**/*.{md,mdx}', { eager: true });
const posts = Object.values(postResult)
	.map((post) => {
		if (!post.url) {
			return false;
		}
		const urlMatch = post.url
			.replace(/\.mdx?$/, '')
			.match(/^blog\/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})-(?<slug>.+)/);
		if (!urlMatch) {
			return false;
		}
		return {
			link: `/blog/${Object.values(urlMatch.groups).join('/')}`,
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			pubDate: new Date(post.frontmatter.pubDate),
		};
	})
	.sort((a, b) => b.pubDate - a.pubDate)
	.filter(Boolean);

export const get = () =>
	rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts,
		stylesheet: '/rss/styles.xsl',
	});
