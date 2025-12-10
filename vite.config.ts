
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Define process.env variables to be available in the client code
      // We check for both standard names and VITE_ prefixed names
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env.MANATAL_API_KEY': JSON.stringify(env.MANATAL_API_KEY || env.VITE_MANATAL_API_KEY || '')
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
    },
  };
});
