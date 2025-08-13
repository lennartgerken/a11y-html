import type { ResultType } from '@/result'

export type Search = {
    searchValue: string
    resultFilterValue: ResultType | undefined
    tagFilterValue: string[]
}
