<script setup lang="ts">
import ResultTag from '@/components/ResultTag.vue'
import TestDetails from './testDetails/TestDetails.vue'
import { ref } from 'vue'
import type { ModResultEntry } from '@/result'
import OpenButton from '@/components/OpenButton.vue'

defineProps<{ test: ModResultEntry }>()

const isOpen = ref(false)
</script>

<template>
    <div :data-testid="'test-item-' + test.id" class="mt-5">
        <div class="mb-5">
            <div class="grid grid-cols-[max-content_1fr] gap-2">
                <OpenButton
                    v-model="isOpen"
                    testid="item-open"
                    :title="test.id"
                />
                <div class="flex gap-2">
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
                <div v-if="isOpen" class="col-2 pt-5">
                    <TestDetails :test="test" />
                </div>
            </div>
        </div>
        <div class="line-h"></div>
    </div>
</template>
