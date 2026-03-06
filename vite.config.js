import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/token-calculator/',
  plugins: [vue()]
});
