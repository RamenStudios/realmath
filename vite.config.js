import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const HOST_URL = 'https://ramenstudios.github.io/realmath/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `${HOST_URL}`,
})
