import type { AxeResults } from 'axe-core'
import type {
    BaseOptions,
    ReportScreenshot,
    ReportSingleOptions
} from './reportOptions'

export type Screenshot = Omit<ReportScreenshot, 'data'> & {
    data: Buffer
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
