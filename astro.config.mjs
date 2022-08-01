import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  site: "https://sahaabhishek.github.io",
  base: "/my-blog",
  vite: {
    ssr: {
      noExternal: ['three', 'troika-three-text', 'geolib']
    }
  }
});