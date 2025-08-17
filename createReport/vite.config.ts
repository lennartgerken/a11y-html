import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: './index.ts',
            formats: ['es', 'cjs']
        },
        minify: false,
        rollupOptions: {
            external: ['axe-core']
        }
    },
    plugins: [dts({ tsconfigPath: './tsconfig.json' })]
})
