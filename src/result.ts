import type { AxeResults, Result } from 'axe-core'

export enum ResultType {
    PASSED = "passed",
    VIOLATION = "violation",
    INCOMPLETE = "incomplete",
    INAPPLICABLE = "inapplicable"
}

export enum RuleType {
    ANY = "any",
    ALL = "all",
    NONE = "none",
}

export enum Impact {
    MINOR = "minor",
    MODERATE = "moderate",
    SERIOUS = "serious",
    CRITICAL = "critical"
}

export type ModResult = AxeResults & { tests: ModResultEntry[] }
export type ModResultEntry = Result & { resultType: ResultType, index: number }
