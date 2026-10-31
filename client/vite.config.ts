import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Sends /api calls to the Express server during development.
  server: { proxy: { '/api': 'http://localhost:3001' } },
})
