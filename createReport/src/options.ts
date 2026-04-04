import type { AxeResults } from 'axe-core'
import type {
    BaseOptions,
    ReportScreenshot,
    ReportSingleOptions
} from './reportOptions'

export type Screenshot = Omit<ReportScreenshot, 'data'> & {
    data: Uint8Array
}

export type SingleOptions = Omit<ReportSingleOptions, 'screenshot'> & {
    screenshot?: Screenshot
}

export type CreateReportOptions = BaseOptions & SingleOptions

export type ResultsEntry =
    | ({
          /** axe-core results. */
          results: AxeResults
      } & SingleOptions)
    | AxeResults
