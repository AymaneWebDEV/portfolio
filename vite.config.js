import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        base: env.VITE_BASE_URL || '/',
        plugins: [
            react({
                jsxImportSource: '@emotion/react',
                babel: {
                    plugins: ['@emotion/babel-plugin'],
                },
            }),
            // Visualize bundle size
            visualizer({
                open: false,
                gzipSize: true,
                brotliSize: true,
            }),
            // PWA Support
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
                manifest: {
                    name: env.VITE_APP_TITLE || 'Portfolio',
                    short_name: 'Portfolio',
                    description: 'Personal portfolio website',
                    theme_color: '#3b82f6',
                    background_color: '#ffffff',
                    display: 'standalone',
                    icons: [
                        {
                            src: '/icons/icon-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: '/icons/icon-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                    ],
                },
            }),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        server: {
            port: 3000,
            open: true,
            host: true,
        },
        build: {
            outDir: 'dist',
            sourcemap: mode !== 'production',
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', 'react-router-dom'],
                        framer: ['framer-motion'],
                    },
                },
            },
        },
        optimizeDeps: {
            include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
        },
        define: {
            __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
            'process.env': {},
        },
    };
});
