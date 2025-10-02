import report from './html/index.html?raw'
import type { AxeResults } from 'axe-core'
import type { CreateReportOptions, ResultsEntry } from './options'
import type {
    BaseOptions,
    ReportResultsEntry,
    ReportScreenshot
} from './reportOptions'
import { ALLOWED_MIME_TYPE, isAxeResults } from './reportOptions'

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
    const { info, switchInfo, screenshot, ...baseOptions } = options
    return createMergedReport(
        [{ results, info, switchInfo, screenshot }],
        baseOptions
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
    const reportResults: ReportResultsEntry[] = results.map((current) => {
        if (isAxeResults(current)) return current
        const { screenshot: screenshotBase, ...reportResultEntry } = current
        if (
            !screenshotBase ||
            !ALLOWED_MIME_TYPE.includes(screenshotBase.mimeType)
        )
            return reportResultEntry
        const screenshot: ReportScreenshot = {
            data: screenshotBase.data.toString('base64'),
            mimeType: screenshotBase.mimeType
        }
        return { ...reportResultEntry, screenshot }
    })
    return writeResultsToReport(reportResults, options)
}

function writeResultsToReport(
    results: ReportResultsEntry[],
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
