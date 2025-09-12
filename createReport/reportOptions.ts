import type { AxeResults } from 'axe-core'

export function isAxeResults(
    results: AxeResults | { results: AxeResults }
): results is AxeResults {
    return (results as AxeResults).violations !== undefined
}

export type BaseOptions = {
    /** Sets the html title.  */
    title?: string
    /** Sets the heading of the report.  */
    heading?: string
    /** Hides all results of type "inapplicable". */
    hideInapplicable?: boolean
}

export type ReportScreenshot = {
    data: string
    mimeType: string
}

export type ReportSingleOptions = {
    /** Sets an additional info under the url. */
    info?: string
    /** Displays an image in the report. */
    screenshot?: ReportScreenshot
}

export type ReportResultsEntry =
    | ({
          /** axe-core results. */
          results: AxeResults
      } & ReportSingleOptions)
    | AxeResults
