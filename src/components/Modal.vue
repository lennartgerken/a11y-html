<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'

defineProps<{
    title: string
}>()

const isOpen = defineModel<boolean>()
</script>

<template>
    <Teleport v-if="isOpen" to="body">
        <div class="fixed bg-black/50 inset-0 z-20 no-body-scroll">
            <div
                class="fixed inset-5 bg-color p-5 rounded-xl max-w-6xl max-h-80 m-auto flex flex-col"
            >
                <div class="flex justify-between items-center mb-5">
                    <h2 class="text-2xl">{{ title }}</h2>
                    <button
                        class="text-2xl"
                        type="button"
                        @click="isOpen = false"
                    >
                        <IconX />
                    </button>
                </div>
                <div class="flex-1 min-h-0 overflow-auto">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>
