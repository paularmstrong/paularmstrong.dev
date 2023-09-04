import { defineCollection, z } from 'astro:content';

export const collections = {
	blog: defineCollection({
		schema: ({ image }) =>
			z.object({
				description: z.string().optional(),
				draft: z.boolean().optional(),
				noHero: z.boolean().optional(),
				heroImage: image().optional(),
				herAlt: z.string().optional(),
				pubDate: z.coerce.date(),
				updatedDate: z.coerce.date().optional(),
				title: z.string(),
				toc: z.boolean().optional(),
			}),
	}),
	labs: defineCollection({
		schema: ({ image }) =>
			z.object({
				description: z.string().optional(),
				heroImage: image(),
				herAlt: z.string().optional(),
				title: z.string(),
			}),
	}),
};
