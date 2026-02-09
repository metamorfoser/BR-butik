import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: "/BR-butik/", //för github
  server: {
    open: true,   //  öppnar webbläsaren automatiskt
    port: 5173    //  ändra port här
  },
  plugins: [react()],
})

