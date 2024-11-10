import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',  // Ensure the build output is going to the `dist` folder
  },
  base: '/umasshack24/',  // Set base to your GitHub repo name if deploying to a repo (remove if personal site)
});

