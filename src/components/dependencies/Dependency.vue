<script setup lang="ts">
defineProps<{
    title: string
    copyright?: string
    repo: string
}>()
</script>

<template>
    <div>
        <div class="text-xl">{{ title }}</div>
        <div v-if="copyright">{{ copyright }}</div>
        <span>Repository: </span>
        <a :href="repo" target="_blank">{{ repo }}</a>
    </div>
</template>
