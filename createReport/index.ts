import type { AxeResults } from 'axe-core'
import report from './html/index.html?raw'
import { Options } from './options'

export default function createReport(
    results: AxeResults,
    options: Options = {}
) {
    return `
    ${report}
    <script>
    window.axeResults="${Buffer.from(JSON.stringify(results)).toString('base64')}"
    window.a11yOptions="${Buffer.from(JSON.stringify(options)).toString('base64')}"
    </script>`
}
