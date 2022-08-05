import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from "@astrojs/svelte";

//import mdx from "@astrojs/mdx";

const dev = true;
// https://astro.build/config
export default defineConfig({
 
  integrations: [tailwind(), svelte()],
  site: "https://sahaabhishek.github.io",
  
  vite: {
    ssr: {
      noExternal: ['three', 'troika-three-text', 'geolib'],
      external: ["svgo"],
    }
  },
  legacy: {
    astroFlavoredMarkdown: true
  }
});