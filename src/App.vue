<script setup lang="ts">
import { ref } from 'vue'
import type { AxeResults, Result } from 'axe-core'
import { ResultType, type A11yResult } from './result'
import Dependencies from './components/dependencies/Dependencies.vue'
import ResultsOverview from '@/components/resultsOverview/ResultsOverview.vue'
import type {
    BaseOptions,
    ReportResultsEntry,
    ReportSingleOptions
} from '@options'
import { isAxeResults } from '@options'
import { IconCode, IconArrowBackUp } from '@tabler/icons-vue'

declare global {
    interface Window {
        axeResults: string
        a11yOptions: string
    }
}

const decode = (base64: string) => {
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
    return new TextDecoder('utf-8').decode(bytes)
}

const options: BaseOptions = window.a11yOptions
    ? JSON.parse(decode(window.a11yOptions))
    : {}
if (options.title) document.title = options.title

const a11yResults = ref<A11yResult[] | undefined>()
const showDependencies = ref(false)

const setA11yResult = (axeResults: ReportResultsEntry[]) => {
    const setResultType = (tests: Result[], resultType: ResultType) => {
        return tests.map((test) => ({ ...test, resultType }))
    }

    a11yResults.value = axeResults.map((entry, index) => {
        let currentAxeResults: AxeResults
        let currentOptions: ReportSingleOptions = {}

        if (isAxeResults(entry)) currentAxeResults = entry
        else ({ results: currentAxeResults, ...currentOptions } = entry)

        const tests = [
            ...setResultType(
                currentAxeResults.violations,
                ResultType.VIOLATION
            ),
            ...setResultType(
                currentAxeResults.incomplete,
                ResultType.INCOMPLETE
            ),
            ...setResultType(currentAxeResults.passes, ResultType.PASSED)
        ].concat(
            options.hideInapplicable
                ? []
                : setResultType(
                      currentAxeResults.inapplicable,
                      ResultType.INAPPLICABLE
                  )
        )

        let resultType = ResultType.PASSED

        if (tests.find(({ resultType }) => resultType === ResultType.VIOLATION))
            resultType = ResultType.VIOLATION
        else if (
            tests.find(({ resultType }) => resultType === ResultType.INCOMPLETE)
        )
            resultType = ResultType.INCOMPLETE

        return {
            tests,
            url: currentAxeResults.url,
            timestamp: currentAxeResults.timestamp,
            resultType,
            id: index,
            ...currentOptions
        }
    })
}

const onUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target && target.files) {
        const results: AxeResults[] = []

        for (const file of target.files) {
            results.push(JSON.parse(await file.text()))
        }

        setA11yResult(results)
    }
}

if (window.axeResults) setA11yResult(JSON.parse(decode(window.axeResults)))
</script>

<template>
    <div class="m-auto max-w-7xl">
        <header class="mb-2">
            <div class="flex justify-end">
                <button
                    class="text-lg flex gap-1"
                    @click="showDependencies = !showDependencies"
                >
                    <div class="flex items-center">
                        <IconCode v-if="!showDependencies" />
                        <IconArrowBackUp v-else />
                    </div>
                    {{ showDependencies ? 'Back' : 'Dependencies' }}
                </button>
            </div>
            <h1 class="text-4xl">
                {{ options.heading || 'Accessibility Report' }}
            </h1>
        </header>
        <main>
            <Dependencies v-show="showDependencies" />
            <div v-show="!showDependencies">
                <ResultsOverview v-if="a11yResults" :results="a11yResults" />
                <div v-else>
                    <input
                        title="Upload results"
                        type="file"
                        multiple
                        @change="onUpload($event)"
                    />
                </div>
            </div>
        </main>
    </div>
</template>
