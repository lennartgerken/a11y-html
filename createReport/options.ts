import type { AxeResults } from 'axe-core'
import type {
    BaseOptions,
    ReportScreenshot,
    ReportSingleOptions
} from './reportOptions'

type Replace<T, K extends keyof T, New> = Omit<T, K> & {
    [P in K]: T[P] extends T[P] ? New : never
}

export type Screenshot = Replace<ReportScreenshot, 'data', Buffer>

export type SingleOptions = Replace<
    ReportSingleOptions,
    'screenshot',
    Screenshot
>

export type CreateReportOptions = BaseOptions & SingleOptions

export type ResultsEntry =
    | ({
          /** axe-core results. */
          results: AxeResults
      } & SingleOptions)
    | AxeResults
