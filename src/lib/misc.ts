import { AstroInstance, MarkdownInstance } from "astro";
export interface Frontmatter {
    title: string;
    description?: string;
    publishedDate: string;
    image: string;
    tags: [];
    draft: boolean;
}

export const sortDateDescending = (arr:MarkdownInstance<Frontmatter>[]) =>{
    return arr.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.frontmatter.publishedDate) - new Date(a.frontmatter.publishedDate);
    });
}