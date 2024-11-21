import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {
        // Ajoutez cette ligne pour vous assurer que Vite gère les fichiers CSS
      }
    }
  },
  plugins: [react()],
})
