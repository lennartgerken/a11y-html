<script setup lang="ts">
import Timestamp from '@/components/resultsOverview/Timestamp.vue'
defineProps<{
    url: string
    info?: string
    timestamp: string
}>()
</script>

<template>
    <div data-testid="info-bar">
        <div
            data-testid="url"
            :title="url"
            class="text-2xl whitespace-nowrap overflow-hidden text-ellipsis"
        >
            {{ url }}
        </div>
        <div v-if="info" data-testid="info" class="text-lg text-dark-gray">
            {{ info }}
        </div>
        <timestamp data-testid="timestamp" :timestamp="timestamp" />
    </div>
</template>
