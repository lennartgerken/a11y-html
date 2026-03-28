<script setup lang="ts">
import { RuleType } from '@/result'
import Rules from './Rules.vue'
import type { CheckResult } from 'axe-core'
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import OpenButton from '@/components/OpenButton.vue'
import {
    IconFileTypeHtml,
    IconTargetArrow,
    IconWindowMaximize
} from '@tabler/icons-vue'
import type { UnlabelledFrameSelector } from 'axe-core'
import Modal from '@/components/modal.vue'

const props = defineProps<{
    showImpact: boolean
    html: string
    target: UnlabelledFrameSelector
    any: CheckResult[]
    all: CheckResult[]
    none: CheckResult[]
    defaultOpen: boolean
}>()

const isOpen = ref(props.defaultOpen)

const targetText = computed(() => {
    if (props.target.length === 0) return 'No target'

    const flattenTarget = (value: unknown): string[] => {
        if (typeof value === 'string') return [value]
        if (Array.isArray(value))
            return value.flatMap((item) => flattenTarget(item))
        return []
    }

    return flattenTarget(props.target).join(' / ')
})

const fullTargetOpen = ref(false)
const targetTextRef = useTemplateRef('targetText')
const targetOverflows = ref(false)

const handleResize = () => {
    if (targetTextRef.value) {
        targetOverflows.value =
            targetTextRef.value.scrollWidth > targetTextRef.value.clientWidth
    }
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
})
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<template>
    <div data-testid="html-element">
        <div class="grid grid-cols-[max-content_1fr] gap-2">
            <div class="flex">
                <OpenButton v-model="isOpen" testid="html-open" :title="html" />
                <div class="flex items-center text-2xl">
                    <IconFileTypeHtml />
                </div>
            </div>
            <div class="bg-gray-200 dark:bg-gray-700 p-2 wrap-anywhere grow">
                <code data-testid="html"
                    ><button @click="isOpen = !isOpen">
                        {{ html }}
                    </button></code
                >
            </div>
            <div v-if="isOpen" class="col-2 flex min-w-0 flex-col gap-1.5">
                <div class="flex gap-1">
                    <div class="flex items-center">
                        <IconTargetArrow />
                    </div>
                    <div class="flex min-w-0 items-center gap-1.5">
                        <span
                            ref="targetText"
                            data-testid="target"
                            class="truncate pointer-events-none"
                            >{{ targetText }}</span
                        >

                        <button
                            v-if="targetOverflows"
                            class="whitespace-nowrap flex items-center gap-1"
                            @click="fullTargetOpen = true"
                        >
                            <IconWindowMaximize />
                            <span>Full Target</span>
                        </button>
                        <Modal v-model="fullTargetOpen" title="Full Target">
                            <pre
                                class="whitespace-pre-wrap break-words overflow-auto"
                                >{{ targetText }}</pre
                            >
                        </Modal>
                    </div>
                </div>
                <Rules
                    :show-impact="showImpact"
                    :rules="any"
                    :rule-type="RuleType.ANY"
                />
                <Rules
                    :show-impact="showImpact"
                    :rules="all"
                    :rule-type="RuleType.ALL"
                />
                <Rules
                    :show-impact="showImpact"
                    :rules="none"
                    :rule-type="RuleType.NONE"
                />
            </div>
        </div>
    </div>
</template>
