import react from '@vitejs/plugin-react';
import path from 'path';
import { type UserConfigFn, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const config: UserConfigFn = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '5000'),
      strictPort: true,
      watch: { ignored: ['node_modules'] },
      hmr: true,
    },
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
};

export default config;
