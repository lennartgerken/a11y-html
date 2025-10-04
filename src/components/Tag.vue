<script setup lang="ts">
import { computed } from 'vue'
import { TagType } from './tagType'
import { IconCircleFilled } from '@tabler/icons-vue'

const props = defineProps<{
    text: string
    tagType: TagType
    tooltip?: string
}>()

const colorClass = computed(() => {
    switch (props.tagType) {
        case TagType.SUCCESS:
            return 'text-green'
        case TagType.INFO:
            return 'text-color-blue'
        case TagType.WARN:
            return 'text-orange'
        case TagType.ERROR:
            return 'text-red'
        default:
            return 'text-gray'
    }
})
</script>

<template>
    <span
        :data-testid="'tag-' + tagType"
        class="flex gap-0.5 h-fit w-fit p-1 text-xs"
        :title="tooltip"
    >
        <div class="flex items-center">
            <div :class="colorClass"><IconCircleFilled /></div>
        </div>
        <div>{{ text }}</div>
    </span>
</template>
