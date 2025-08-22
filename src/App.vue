<script setup lang="ts">
import { ref } from 'vue'
import Tests from './components/tests/Tests.vue'
import type { AxeResults, Result } from 'axe-core'
import { ResultType, type ModResult } from './result'
import Dependencies from './components/dependencies/Dependencies.vue'
import type { Options } from '@options'

const decode = (base64: string) => {
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
    return new TextDecoder('utf-8').decode(bytes)
}

declare global {
    interface Window {
        axeResults: string
        a11yOptions: string
    }
}

const result = ref<ModResult>()
const options = ref<Options>({})
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

const onUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target && target.files && target.files[0])
        result.value = modifyResult(JSON.parse(await target.files[0].text()))
}

if (window.axeResults)
    result.value = modifyResult(JSON.parse(decode(window.axeResults)))

if (window.a11yOptions) options.value = JSON.parse(decode(window.a11yOptions))
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
