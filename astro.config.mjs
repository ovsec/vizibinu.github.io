import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';
//import vercelEdge from '@astrojs/vercel/edge';

// https://astro.build/config
export default defineConfig({

  integrations: [mdx(), tailwind(), svelte(),
    partytown({
    // Adds dataLayer.push as a forwarding-event.
    config: {
      forward: ['dataLayer.push']
    }
    })

  ],
  site: 'https://www.abhisheksaha.xyz',
  vite: {
    ssr: {
      noExternal: ['three', 'troika-three-text', 'geolib', '@fontsource/nunito', 'cube.gl', 'astro-seo'],
      external: ['svgo']
    }
  }
});