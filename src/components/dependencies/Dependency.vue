<script setup lang="ts">
defineProps<{
    title: string
    copyright?: string
    usage?: string
    repo: string
}>()
</script>

<template>
    <div>
        <div class="text-xl">{{ title }}</div>
        <div v-if="copyright">{{ copyright }}</div>
        <div v-if="usage" class="font-bold">Usage:</div>
        <div v-if="usage">{{ usage }}</div>
        <div class="font-bold">Repository:</div>
        <a :href="repo" target="_blank">{{ repo }}</a>
    </div>
</template>
