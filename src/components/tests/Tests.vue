<script setup lang="ts">
import NavBar from '@/components/tests/NavBar.vue'
import TestItem from '@/components/tests/testItem/TestItem.vue'
import type { ModResultEntry, ModResult } from '@/result'
import { ref, watch } from 'vue'
import type { Search } from './search'

const props = defineProps<{ result: ModResult }>()

const filteredTests = ref<ModResultEntry[]>([])
const testToShow = ref<ModResultEntry>()

watch(
    () => props.result,
    (result) => (filteredTests.value = result.tests),
    { immediate: true }
)

const tags: string[] = []
props.result.tests.forEach((entry) =>
    entry.tags.forEach((value) => {
        if (!tags.includes(value)) tags.push(value)
    })
)

const search = ({ searchValue, resultFilterValue, tagFilterValue }: Search) => {
    filteredTests.value = props.result.tests.filter((test: ModResultEntry) => {
        return (
            (!resultFilterValue || resultFilterValue === test.resultType) &&
            test.id.includes(searchValue) &&
            test.tags.some((tag) => tagFilterValue.includes(tag))
        )
    })
}
</script>

<template>
    <div>
        <div v-show="!testToShow">
            <NavBar
                :url="result.url"
                :timestamp="result.timestamp"
                :tags="tags"
                @search="(value: any) => search(value)"
            />
            <div class="flex flex-col gap-3 pt-7">
                <TestItem
                    v-for="test in filteredTests"
                    :key="test.id + test.resultType"
                    :test="test"
                />
                <div
                    v-if="filteredTests.length === 0"
                    class="text-dark-gray text-center"
                >
                    No entries found
                </div>
            </div>
        </div>
    </div>
</template>
