
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    // These settings only apply to local development ('npm run dev')
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173
    }
  }
});
