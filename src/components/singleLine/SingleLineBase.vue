<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'

const props = defineProps<{ text: string; triggerTooltip: boolean }>()

const overflows = ref(false)
const offsetTop = ref(0)

const mainText = useTemplateRef('mainText')

watch(
    () => props.triggerTooltip,
    () => handleResize()
)

const handleResize = () => {
    if (mainText.value) {
        overflows.value =
            mainText.value.scrollWidth > mainText.value.clientWidth
        offsetTop.value = mainText.value.offsetHeight
    }
}
</script>

<template>
    <div class="relative min-w-0">
        <div class="w-full overflow-hidden">
            <div ref="mainText" class="truncate pointer-events-none">
                {{ text }}
            </div>
        </div>
        <div
            v-if="triggerTooltip && overflows"
            class="absolute left-0 z-10 bg-gray-800 text-white text-sm px-2 py-1 mt-1 max-w-full min-w-[200px] mx-auto overflow-y-auto break-words"
            :style="{ top: offsetTop }"
        >
            {{ text }}
        </div>
    </div>
</template>
