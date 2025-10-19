<script setup lang="ts">
import ResultTag from '@/components/ResultTag.vue'
import type { A11yResult } from '@/result'
import { computed } from 'vue'
import SingleLineButton from '../singleLine/SingleLineButton.vue'
import SingleLineText from '../singleLine/SingleLineText.vue'

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
                <div class="flex flex-col min-w-0">
                    <SingleLineButton
                        :text="String(infoAndSwitch ? result.info : result.url)"
                        :data-testid="infoAndSwitch ? 'info' : 'url'"
                        class="text-lg"
                        @click="emit('open', result.id)"
                    />
                    <div
                        v-if="result.info"
                        class="text-sm text-color-gray"
                        :data-testid="infoAndSwitch ? 'url' : 'info'"
                    >
                        <SingleLineText
                            :text="
                                String(infoAndSwitch ? result.url : result.info)
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="line-h"></div>
    </div>
</template>
