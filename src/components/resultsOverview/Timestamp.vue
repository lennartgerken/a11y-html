<script setup lang="ts">
import { computed } from 'vue'
import { IconClock } from '@tabler/icons-vue'

const props = defineProps<{ timestamp: string }>()

const timestampFormated = computed(() => {
    return new Intl.DateTimeFormat('default', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(props.timestamp))
})
</script>

<template>
    <div class="text-lg text-dark-gray flex gap-1">
        <div class="flex items-center"><IconClock /></div>
        <div>{{ timestampFormated }}</div>
    </div>
</template>
