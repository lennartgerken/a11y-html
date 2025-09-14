<script setup lang="ts">
import type { ModResultEntry } from '@/result'
import InfoBar from './InfoBar.vue'
import Tests from './tests/Tests.vue'
import { ALLOWED_MIME_TYPE, type ReportScreenshot } from '@options'
import { ref } from 'vue'
import OpenButton from '@/components/OpenButton.vue'
import { IconPhoto } from '@tabler/icons-vue'

defineProps<{
    tests: ModResultEntry[]
    url: string
    timestamp: string
    info?: string
    screenshot?: ReportScreenshot
}>()

const screenshotIsOpen = ref(false)
</script>

<template>
    <div data-testid="tests-overview">
        <InfoBar :url="url" :info="info" :timestamp="timestamp" />
        <div
            v-if="screenshot && ALLOWED_MIME_TYPE.includes(screenshot.mimeType)"
            class="grid grid-cols-[max-content_1fr] gap-2 pt-2 pb-5"
        >
            <OpenButton
                v-model="screenshotIsOpen"
                title="screenshot"
                testid="open-screenshot"
            />
            <div>
                <button
                    class="flex gap-1"
                    @click="screenshotIsOpen = !screenshotIsOpen"
                >
                    <div class="flex items-center"><IconPhoto /></div>
                    <div>
                        {{ `${screenshotIsOpen ? 'Hide' : 'Show'} screenshot` }}
                    </div>
                </button>
            </div>
            <div v-if="screenshotIsOpen" class="col-2">
                <img
                    class="w-full max-w-3xl border border-light-gray"
                    :src="`data:${screenshot.mimeType};base64,${screenshot.data}`"
                    alt="Screenshot"
                />
            </div>
        </div>
        <Tests :tests="tests" />
    </div>
</template>
