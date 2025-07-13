<script setup lang="ts">
import NavBar from '@/components/tests/NavBar.vue'
import TestItem from '@/components/tests/testItem/TestItem.vue'
import { ResultType } from '@/enums'
import type { ModResultEntry, ModResults } from '@/result';
import { ref } from 'vue'

const props = defineProps<{ result: ModResults }>()

const filteredTests = ref<ModResultEntry[]>(props.result.tests)
const testToShow = ref<ModResultEntry>()

const search = ({ searchValue, filterValue }: { searchValue: string, filterValue: ResultType | undefined }) => {

  filteredTests.value = props.result.tests.filter((test: ModResultEntry) => {

    return (!filterValue || filterValue === test.resultType) && test.id.includes(searchValue)

  })

}

</script>

<template>
  <div>
    <div v-show="!testToShow">
      <NavBar @search="(value: any) => search(value)" :url="result.url" :timestamp="result.timestamp" />
      <div class="flex flex-col gap-3 pt-7">
        <TestItem v-for="test in filteredTests" :test="test" />
      </div>
    </div>
  </div>
</template>