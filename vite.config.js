import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon.svg', 'favicon.png'],
      injectRegister: 'auto',

      includeAssets: ['service-worker.js'],
      
      manifest: {
        name: 'Calculator App',
        short_name: 'Calculator',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        lang: 'en',
        theme_color: '#ffffff',
        icons: [
          {
            src: './vite.svg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './vite.svg',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x5`',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: './vite.svg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
    }),
  ],
});