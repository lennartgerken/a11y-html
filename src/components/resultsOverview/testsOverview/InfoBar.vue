<script setup lang="ts">
import Timestamp from '@/components/resultsOverview/Timestamp.vue'
import SingleLineText from '@/components/singleLine/SingleLineText.vue'
import { IconLink, IconInfoCircle } from '@tabler/icons-vue'
import { computed } from 'vue'
const props = defineProps<{
    url: string
    timestamp: string
    info?: string
    switchInfo?: boolean
}>()

const infoAndSwitch = computed(() => !!props.info && !!props.switchInfo)
</script>

<template>
    <div data-testid="info-bar">
        <div class="flex gap-1 text-2xl">
            <div class="flex flex-col justify-center">
                <IconInfoCircle v-if="infoAndSwitch" />
                <IconLink v-else />
            </div>
            <SingleLineText
                :data-testid="infoAndSwitch ? 'info' : 'url'"
                :text="String(infoAndSwitch ? info : url)"
            />
        </div>
        <div v-if="info" class="flex gap-1 text-lg text-color-gray">
            <div class="flex items-center">
                <IconLink v-if="infoAndSwitch" /> <IconInfoCircle v-else />
            </div>
            <SingleLineText
                :data-testid="infoAndSwitch ? 'url' : 'info'"
                :text="String(infoAndSwitch ? url : info)"
            />
        </div>
        <timestamp data-testid="timestamp" :timestamp="timestamp" />
    </div>
</template>
