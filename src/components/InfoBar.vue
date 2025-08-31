<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    url: string
    info?: string
    timestamp: string
}>()
console.log(props.info)
const timestampFormated = computed(() => {
    return new Intl.DateTimeFormat('default', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(props.timestamp))
})
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
        <div data-testid="timestamp" class="text-lg text-dark-gray">
            {{ timestampFormated }}
        </div>
    </div>
</template>
