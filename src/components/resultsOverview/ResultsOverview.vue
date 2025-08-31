<script setup lang="ts">
import ResultItem from '@/components/resultsOverview/ResultItem.vue'
import TestsOverview from '@/components/resultsOverview/testsOverview/TestsOverview.vue'
import type { A11yResult } from '@/result'
import { ref, watch } from 'vue'

const props = defineProps<{
    results: A11yResult[]
}>()

const openResult = ref<A11yResult>()

watch(
    () => props.results,
    () => {
        if (props.results.length === 1) openResult.value = props.results[0]
    },
    { immediate: true }
)
</script>

<template>
    <div v-if="!openResult">
        <ResultItem
            v-for="result in results"
            :key="result.id"
            :result="result"
            @open="(id) => (openResult = props.results[id])"
        />
    </div>
    <div v-if="openResult">
        <button @click="openResult = undefined">Overview</button>
        <TestsOverview
            :tests="openResult.tests"
            :url="openResult.url"
            :timestamp="openResult.timestamp"
            :info="openResult.info"
        />
    </div>
</template>
