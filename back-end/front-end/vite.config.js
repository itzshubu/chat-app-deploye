import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access (default: localhost)
    port: 3000,      // Custom port
    open: true,      // Automatically opens the browser
    proxy: {         // Proxy API requests
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }, 
    cors: true       // Enable CORS
  }
})
