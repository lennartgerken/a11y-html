<script setup lang="ts">
import TestsOverview from '@/components/TestsOverview.vue'
import type { A11yResult } from '@/result'

defineProps<{
    results: A11yResult[]
}>()
</script>

<template>
    <TestsOverview
        v-if="results.length === 1 && results[0]"
        :tests="results[0].tests"
        :url="results[0].url"
        :timestamp="results[0].timestamp"
        :info="results[0].info"
    />
    <div v-else>
        <div v-for="result in results" :key="result.id">{{ result.url }}</div>
    </div>
</template>
