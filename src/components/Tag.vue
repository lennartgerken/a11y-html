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
.cirlce {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    display: inline-block;
}

.error {
    background-color: red;
}

.success {
    background-color: green;
}

.warn {
    background-color: orange;
}

.info {
    background-color: blue;
}

.inactive {
    background-color: gray;
}
</style>