import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export function createReport(results: unknown) {
    const report = readFileSync(
        join(
            dirname(fileURLToPath(import.meta.url)),
            '..',
            '..',
            'dist',
            'index.html'
        ),
        'utf-8'
    )
    return `${report}<script>window.axeResults="${Buffer.from(JSON.stringify(results)).toString('base64')}"</script>`
}
