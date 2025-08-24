<script setup lang="ts">
import { computed, ref } from 'vue'
import Tests from './components/tests/Tests.vue'
import type { AxeResults, Result } from 'axe-core'
import { ResultType, type ModResultEntry } from './result'
import Dependencies from './components/dependencies/Dependencies.vue'
import type { Options } from '@options'
import InfoBar from '@/components/InfoBar.vue'

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

const result = ref<AxeResults>()
const showDependencies = ref(false)

const tests = computed<ModResultEntry[] | undefined>(() => {
    const setResultType = (tests: Result[], resultType: ResultType) => {
        return tests.map((test) => ({ ...test, resultType }))
    }

    if (!result.value) return undefined

    return [
        ...setResultType(result.value.violations, ResultType.VIOLATION),
        ...setResultType(result.value.incomplete, ResultType.INCOMPLETE),
        ...setResultType(result.value.passes, ResultType.PASSED),
        ...setResultType(result.value.inapplicable, ResultType.INAPPLICABLE)
    ]
})

const onUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target && target.files && target.files[0])
        result.value = JSON.parse(await target.files[0].text())
}

if (window.axeResults) result.value = JSON.parse(decode(window.axeResults))

const options: Options = window.a11yOptions
    ? JSON.parse(decode(window.a11yOptions))
    : {}
if (options.title) document.title = options.title
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
            <h1 class="text-4xl mb-2">
                {{ options.heading || 'Accessibility Report' }}
            </h1>
            <InfoBar
                v-if="result"
                :url="result.url"
                :info="options.info"
                :timestamp="result.timestamp"
            />
        </header>
        <main class="mt-5">
            <Dependencies v-show="showDependencies" />
            <div v-show="!showDependencies">
                <Tests v-if="tests" :tests="tests" />
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
