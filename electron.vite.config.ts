import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  main: {
    resolve: {
      alias: { '@shared': resolve(__dirname, 'src/shared') }
    },
    build: {
      rollupOptions: {
        external: ['electron', /^node:/]
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        external: ['electron', /^node:/]
      }
    }
  },
  renderer: {
    resolve: {
      alias: { '@shared': resolve(__dirname, 'src/shared') }
    },
    plugins: [react()]
  }
})
