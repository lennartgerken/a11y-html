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

export const ALLOWED_MIME_TYPE = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp'
] as const

export type MimeType = (typeof ALLOWED_MIME_TYPE)[number]

export type ReportScreenshot = {
    data: string
    mimeType: MimeType
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
