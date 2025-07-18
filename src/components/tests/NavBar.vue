<script setup lang="ts">
import { ResultType } from '@/result'
import { ref } from 'vue'
import MultiSelect from '../MultiSelect.vue';
import type { Search } from './search';

const props = defineProps<{
    url: string,
    timestamp: string,
    tags: string[]
}>()

const emit = defineEmits<{
    (e: 'search', value: Search): void,
}>()

const search = ref('')
const resultFilter = ref<ResultType | undefined>()
const tagFilter = ref<string[]>(props.tags)

const setTagFilter = (options: string[]) => {

    tagFilter.value = options
    emitSearch()

}

const emitSearch = () => {

    emit('search', { searchValue: search.value, resultFilterValue: resultFilter.value, tagFilterValue: tagFilter.value })

}
</script>

<template>
    <nav class="flex gap-1.5 flex-col lg:gap-0">
        <div>
            <div :title="props.url" class="text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{{ props.url }}
            </div>
            <div class="text-base text-dark-gray"> {{ timestamp }}</div>
        </div>
        <div class="flex gap-1.5 flex-col md:flex-row lg:justify-end">
            <div class="md:flex md:flex-col md:justify-center">
                <input name="search" v-model="search" placeholder="search" @input="emitSearch()" />
            </div>
            <div class="md:flex md:flex-col md:justify-center">
                <select name="filter" title="filter" v-model="resultFilter" @change="emitSearch()">
                    <option :value="undefined">all</option>
                    <option :value="ResultType.PASSED">passes</option>
                    <option :value="ResultType.VIOLATION">violations</option>
                    <option :value="ResultType.INCOMPLETE">incomplete</option>
                    <option :value="ResultType.INAPPLICABLE">inapplicable</option>
                </select>
            </div>
            <div class="md:flex md:flex-col md:justify-center">
                <MultiSelect @filter="(options) => setTagFilter(options)" name="Tags" :options="tags" />
            </div>
        </div>
    </nav>
</template>