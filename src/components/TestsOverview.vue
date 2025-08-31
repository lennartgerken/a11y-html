<script setup lang="ts">
import type { ModResultEntry } from '@/result'
import InfoBar from '@/components/InfoBar.vue'
import Tests from './tests/Tests.vue'

defineProps<{
    tests: ModResultEntry[]
    url: string
    timestamp: string
    info?: string
}>()
</script>

<template>
    <div class="m-auto max-w-7xl">
        <InfoBar :url="url" :info="info" :timestamp="timestamp" />
        <Tests :tests="tests" />
    </div>
</template>
