<script setup lang="ts">
import type { ModResultEntry } from '@/result'
import InfoBar from './InfoBar.vue'
import Tests from './tests/Tests.vue'
import type { ReportScreenshot } from '@options'

defineProps<{
    tests: ModResultEntry[]
    url: string
    timestamp: string
    info?: string
    screenshot?: ReportScreenshot
}>()
</script>

<template>
    <div data-testid="tests-overview">
        <InfoBar :url="url" :info="info" :timestamp="timestamp" />
        <img
            v-if="screenshot"
            :src="`data:${screenshot.mimeType};base64,${screenshot.data}`"
        />
        <Tests :tests="tests" />
    </div>
</template>
