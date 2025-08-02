<script setup lang="ts">
import type { TagType } from './tagType'

const props = defineProps<{
    text: string,
    tagType: TagType,
    tooltip?: string
}>()
</script>

<template>
    <span :data-testid="'tag-' + tagType" class="flex gap-0.5 h-fit w-fit p-1 text-xs" :title="tooltip">
        <div>
            <div :class="[tagType, 'cirlce']"></div>
        </div>
        <div>{{ text }}</div>
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