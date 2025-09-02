<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ timestamp: string }>()

const timestampFormated = computed(() => {
    return new Intl.DateTimeFormat('default', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(props.timestamp))
})
</script>

<template>
    <div data-testid="timestamp" class="text-lg text-dark-gray">
        {{ timestampFormated }}
    </div>
</template>
