import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from "@astrojs/svelte";

//import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
 
  integrations: [tailwind(), svelte()],
  site: "https://sahaabhishek.github.io",
  base: "/beyonde",
  vite: {
    ssr: {
      noExternal: ['three', 'troika-three-text', 'geolib']
    }
  },
  legacy: {
    astroFlavoredMarkdown: true
  }
});