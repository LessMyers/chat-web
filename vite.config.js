import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // 忽略 emoji-picker 自定义元素
        isCustomElement: tag => tag === 'emoji-picker'
      }
    }
  })],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})