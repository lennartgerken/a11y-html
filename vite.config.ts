import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
    build: {
        modulePreload: false,
        outDir: './createReport/html',
        rollupOptions: {
            external: ['axe-core']
        }
    },
    plugins: [vue(), tailwindcss(), viteSingleFile()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@options': fileURLToPath(
                new URL('./createReport/src/reportOptions.ts', import.meta.url)
            )
        }
    }
})
