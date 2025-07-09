import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks for better caching
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
            return 'vendor.charts'
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/@tanstack') || id.includes('node_modules/react-router')) {
            return 'vendor.react'
          }
          if (id.includes('node_modules/zustand')) {
            return 'vendor.zustand'
          }
          if (id.includes('node_modules/react-icons')) {
            return 'vendor.icons'
          }
          // App-specific chunks
          if (id.includes('src/components/ChartsBundle')) {
            return 'charts.bundle'
          }
          if (id.includes('src/pages/StatsPage')) {
            return 'stats.page'
          }
          if (id.includes('src/components/DataTable')) {
            return 'datatable.component'
          }
        }
      }
    }
  }
})
