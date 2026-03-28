<script setup lang="ts">
import type { UnlabelledFrameSelector } from 'axe-core'
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import Modal from '@/components/Modal.vue'
import { IconWindowMaximize } from '@tabler/icons-vue'

const props = defineProps<{ target: UnlabelledFrameSelector }>()

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
            <pre class="whitespace-pre-wrap break-words overflow-auto">{{
                targetText
            }}</pre>
        </Modal>
    </div>
</template>
