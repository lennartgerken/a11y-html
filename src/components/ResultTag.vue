<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import { computed } from 'vue'
import { TagType } from './tagType'
import { ResultType } from '@/result'

const props = defineProps<{
    resultType: ResultType
}>()

const tagType = computed(() => {
    switch (props.resultType) {
        case ResultType.PASSED:
            return TagType.SUCCESS
        case ResultType.VIOLATION:
            return TagType.ERROR
        case ResultType.INCOMPLETE:
            return TagType.WARN
        default:
            return TagType.INACTIVE
    }
})
</script>

<template>
    <Tag :tag-type="tagType" :text="props.resultType" />
</template>
