import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo from https://elhaj101.github.io/ali/, not the
  // domain root, so every asset URL needs the /ali/ prefix. Change this to '/'
  // if the site ever moves to a root domain (Vercel, Netlify, a custom domain).
  base: '/ali/',
  plugins: [react(), tailwindcss()],
})
