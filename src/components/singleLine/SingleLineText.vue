<script setup lang="ts">
import { ref } from 'vue'
import SingleLineBase from './SingleLineBase.vue'

defineProps<{ text: string }>()

const triggerTooltip = ref(false)
</script>

<template>
    <div
        class="min-w-0"
        @mouseover="triggerTooltip = true"
        @mouseleave="triggerTooltip = false"
        @click="triggerTooltip = !triggerTooltip"
    >
        <SingleLineBase :text="text" :trigger-tooltip="triggerTooltip" />
    </div>
</template>
