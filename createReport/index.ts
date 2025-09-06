import type { AxeResults } from 'axe-core'
import report from './html/index.html?raw'
import type { BaseOptions, CreateReportOptions, ResultsEntry } from './options'

/**
 * Takes axe-core results and creates an html report.
 * @param results axe-core results.
 * @param options Additional options to customize the html report.
 * @returns html report as a string.
 */
export function createReport(
    results: AxeResults,
    options: CreateReportOptions = {}
) {
    return createMergedReport(
        [options.info ? { results, info: options.info } : results],
        options
    )
}

/**
 * Takes multiple axe-core results and creates an html report.
 * @param results List of axe-core results.
 * @param options Additional options to customize the html report.
 * @returns html report as a string.
 */
export function createMergedReport(
    results: ResultsEntry[],
    options: BaseOptions = {}
) {
    return `
    ${report}
    <script>
    ${getWindowString('axeResults', results)}
    ${getWindowString('a11yOptions', options)}
    </script>`
}

function getWindowString(name: string, obj: object) {
    return `window.${name}="${Buffer.from(JSON.stringify(obj)).toString('base64')}"`
}
