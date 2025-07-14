<script setup lang="ts">
import { computed } from 'vue'
import Tag from '@/components/Tag.vue'
import { TagType } from '@/components/tagType'
import { Impact } from '@/result'

const props = defineProps<{ impact: string }>()

const tagType = computed(() => {

    switch (props.impact) {
        case Impact.MINOR:
        case Impact.MODERATE:
            return TagType.WARN
        default:
            return TagType.ERROR
    }

})
</script>

<template>
    <Tag :tag-type="tagType" :text="props.impact" />
</template>