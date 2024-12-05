import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
  ],
  build: {
    // Specify the output directory for the built assets
    outDir: 'public/build',
    // Ensure the output directory is emptied before each build
    emptyOutDir: true,
    // Generate a manifest file
    manifest: true,
  },
});

