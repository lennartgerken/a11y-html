import { type ResultType } from './enums'
import type { AxeResults, Result } from 'axe-core'

export type ModResults = AxeResults & { tests: ModResultEntry[] }
export type ModResultEntry = Result & { resultType: ResultType, index: number }
