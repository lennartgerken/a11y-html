<script setup lang="ts">
import { ResultType } from '@/result'
import { ref, watch } from 'vue'
import MultiSelect from '../MultiSelect.vue'
import type { Search } from './search'

const props = defineProps<{
    url: string
    timestamp: string
    tags: string[]
}>()

const timestampFormated = new Intl.DateTimeFormat('default', {
    dateStyle: 'medium',
    timeStyle: 'short'
}).format(new Date(props.timestamp))

const emit = defineEmits<{
    (e: 'search', value: Search): void
}>()

const search = ref('')
const resultFilter = ref<ResultType | undefined>()
const tagFilter = ref<string[]>([])

watch(
    () => props.tags,
    (tags) => (tagFilter.value = tags),
    { immediate: true }
)

const setTagFilter = (options: string[]) => {
    tagFilter.value = options
    emitSearch()
}

const emitSearch = () => {
    emit('search', {
        searchValue: search.value,
        resultFilterValue: resultFilter.value,
        tagFilterValue: tagFilter.value
    })
}
</script>

<template>
    <nav class="flex gap-1.5 flex-col lg:gap-0">
        <div>
            <div
                data-testid="url"
                :title="url"
                class="text-2xl whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {{ url }}
            </div>
            <div data-testid="timestamp" class="text-base text-dark-gray">
                {{ timestampFormated }}
            </div>
        </div>
        <div class="flex gap-1.5 flex-col md:flex-row lg:justify-end">
            <div class="md:flex md:flex-col md:justify-center">
                <input
                    v-model="search"
                    name="search"
                    placeholder="search"
                    @input="emitSearch()"
                />
            </div>
            <div class="md:flex md:flex-col md:justify-center">
                <select
                    v-model="resultFilter"
                    name="filter"
                    title="filter"
                    @change="emitSearch()"
                >
                    <option :value="undefined">all</option>
                    <option :value="ResultType.PASSED">passes</option>
                    <option :value="ResultType.VIOLATION">violations</option>
                    <option :value="ResultType.INCOMPLETE">incomplete</option>
                    <option :value="ResultType.INAPPLICABLE">
                        inapplicable
                    </option>
                </select>
            </div>
            <div class="md:flex md:flex-col md:justify-center">
                <MultiSelect
                    name="Tags"
                    :options="tags"
                    @filter="(options) => setTagFilter(options)"
                />
            </div>
        </div>
    </nav>
</template>
