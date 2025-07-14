<script setup lang="ts">
import ResultTag from '@/components/ResultTag.vue'
import Tag from '@/components/Tag.vue'
import HTMLElement from '@/components/tests/testItem/testDetails/HTMLElement.vue'
import type { ModResultEntry } from '@/result'
import { TagType } from '@/components/tagType'
import { ResultType } from '@/result'

const props = defineProps<{ test: ModResultEntry }>()
</script>

<template>
    <div>
        <div class="flex flex-col gap-1.5">
            <div class="flex gap-1.5 flex-wrap">
                <Tag v-for="tag in props.test.tags" :tag-type="TagType.INFO" :text="tag" />
            </div>
            <div class="flex gap-1.5">
                <div class="text-3xl">{{ props.test.id }}</div>
                <div class="flex flex-col justify-around">
                    <ResultTag :result-type="props.test.resultType" />
                </div>
            </div>
            <div>{{ props.test.description }}</div>
        </div>
        <div class="flex flex-col gap-4 mt-5">
            <HTMLElement :show-impact="props.test.resultType !== ResultType.PASSED" v-for="node in props.test.nodes"
                :html="node.html" :any="node.any" :all="node.all" :none="node.none" />
        </div>
    </div>
</template>