<script setup lang="ts">
import Timestamp from '@/components/resultsOverview/Timestamp.vue'
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
        <div :title="url" class="flex gap-1 text-2xl">
            <div class="flex flex-col justify-center">
                <IconInfoCircle v-if="infoAndSwitch" />
                <IconLink v-else />
            </div>
            <div
                :data-testid="infoAndSwitch ? 'info' : 'url'"
                class="whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {{ infoAndSwitch ? info : url }}
            </div>
        </div>
        <div
            v-if="info"
            :data-testid="infoAndSwitch ? 'url' : 'info'"
            class="flex gap-1 text-lg text-dark-gray"
        >
            <div class="flex items-center">
                <IconLink v-if="infoAndSwitch" /> <IconInfoCircle v-else />
            </div>
            <div>{{ infoAndSwitch ? url : info }}</div>
        </div>
        <timestamp data-testid="timestamp" :timestamp="timestamp" />
    </div>
</template>
