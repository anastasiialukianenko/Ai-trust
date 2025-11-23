import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages
  // Repository: anastasiialukianenko/Ai-trust
  // So the base should be '/Ai-trust/'
  base: process.env.GITHUB_PAGES_BASE || '/Ai-trust/',
})

