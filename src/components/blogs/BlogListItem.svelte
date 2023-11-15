<script lang="ts">
import type { CollectionEntry } from 'astro:content';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

interface $$Props {
    blog:CollectionEntry<'blogs'>,
    readingTime? : Date
}

export let blog:CollectionEntry<'blogs'> ;
const {slug, data : {title, publishDate, description, tags, image} = {}} = blog;

</script>

<article class="group gap-1 relative flex flex-col items-start p-4 text-start break-inside-avoid mb-8 bg-zinc-950 hover:bg-zinc-900 rounded-md transition-colors">
    
    <h2 class="text-xl capitalize font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        <div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl">
        </div>
        <a href={`/blogs/${slug}`}>
            <span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span class="relative z-10 line-clamp-1 md:line-clamp-2">{title}</span>
            </a>
    </h2>
    <time class="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5" datetime="2022-09-05">
        <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true" >
            <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
        </span>
        <span>
            {dayjs(publishDate).fromNow()}
        </span>
        <span>
            <!-- TODO: Add minutes to read -->
        </span>
    </time>
    {#if image} <img src={image?.src} alt="hi" class="order-first hidden  @sm/blogs:block w-full h-32 rounded-sm"> {/if}
    {#if description}
    <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1 md:line-clamp-2 ">
        {description} 
    </p>
    {/if}
    {#if tags}
    <div class="flex gap-1 flex-wrap">
        {#each tags as tag, i}
            <a href={`/search?search=${tag}`} class=" px-2 py-1 items-center justify-center bg-zinc-600/30 text-xs rounded-full">{`#${tag}`}</a>
        
        {/each}
    </div>
    {/if}
    <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium text-indigo-500 group-hover:underline">
        Read article
        <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            class="ml-1 h-4 w-4 stroke-current">
            <path
                d="M6.75 5.75 9.25 8l-2.5 2.25"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round">
            </path>
        </svg>
    </div>
</article>
