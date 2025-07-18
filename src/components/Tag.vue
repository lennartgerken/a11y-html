<script setup lang="ts">
import type { TagType } from './tagType'

const props = defineProps<{
    text: string,
    tagType: TagType,
    tooltip?: string
}>()
</script>

<template>
    <span class="flex gap-0.5 h-fit w-fit p-1 text-xs" :title="props.tooltip">
        <div>
            <div :class="[props.tagType, 'cirlce']"></div>
        </div>
        <div>{{ props.text }}</div>
    </span>
</template>

<style scoped>
.error {
    background-color: var(--color-red);
}

.success {
    background-color: var(--color-green);
}

.warn {
    background-color: var(--color-orange);
}

.info {
    background-color: var(--color-blue);
}

.inactive {
    background-color: var(--color-gray);
}
</style>