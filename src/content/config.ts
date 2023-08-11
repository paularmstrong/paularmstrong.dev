import { defineCollection, z } from 'astro:content';

export const collections = {
	blog: defineCollection({
		schema: z.object({
			description: z.string().optional(),
			draft: z.boolean().optional(),
			noHero: z.boolean().optional(),
			heroImage: z
				.object({
					src: z.string().startsWith('/img/'),
					width: z.number(),
					height: z.number(),
				})
				.optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			title: z.string(),
			toc: z.boolean().optional(),
		}),
	}),
};
