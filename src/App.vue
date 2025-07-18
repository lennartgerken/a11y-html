<script setup lang="ts">
import { ref, watch } from 'vue'
import Tests from './components/tests/Tests.vue'
import type { AxeResults, Result } from 'axe-core'
import { ResultType, type ModResult } from './result'

declare global {
  interface Window { axeResult: AxeResults }
}

const result = ref<ModResult>()
const resultFile = ref<File>()

const modifyResult = (result: AxeResults): ModResult => {

  const setResultType = (tests: Result[], resultType: ResultType) => {

    return tests.map(test => ({ ...test, resultType }))

  }

  return {
    ...result,
    tests: [
      ...setResultType(result.violations, ResultType.VIOLATION),
      ...setResultType(result.incomplete, ResultType.INCOMPLETE),
      ...setResultType(result.passes, ResultType.PASSED),
      ...setResultType(result.inapplicable, ResultType.INAPPLICABLE),

    ].map((test, index) => ({ ...test, index }))
  }

}

const onUpload = (event: Event) => {

  const target = event.target as HTMLInputElement
  if (target && target.files && target.files.length > 0) resultFile.value = target.files[0]

}

watch(resultFile, async () => {

  if (resultFile.value) result.value = modifyResult(JSON.parse(await resultFile.value.text()))

})

if (window.axeResult) result.value = modifyResult(window.axeResult)
</script>

<template>
  <div class="m-auto max-w-7xl">
    <main class="mt-5" v-if="result">
      <Tests :result="result" />
    </main>
    <div class="w-fit m-auto" v-else>
      <input title="Upload results" type="file" @change="onUpload($event)" />
    </div>
  </div>
</template>
