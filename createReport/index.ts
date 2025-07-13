import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export function createReport(result: any) {

    const report = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', "..", 'dist', 'index.html'), 'utf-8')
    return `${report}<script>window.axeResult=${JSON.stringify(result)}</script>`

}