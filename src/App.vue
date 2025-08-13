<script setup lang="ts">
import { ref, watch } from 'vue'
import Tests from './components/tests/Tests.vue'
import type { AxeResults, Result } from 'axe-core'
import { ResultType, type ModResult } from './result'
import Dependencies from './components/dependencies/Dependencies.vue'

declare global {
    interface Window {
        axeResults: string
    }
}

const result = ref<ModResult>()
const resultFile = ref<File>()
const showDependencies = ref(false)

const modifyResult = (result: AxeResults): ModResult => {
    const setResultType = (tests: Result[], resultType: ResultType) => {
        return tests.map((test) => ({ ...test, resultType }))
    }

    return {
        ...result,
        tests: [
            ...setResultType(result.violations, ResultType.VIOLATION),
            ...setResultType(result.incomplete, ResultType.INCOMPLETE),
            ...setResultType(result.passes, ResultType.PASSED),
            ...setResultType(result.inapplicable, ResultType.INAPPLICABLE)
        ]
    }
}

const onUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target && target.files && target.files.length > 0)
        resultFile.value = target.files[0]
}

watch(resultFile, async () => {
    if (resultFile.value)
        result.value = modifyResult(JSON.parse(await resultFile.value.text()))
})

if (window.axeResults)
    result.value = modifyResult(JSON.parse(atob(window.axeResults)))
</script>

<template>
    <div class="m-auto max-w-7xl">
        <header>
            <div class="flex justify-end">
                <button
                    class="text-lg"
                    @click="showDependencies = !showDependencies"
                >
                    {{ showDependencies ? 'Back' : 'Dependencies' }}
                </button>
            </div>
            <h1 class="text-4xl">Accessibility Report</h1>
        </header>
        <main class="mt-5">
            <Dependencies v-show="showDependencies" />
            <div v-show="!showDependencies">
                <div v-if="result">
                    <Tests :result="result" />
                </div>
                <div v-else>
                    <input
                        title="Upload results"
                        type="file"
                        @change="onUpload($event)"
                    />
                </div>
            </div>
        </main>
    </div>
</template>
