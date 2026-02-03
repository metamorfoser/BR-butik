import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    open: true,   //  öppnar webbläsaren automatiskt
    port: 5173    //  ändra port här
  },
  plugins: [react()],
})
