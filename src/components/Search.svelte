<script lang="ts">
	import Fuse from 'fuse.js';
	import BlogListItem from './blogs/BlogListItem.svelte';
	import type { CollectionEntry } from 'astro:content';

	interface $$Props {
		list: CollectionEntry<'blogs'>[];
	}

	export let list: CollectionEntry<'blogs'>[];
	export let search = '';
	const options = {
		keys: ['data.title', 'data.description', 'slug'],
		includeMatches: true,
		minMatchCharLength: 2,
		threshold: 0.5,
	};

	const fuse = new Fuse(list, options);

	//let search=''

	$: blogs = fuse
		.search(search)
		.map((result) => result.item)
		.slice(0, 5);
</script>

<div class="">
	<input
		bind:value={search}
		type="search"
		placeholder="Start typing to search blogs..."
		aria-label="Search"
		required
		class="w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
	/>

	<div>
		<ul class="flex flex-col gap-2 bg-zinc-950/20 rounded-b-md overflow-x-hidden">
			{#each blogs as blog, index}
				<li id={`${index}`} class="hover:bg-zinc-900/30 py-1" >
					<a href={`${blog.slug}`}>
						
						<BlogListItem {blog} />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
