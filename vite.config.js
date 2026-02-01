// vite.config.js - For Vercel
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: '/AceMotionPictures/' // REMOVE or COMMENT OUT this line
})