import { MarkdownInstance } from "astro";
import { Frontmatter, sortDateDescending } from "../../lib/misc";

export async function GET() {
    const allPosts = import.meta.glob<MarkdownInstance<Frontmatter>>("../blogs/**/*.{md,mdx}", { eager: true }); // Vite
    const posts = sortDateDescending(Object.values(allPosts))
        .filter((ele) => ele.frontmatter.draft != true)
        .map((ele) => {

            return {
                title: ele.frontmatter.title,
                url: ele.url,
                thumbnailUrl: ele.frontmatter.image,
                content: ele.rawContent(),
                publishedDate: ele.frontmatter.publishDate,
                tags: ele.frontmatter.tags,
            };
        });
    
    const LIMIT = 2;

    return {
        body: JSON.stringify(posts.slice(0, LIMIT)),
    };
}