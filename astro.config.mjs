// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://hoogly.ai',
  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@venn': '/src/components/venn'
      }
    }
  },
});