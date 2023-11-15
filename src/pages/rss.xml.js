import rss from '@astrojs/rss';
import { SITE_CONFIG } from '@lib/constants';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blogs = await getCollection('blogs');
  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site,
    items: blogs.map((blog) => ({
      title: blog.data.title,
      pubDate: blog.data.publishDate,
      description: blog.data.description,
      //customData: post.data.customData,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blogs/${blog.slug}/`,
    })),
  });
}