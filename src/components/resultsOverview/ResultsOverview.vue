<script setup lang="ts">
import NavBar from '@/components/resultsOverview/NavBar.vue'
import ResultItem from '@/components/resultsOverview/ResultItem.vue'
import TestsOverview from '@/components/resultsOverview/testsOverview/TestsOverview.vue'
import Timestamp from '@/components/resultsOverview/Timestamp.vue'
import { ResultType, resultTypeOrder, type A11yResult } from '@/result'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    results: A11yResult[]
}>()

const filteredResults = ref<A11yResult[]>([])
const openResult = ref<A11yResult>()

const search = ref('')
const resultFilter = ref<ResultType | undefined>(undefined)

const filter = () => {
    filteredResults.value = props.results.filter((result: A11yResult) => {
        return (
            (!resultFilter.value || resultFilter.value === result.resultType) &&
            (result.url.toLowerCase().includes(search.value.toLowerCase()) ||
                (result.info &&
                    result.info
                        .toLowerCase()
                        .includes(search.value.toLowerCase())))
        )
    })
    filteredResults.value.sort((a, b) => {
        const resultTypeCompare =
            resultTypeOrder.indexOf(a.resultType) -
            resultTypeOrder.indexOf(b.resultType)

        if (resultTypeCompare === 0) {
            const urlCompare = a.url.localeCompare(b.url)

            if (urlCompare === 0)
                if (a.info && b.info) return a.info.localeCompare(b.info)
            return urlCompare
        }

        return resultTypeCompare
    })
}

watch(
    () => props.results,
    (results) => {
        if (props.results.length === 1) openResult.value = results[0]
        search.value = ''
        resultFilter.value = undefined
        filter()
    },
    { immediate: true }
)

const firstTimestamp = computed(() => {
    return props.results.reduce((min, current) => {
        return new Date(current.timestamp).getTime() <
            new Date(min.timestamp).getTime()
            ? current
            : min
    }).timestamp
})

watch(search, filter)
watch(resultFilter, filter)
</script>

<template>
    <div v-show="!openResult">
        <Timestamp :timestamp="firstTimestamp" />
        <NavBar
            v-model:result-filter="resultFilter"
            v-model:search="search"
            class="mb-5"
        />
        <ResultItem
            v-for="result in filteredResults"
            :key="result.id"
            :result="result"
            @open="(id) => (openResult = props.results[id])"
        />
        <div
            v-if="filteredResults.length === 0"
            class="text-dark-gray text-center"
        >
            No entries found
        </div>
    </div>
    <div v-if="openResult">
        <button v-if="results.length > 1" @click="openResult = undefined">
            Back to Overview
        </button>
        <TestsOverview
            :tests="openResult.tests"
            :url="openResult.url"
            :timestamp="openResult.timestamp"
            :info="openResult.info"
        />
    </div>
</template>
