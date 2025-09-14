<script setup lang="ts">
import { IconCaretRightFilled } from '@tabler/icons-vue'

defineProps<{ title: string; testid?: string }>()

const isOpen = defineModel<boolean>({ required: true })
</script>

<template>
    <div class="flex justify-center items-center">
        <button
            :data-testid="testid"
            :title="'open ' + title"
            type="button"
            :class="[
                'transition duration-300 text-lg',
                { 'rotate-90': isOpen }
            ]"
            @click="isOpen = !isOpen"
        >
            <IconCaretRightFilled />
        </button>
    </div>
</template>
