// 1. Import utilities from `astro:content`
import { string } from 'astro/zod';
import { z, defineCollection } from 'astro:content';


// 2. Define your collection(s)
const blogCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
      title: z.string(),
      tags: z.array(z.string()),
      image: z.object({ src: z.string(), alt: z.string().optional()}).optional(),
      description: z.string().optional(),
      publishDate: z.date()
    }),
  });

//TODO: Add testimonials as collections 

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blogs': blogCollection,
  
};