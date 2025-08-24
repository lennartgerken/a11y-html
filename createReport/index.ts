import type { AxeResults } from 'axe-core'
import report from './html/index.html?raw'
import { Options } from './options'

/**
 * Takes axe-core results and creates an html report.
 * @param results axe-core results.
 * @param options Additional options to customize the html report.
 * @returns html report as a string.
 */
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
