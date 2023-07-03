import { sveltekit } from '@sveltejs/kit/vite';
// import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from 'vite';
// import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  // plugins: [sveltekit(), basicSsl()],
  plugins: [sveltekit()],
  server: {
    // port: 3030,
    host: "127.0.0.1",
    strictPort: true,

  },
  root: "./src",
  publicDir: "./static",
  build: {
    outDir: "./build"
  },
  assetsInclude: []
});
