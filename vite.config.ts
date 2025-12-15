import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve((process as any).cwd(), './'),
      },
    },
    define: {
      // Define process.env variables to be available in the client code
      // We check for both standard names and VITE_ prefixed names
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env.MANATAL_API_KEY': JSON.stringify(env.MANATAL_API_KEY || env.VITE_MANATAL_API_KEY || ''),
      'process.env.VITE_AIRTABLE_API_KEY': JSON.stringify(env.VITE_AIRTABLE_API_KEY || ''),
      'process.env.VITE_AIRTABLE_BASE_ID': JSON.stringify(env.VITE_AIRTABLE_BASE_ID || ''),
    },
    // ✅ FIX axios “Outdated Optimize Dep”
    optimizeDeps: {
      include: ['axios'],
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
    },
  };
});
