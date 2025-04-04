import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
       svgr(),
    ],
    test: {
        environment: 'jsdom', // Ez biztosítja, hogy a React Testing Library működjön
        globals: true, // Így nem kell minden fájlban importálni a `test`-et
        setupFiles: './vitest.setup.js' // Itt adjuk hozzá
      },
});
