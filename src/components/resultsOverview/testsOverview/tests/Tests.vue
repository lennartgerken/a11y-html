<script setup lang="ts">
import NavBar from '@/components/resultsOverview/NavBar.vue'
import TestItem from '@/components/resultsOverview/testsOverview/tests/testItem/TestItem.vue'
import { ResultType, resultTypeOrder, type ModResultEntry } from '@/result'
import { ref, watch } from 'vue'

const props = defineProps<{ tests: ModResultEntry[] }>()

const filteredTests = ref<ModResultEntry[]>([])
const testToShow = ref<ModResultEntry>()

const tags = ref<string[]>([])

const search = ref('')
const resultFilter = ref<ResultType | undefined>(undefined)
const selectedTags = ref<string[]>([])

const filter = () => {
    filteredTests.value = props.tests.filter((test: ModResultEntry) => {
        return (
            (!resultFilter.value || resultFilter.value === test.resultType) &&
            test.id.toLowerCase().includes(search.value.toLocaleLowerCase()) &&
            test.tags.some((tag) => selectedTags.value.includes(tag))
        )
    })
    filteredTests.value.sort((a, b) => {
        const resultTypeCompare =
            resultTypeOrder.indexOf(a.resultType) -
            resultTypeOrder.indexOf(b.resultType)

        if (resultTypeCompare === 0) return a.id.localeCompare(b.id)

        return resultTypeCompare
    })
}

watch(
    () => props.tests,
    (tests) => {
        filteredTests.value = tests
        const tagsToSet: string[] = []
        tests.forEach((entry) =>
            entry.tags.forEach((value) => {
                if (!tagsToSet.includes(value)) tagsToSet.push(value)
            })
        )
        tags.value = tagsToSet

        search.value = ''
        resultFilter.value = undefined
        selectedTags.value = tags.value
        filter()
    },
    { immediate: true }
)

watch(search, filter)
watch(resultFilter, filter)
watch(selectedTags, filter)
</script>

<template>
    <div>
        <div v-show="!testToShow">
            <NavBar
                v-model:search="search"
                v-model:result-filter="resultFilter"
                v-model:selected-tags="selectedTags"
                data-testid="tests-nav"
                class="mb-5"
                :tags="tags"
            />
            <div>
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
