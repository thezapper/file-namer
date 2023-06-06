import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port:3001,
		host:"127.0.0.1",
		strictPort:true
	  },
	  root: "./src",
	  publicDir: "./static",
	  build: {
		outDir: "./build"
	  }
});
