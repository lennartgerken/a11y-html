<script setup lang="ts">
import NavBar from '@/components/resultsOverview/NavBar.vue'
import ResultItem from '@/components/resultsOverview/ResultItem.vue'
import type { Search } from '@/components/resultsOverview/search'
import TestsOverview from '@/components/resultsOverview/testsOverview/TestsOverview.vue'
import type { A11yResult } from '@/result'
import { ref, watch } from 'vue'

const props = defineProps<{
    results: A11yResult[]
}>()

const filteredResults = ref<A11yResult[]>([])
const openResult = ref<A11yResult>()

watch(
    () => props.results,
    (results) => (filteredResults.value = results),
    { immediate: true }
)

watch(
    () => props.results,
    () => {
        if (props.results.length === 1) openResult.value = props.results[0]
    },
    { immediate: true }
)

const search = ({ searchValue, resultFilterValue }: Search) => {
    filteredResults.value = props.results.filter((result: A11yResult) => {
        return (
            (!resultFilterValue || resultFilterValue === result.resultType) &&
            (result.url.toLowerCase().includes(searchValue.toLowerCase()) ||
                (result.info &&
                    result.info
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())))
        )
    })
}
</script>

<template>
    <div v-show="!openResult">
        <NavBar class="mb-5" @search="search" />
        <ResultItem
            v-for="result in filteredResults"
            :key="result.id"
            :result="result"
            @open="(id) => (openResult = props.results[id])"
        />
    </div>
    <div v-if="openResult">
        <button @click="openResult = undefined">Back to Overview</button>
        <TestsOverview
            :tests="openResult.tests"
            :url="openResult.url"
            :timestamp="openResult.timestamp"
            :info="openResult.info"
        />
    </div>
</template>
