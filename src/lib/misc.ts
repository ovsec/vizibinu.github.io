import { AstroInstance, MarkdownInstance } from "astro";
export interface Frontmatter {
    title: string;
    description?: string;
    publishDate: string;
    image: string;
    tags: [string];
    draft: boolean;
}

export const sortDateDescending = (arr:MarkdownInstance<Frontmatter>[]) =>{
    return arr.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        
        return  b.frontmatter.publishDate.localeCompare(a.frontmatter.publishDate)
        //new Date(b.frontmatter.publishedDate).loc - new Date(a.frontmatter.publishedDate);
    });
}