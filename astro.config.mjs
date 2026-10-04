import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['ai.demile.my.id', 'berita.demile.my.id', 'localhost'],
    },
  },
  output: 'server',
  adapter: vercel(),
});
