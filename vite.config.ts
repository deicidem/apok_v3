import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
let env: string = '';
for (const e in process.env) {
  if (/VITE_/i.test(e)) {
    env += `$${e}: "${process.env[e]}";`;
  }
}
  return {
    plugins: [
      vue(),
      // vueJsx(),
    ],
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://192.168.1.104',
          changeOrigin: true,
          // rewrite(path) {
          //   return path.replace('^/api', '');
          // },
          // bypass(req) {
          //   req.headers.origin = 'http://192.168.1.104';
          // },
        },
        // '/storage': {
        //   target: 'http://192.168.1.104/storage/',
        //   changeOrigin: true,
        //   rewrite(path) {
        //     return path.replace('^/storage', '');
        //   },
        //   bypass(req) {
        //     req.headers.origin = 'http://192.168.1.104';
        //   },
        // },
        // '/docs': {
        //   target: 'http://192.168.1.104/docs/',
        //   changeOrigin: true,
        //   rewrite(path) {
        //     return path.replace('^/docs', '');
        //   },
        //   bypass(req) {
        //     req.headers.origin = 'http://192.168.1.104';
        //   },
        // },
        // '/broadcasting/auth': {
        //   target: 'http://192.168.1.104/broadcasting/auth',
        //   changeOrigin: true,
        //   rewrite(path) {
        //     return path.replace('^/broadcasting/auth', '');
        //   },
        //   bypass(req) {
        //     req.headers.origin = 'http://192.168.1.104';
        //   },
        // },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            ${env} @import "@/assets/styles/variables.scss";`,
        },
      },
    },
  };
});
