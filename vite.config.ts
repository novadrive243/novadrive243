
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: 'react',
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      // Make sure all dynamic imports are properly handled
      output: {
        manualChunks: {
          // Split larger vendor packages into separate chunks
          'vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },
  optimizeDeps: {
    // Force pre-bundling of problematic dependencies
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    esbuildOptions: {
      // Improve compatibility
      target: 'es2020',
    }
  },
}));
