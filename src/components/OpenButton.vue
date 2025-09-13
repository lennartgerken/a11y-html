<script setup lang="ts">
defineProps<{ title: string; testid?: string }>()

const isOpen = defineModel<boolean>({ required: true })
</script>

<template>
    <div class="flex justify-center items-center font-bold pr-1">
        <button
            :data-testid="testid"
            :title="'open ' + title"
            type="button"
            :class="['transition duration-300', { 'rotate-90': isOpen }]"
            @click="isOpen = !isOpen"
        >
            &#11208;
        </button>
    </div>
</template>
