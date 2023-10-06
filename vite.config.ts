  import { fileURLToPath, URL } from 'node:url'

  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'

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
        '/xkcd': {
          target: 'https://xkcd.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/xkcd/, "")
        }
      }
    }
  })
