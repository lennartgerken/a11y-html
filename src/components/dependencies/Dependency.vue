<script setup lang="ts">
const props = defineProps<{
    title: string,
    copyright?: string,
    usage?: string,
    repo: string,
    license: string,
    licenceUrl: string
}>()
</script>

<template>
    <div>
        <div class="text-2xl">{{ title }}</div>
        <div v-if="copyright">{{ copyright }}</div>
        <div class="font-bold" v-if="usage">Usage:</div>
        <div v-if="usage">{{ usage }}</div>
        <div class="font-bold">Repository:</div>
        <a :href="repo" target="_blank">{{ repo }}</a>
        <div class="font-bold">License:</div>
        <div>{{ license }} (<a :href="licenceUrl" target="_blank">{{ licenceUrl }}</a>)</div>
    </div>
</template>