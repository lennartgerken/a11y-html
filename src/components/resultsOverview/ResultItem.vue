<script setup lang="ts">
import ResultTag from '@/components/ResultTag.vue'
import type { A11yResult } from '@/result'
import { computed } from 'vue'

const props = defineProps<{ result: A11yResult }>()

const emit = defineEmits<{
    open: [id: number]
}>()

const infoAndSwitch = computed(
    () => !!props.result.info && !!props.result.switchInfo
)
</script>

<template>
    <div class="mt-5" data-testid="result-item">
        <div class="mb-5">
            <div class="flex gap-2">
                <div class="flex justify-center items-center">
                    <ResultTag :result-type="result.resultType" />
                </div>
                <div class="line"></div>
                <div class="flex flex-col overflow-hidden">
                    <button
                        :data-testid="infoAndSwitch ? 'info' : 'url'"
                        type="button"
                        class="text-lg whitespace-nowrap overflow-hidden text-ellipsis"
                        @click="emit('open', result.id)"
                    >
                        {{ infoAndSwitch ? result.info : result.url }}
                    </button>
                    <div
                        class="text-sm text-color-gray"
                        :data-testid="infoAndSwitch ? 'url' : 'info'"
                    >
                        {{ infoAndSwitch ? result.url : result.info }}
                    </div>
                </div>
            </div>
        </div>
        <div class="line-h"></div>
    </div>
</template>
