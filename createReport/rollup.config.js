import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dts } from 'rollup-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
    {
        input: path.resolve(__dirname, './dist/types/a11y-html.d.ts'),
        output: [
            {
                file: path.resolve(__dirname, 'dist/a11y-html.d.ts'),
                format: 'es'
            }
        ],
        external: ['axe-core'],
        plugins: [dts()]
    }
]
