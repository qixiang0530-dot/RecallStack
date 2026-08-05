import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      registerType: 'autoUpdate',
      manifest: {
        name: 'RecallStack',
        short_name: 'RecallStack',
        description: '用主动回忆复习 Java 知识，并把个人资料拆成可审核卡片',
        theme_color: '#f5f3ed',
        background_color: '#f5f3ed',
        display: 'standalone',
        start_url: '.',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      }
    })
  ],
  base: './'
})
