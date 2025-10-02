<script setup lang="ts">
import type { A11yResult } from '@/result'
import InfoBar from './InfoBar.vue'
import Tests from './tests/Tests.vue'
import { ALLOWED_MIME_TYPE } from '@options'
import { ref } from 'vue'
import OpenButton from '@/components/OpenButton.vue'
import { IconPhoto } from '@tabler/icons-vue'

defineProps<{
    result: A11yResult
}>()

const screenshotIsOpen = ref(false)
</script>

<template>
    <div data-testid="tests-overview">
        <InfoBar
            :url="result.url"
            :timestamp="result.timestamp"
            :info="result.info"
            :switch-info="result.switchInfo"
        />
        <div
            v-if="
                result.screenshot &&
                ALLOWED_MIME_TYPE.includes(result.screenshot.mimeType)
            "
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
                    :src="`data:${result.screenshot.mimeType};base64,${result.screenshot.data}`"
                    alt="Screenshot"
                />
            </div>
        </div>
        <Tests :tests="result.tests" />
    </div>
</template>
