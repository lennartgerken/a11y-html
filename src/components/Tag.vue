<script setup lang="ts">
import type { TagType } from './tagType'
import { IconCircleFilled } from '@tabler/icons-vue'

defineProps<{
    text: string
    tagType: TagType
    tooltip?: string
}>()
</script>

<template>
    <span
        :data-testid="'tag-' + tagType"
        class="flex gap-0.5 h-fit w-fit p-1 text-xs"
        :title="tooltip"
    >
        <div class="flex items-center">
            <div :class="[tagType]"><IconCircleFilled /></div>
        </div>
        <div>{{ text }}</div>
    </span>
</template>

<style scoped>
.error {
    color: var(--color-red);
}

.success {
    color: var(--color-green);
}

.warn {
    color: var(--color-orange);
}

.info {
    color: var(--color-blue);
}

.inactive {
    color: var(--color-gray);
}
</style>
