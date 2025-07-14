<script setup lang="ts">
import { ResultType } from '@/result'
import { ref } from 'vue'

const props = defineProps<{ url: string, timestamp: string }>()

const emit = defineEmits<{
    (e: 'search', value: { searchValue: string, filterValue: ResultType | undefined }): void,
}>()

const search = ref('')
const filter = ref<ResultType | undefined>()

const emitSearch = () => {

    emit('search', { searchValue: search.value, filterValue: filter.value })

}
</script>

<template>
    <nav class="flex gap-1.5 flex-col md:flex-row">
        <div class="md:flex-1/2 md:w-0">
            <div :title="props.url" class="text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{{ props.url }}
            </div>
            <div class="text-base text-gray-400"> {{ timestamp }}</div>
        </div>
        <div class="flex gap-1.5 flex-col md:flex-row md:flex-1/2 md:w-0 md:justify-end">
            <div class="md:flex md:flex-col md:justify-center">
                <input name="search" v-model="search" placeholder="search" @input="emitSearch()" />
            </div>
            <div class="md:flex md:flex-col md:justify-center">
                <select name="filter" title="filter" v-model="filter" @change="emitSearch()">
                    <option :value="undefined">all</option>
                    <option :value="ResultType.PASSED">passes</option>
                    <option :value="ResultType.VIOLATION">violations</option>
                    <option :value="ResultType.INCOMPLETE">incomplete</option>
                    <option :value="ResultType.INAPPLICABLE">inapplicable</option>
                </select>
            </div>
        </div>
    </nav>
</template>