import type { AxeResults } from 'axe-core'

export type BaseOptions = {
    /** Sets the html title.  */
    title?: string
    /** Sets the heading of the report.  */
    heading?: string
    /** Hides all results of type "inapplicable". */
    hideInapplicable?: boolean
}

export type CreateReportOptions = {
    /** Sets the html title.  */
    title?: string
    /** Sets the heading of the report.  */
    heading?: string
    /** Sets an additional info under the url. */
    info?: string
    /** Hides all results of type "inapplicable". */
    hideInapplicable?: boolean
}

export type ResultsEntry =
    | {
          /** axe-core results. */
          results: AxeResults
          /** Sets an additional info under the url. */
          info: string
      }
    | AxeResults
