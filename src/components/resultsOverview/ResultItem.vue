<script setup lang="ts">
import ResultTag from '@/components/ResultTag.vue'
import { computed } from 'vue'
import { ResultType, type A11yResult } from '@/result'

const props = defineProps<{ result: A11yResult }>()

const resultType = computed<ResultType>(() => {
    if (
        props.result.tests.find(
            ({ resultType }) => resultType === ResultType.VIOLATION
        )
    )
        return ResultType.VIOLATION

    if (
        props.result.tests.find(
            ({ resultType }) => resultType === ResultType.INCOMPLETE
        )
    )
        return ResultType.INCOMPLETE

    return ResultType.PASSED
})

const emit = defineEmits<{
    open: [id: number]
}>()
</script>

<template>
    <div>
        <div class="flex gap-2">
            <div class="flex justify-center items-center">
                <ResultTag :result-type="resultType" />
            </div>
            <div class="line"></div>
            <div class="flex flex-col overflow-hidden">
                <button
                    type="button"
                    class="text-lg whitespace-nowrap overflow-hidden text-ellipsis"
                    @click="emit('open', result.id)"
                >
                    {{ result.url }}
                </button>
                <div class="text-sm text-dark-gray">
                    {{ result.info }}
                </div>
            </div>
        </div>
    </div>
    <div class="line-h"></div>
</template>
