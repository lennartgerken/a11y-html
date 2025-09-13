<script setup lang="ts">
import Timestamp from '@/components/resultsOverview/Timestamp.vue'
import { IconLink, IconInfoCircle } from '@tabler/icons-vue'
defineProps<{
    url: string
    info?: string
    timestamp: string
}>()
</script>

<template>
    <div data-testid="info-bar">
        <div :title="url" class="flex gap-1 text-2xl">
            <div class="flex flex-col justify-center">
                <IconLink />
            </div>
            <div
                data-testid="url"
                class="whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {{ url }}
            </div>
        </div>
        <div
            v-if="info"
            data-testid="info"
            class="flex gap-1 text-lg text-dark-gray"
        >
            <div class="flex items-center"><IconInfoCircle /></div>
            <div>{{ info }}</div>
        </div>
        <timestamp data-testid="timestamp" :timestamp="timestamp" />
    </div>
</template>
