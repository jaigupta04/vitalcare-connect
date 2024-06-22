import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': 'https://readme-be.vercel.app',
      // {
      //   target: 'https://readme-be.vercel.app',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace('/api/', '/')
      // },
    }
  }
});
