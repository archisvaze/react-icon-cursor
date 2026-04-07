import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'react-icon-cursor',
            fileName: (format) => `react-icon-cursor.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-dom/server'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-dom/server': 'ReactDOMServer',
                },
            },
        },
    },
    plugins: [react()],
    server: { port: 3000 },
});
