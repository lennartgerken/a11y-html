<script setup lang="ts">
import ResultTag from '@/components/ResultTag.vue'
import TestDetails from './testDetails/TestDetails.vue'
import { ref } from 'vue'
import type { ModResultEntry } from '@/result'

defineProps<{ test: ModResultEntry }>()

const isOpen = ref(false)
</script>

<template>
    <div :data-testid="'test-item-' + test.id">
        <div class="flex gap-2">
            <button
                title="open"
                type="button"
                :class="[
                    'flex justify-center items-center font-bold pr-1 transition duration-300',
                    { 'rotate-90': isOpen }
                ]"
                @click="isOpen = !isOpen"
            >
                &#11208;
            </button>
            <div
                data-testid="item-result"
                class="flex justify-center items-center"
            >
                <ResultTag :result-type="test.resultType" />
            </div>
            <div class="line"></div>
            <div class="flex flex-col">
                <button
                    data-testid="item-header"
                    type="button"
                    class="text-lg"
                    @click="isOpen = !isOpen"
                >
                    {{ test.id }}
                </button>
                <div
                    data-testid="item-description"
                    class="text-sm text-dark-gray"
                >
                    {{ test.description }}
                </div>
            </div>
        </div>
        <div v-if="isOpen" class="pt-5 pl-5">
            <TestDetails :test="test" />
        </div>
    </div>
    <div class="line-h"></div>
</template>
