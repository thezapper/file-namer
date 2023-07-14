import { sveltekit } from '@sveltejs/kit/vite';
// import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from 'vite';
// import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  envPrefix: ["VITE_", "TAURI_"],
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
    outDir: "./build",
    target: ["es2021", process.env.TAURI_PLATFORM === "windows" ? "chrome97" : "safari13"],
    minify: !process.env.TAURI_DEBUG && "esbuild",
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  assetsInclude: []
});
