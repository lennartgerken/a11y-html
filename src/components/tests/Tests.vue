<script setup lang="ts">
import NavBar from '@/components/tests/NavBar.vue'
import TestItem from '@/components/tests/testItem/TestItem.vue'
import type { ModResultEntry, ModResult } from '@/result'
import { ref } from 'vue'
import type { Search } from './search';

const props = defineProps<{ result: ModResult }>()

const filteredTests = ref<ModResultEntry[]>(props.result.tests)
const testToShow = ref<ModResultEntry>()

const tags: string[] = []
props.result.tests.forEach(entry => entry.tags.forEach(value => { if (!tags.includes(value)) tags.push(value) }))

const search = ({ searchValue, resultFilterValue, tagFilterValue }: Search) => {

  filteredTests.value = props.result.tests.filter((test: ModResultEntry) => {

    return (
      (!resultFilterValue || resultFilterValue === test.resultType) &&
      test.id.includes(searchValue) &&
      test.tags.some(tag => tagFilterValue.includes(tag))
    )

  })

}
</script>

<template>
  <div>
    <div v-show="!testToShow">
      <NavBar @search="(value: any) => search(value)" :url="result.url" :timestamp="result.timestamp" :tags="tags" />
      <div class="flex flex-col gap-3 pt-7">
        <TestItem v-for="test in filteredTests" :test="test" :key="test.index" />
        <div v-if="filteredTests.length === 0" class="text-dark-gray text-center">No entries found</div>
      </div>
    </div>
  </div>
</template>