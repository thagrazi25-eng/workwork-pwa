import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/workwork-pwa/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      // O plugin gera e registra o SW automaticamente
      // As configs abaixo espelham o manifest.json
      manifest: false, // usamos nosso próprio /public/manifest.json
      workbox: {
        // Arquivos que o SW vai pré-cachear
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Rotas que funcionam offline (retorna index.html)
        navigateFallback: '/index.html',
        // Não cachear chamadas à API do Supabase
        navigateFallbackDenylist: [/^\/rest\/v1/, /^\/auth\/v1/],
        runtimeCaching: [
          {
            // Cache de avatars e imagens do Storage
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'supabase-storage',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 }
            }
          },
          {
            // Cache de fontes Google
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      }
    })
  ]
})
