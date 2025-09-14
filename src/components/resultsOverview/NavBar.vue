<script setup lang="ts">
import { ResultType } from '@/result'
import MultiSelect from '@/components/MultiSelect.vue'

defineProps<{ tags?: string[] }>()

const search = defineModel<string>('search', { required: true })
const resultFilter = defineModel<ResultType | undefined>('result-filter', {
    required: true
})
const selectedTags = defineModel<string[]>('selected-tags')
</script>

<template>
    <nav class="flex gap-1.5 flex-col md:flex-row lg:justify-end">
        <div class="md:flex md:flex-col md:justify-end">
            <input v-model="search" name="search" placeholder="search" />
        </div>
        <div class="md:flex md:flex-col md:justify-end">
            <select v-model="resultFilter" name="filter" title="filter">
                <option :value="undefined">all</option>
                <option :value="ResultType.PASSED">passes</option>
                <option :value="ResultType.VIOLATION">violations</option>
                <option :value="ResultType.INCOMPLETE">incomplete</option>
                <option :value="ResultType.INAPPLICABLE">inapplicable</option>
            </select>
        </div>
        <div
            v-if="tags && selectedTags"
            class="md:flex md:flex-col md:justify-end"
        >
            <MultiSelect v-model="selectedTags" name="Tags" :options="tags" />
        </div>
    </nav>
</template>
