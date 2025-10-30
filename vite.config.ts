import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // Bundle Analyzer (nur im Build)
        visualizer({
            filename: './dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
        })
    ],

    build: {
        // Target für moderne Browser (bessere Performance)
        target: 'es2015',

        // Minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Console.logs in Production entfernen
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug'],
            },
            format: {
                comments: false, // Kommentare entfernen
            },
        },

        // Code-Splitting optimieren
        rollupOptions: {
            output: {
                // Vendor-Libraries in separate Chunks
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'helmet-vendor': ['@vuer-ai/react-helmet-async'],
                    'icons-vendor': ['lucide-react'],
                },
                // Asset-Namen für besseres Caching
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                // ✅ FIX: Typ für assetInfo hinzugefügt
                assetFileNames: (assetInfo: { name?: string }) => {
                    if (!assetInfo.name) {
                        return 'assets/[name]-[hash][extname]';
                    }
                    const info = assetInfo.name.split('.');
                    const ext = info[info.length - 1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                        return `assets/images/[name]-[hash][extname]`;
                    } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
                        return `assets/fonts/[name]-[hash][extname]`;
                    }
                    return `assets/[ext]/[name]-[hash][extname]`;
                },
            },
        },

        // Source Maps nur für Development
        sourcemap: false,

        // Chunk Size Warnings
        chunkSizeWarningLimit: 1000,

        // CSS Code Splitting
        cssCodeSplit: true,

        // Report Compressed Size
        reportCompressedSize: true,
    },

    // Server-Konfiguration für Development
    server: {
        port: 5173,
        strictPort: false,
        open: true,
        cors: true,
    },

    // Preview-Server nach Build
    preview: {
        port: 4173,
        strictPort: false,
        open: true,
    },

    // Optimierungen
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
    },
})