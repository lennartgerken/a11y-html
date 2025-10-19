<script setup lang="ts">
import { ref } from 'vue'
import SingleLineBase from './SingleLineBase.vue'

defineProps<{ text: string }>()

const triggerTooltip = ref(false)
</script>

<template>
    <button
        class="min-w-0"
        @mouseover="triggerTooltip = true"
        @mouseleave="triggerTooltip = false"
    >
        <SingleLineBase :text="text" :trigger-tooltip="triggerTooltip" />
    </button>
</template>
