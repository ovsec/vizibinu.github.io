import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from "@astrojs/svelte";
import { astroImageTools } from "astro-imagetools";

//import mdx from "@astrojs/mdx";


// https://astro.build/config
export default defineConfig({
 
  integrations: [tailwind(), svelte(), /* mdx() */astroImageTools],
  site: "https://vizibinu.github.io",
  
  vite: {
    ssr: {
      noExternal: ['three', 'troika-three-text', 'geolib', '@fontsource/nunito'],
      external: ["svgo"],
    }
  },
  legacy: {
    astroFlavoredMarkdown: true
  }
});