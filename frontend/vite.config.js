import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // 👈 Important for correct asset loading on Render
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
