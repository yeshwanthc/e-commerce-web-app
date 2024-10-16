import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react-swc';

// Get the current directory name in an ES module environment
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Vite configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),  // Alias '@' to the 'src' directory
    },
  },
});
