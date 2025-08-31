<script setup lang="ts">
import NavBar from '@/components/resultsOverview/NavBar.vue'
import TestItem from '@/components/resultsOverview/testsOverview/tests/testItem/TestItem.vue'
import type { ModResultEntry } from '@/result'
import { ref, watch } from 'vue'
import type { Search } from '@/components/resultsOverview/search'

const props = defineProps<{ tests: ModResultEntry[] }>()

const filteredTests = ref<ModResultEntry[]>([])
const testToShow = ref<ModResultEntry>()

watch(
    () => props.tests,
    (tests) => (filteredTests.value = tests),
    { immediate: true }
)

const tags: string[] = []
props.tests.forEach((entry) =>
    entry.tags.forEach((value) => {
        if (!tags.includes(value)) tags.push(value)
    })
)

const search = ({ searchValue, resultFilterValue, tagFilterValue }: Search) => {
    filteredTests.value = props.tests.filter((test: ModResultEntry) => {
        return (
            (!resultFilterValue || resultFilterValue === test.resultType) &&
            test.id.toLowerCase().includes(searchValue.toLocaleLowerCase()) &&
            test.tags.some((tag) => tagFilterValue.includes(tag))
        )
    })
}
</script>

<template>
    <div>
        <div v-show="!testToShow">
            <NavBar
                data-testid="tests-nav"
                class="mb-5"
                :tags="tags"
                @search="(value: any) => search(value)"
            />
            <div class="flex flex-col gap-3">
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
