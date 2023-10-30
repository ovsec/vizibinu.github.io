import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		svelte() /* mdx() astroImageTools */,
		mdx(),
		partytown({
			// Adds dataLayer.push as a forwarding-event.
			config: {
				forward: ['dataLayer.push'],
			},
		}),
	],
	site: 'https://vizibinu.github.io',
	vite: {
		ssr: {
			noExternal: [
				'three',
				'troika-three-text',
				'geolib',
				'@fontsource/nunito',
				'cube.gl',
				'astro-seo',
			],
			external: ['svgo'],
		},
	},
});
