import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: './a11y-html.ts',
            formats: ['es', 'cjs']
        },
        minify: false,
        rollupOptions: {
            external: ['axe-core']
        }
    }
})
