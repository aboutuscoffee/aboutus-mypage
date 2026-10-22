import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/aboutus-mypage/',
  server: { port: 5185 },
});
