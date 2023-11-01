// 1. Import utilities from `astro:content`

import { z, defineCollection, reference } from 'astro:content';

// 2. Define your collection(s)
const blogCollection = defineCollection({
	type: 'content', // v2.5.0 and later
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		image: z.object({ src: z.string(), alt: z.string().optional() }).optional(),
		description: z.string().optional(),
		publishDate: z.date(),
		
		author: reference('authors'),
		relatedBlogs: z.array(reference('blogs')).optional(),
		draft: z.boolean().default(false),
	}),
});

const authors = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		email: z.string().email(),
		portfolio: z.string().url().optional(),
		image: z.string().optional()
	}),
});

//TODO: Add testimonials as collections

export const collections = {
	blogs: blogCollection,
	authors,
};
