<script setup lang="ts">
import { RuleType } from '@/result'
import Rules from './Rules.vue'
import type { CheckResult } from 'axe-core'
import { ref } from 'vue'
import OpenButton from '@/components/OpenButton.vue'

const props = defineProps<{
    showImpact: boolean
    html: string
    any: CheckResult[]
    all: CheckResult[]
    none: CheckResult[]
    defaultOpen: boolean
}>()

const isOpen = ref(props.defaultOpen)
</script>

<template>
    <div data-testid="html-element">
        <div class="grid grid-cols-[max-content_1fr] gap-2">
            <OpenButton v-model="isOpen" testid="html-open" :title="html" />
            <div class="bg-gray-200 p-2 wrap-anywhere mb-1.5 grow">
                <code data-testid="html"
                    ><button @click="isOpen = !isOpen">
                        {{ html }}
                    </button></code
                >
            </div>
            <div v-if="isOpen" class="col-2 flex flex-col gap-1.5">
                <Rules
                    :show-impact="showImpact"
                    :rules="any"
                    :rule-type="RuleType.ANY"
                />
                <Rules
                    :show-impact="showImpact"
                    :rules="all"
                    :rule-type="RuleType.ALL"
                />
                <Rules
                    :show-impact="showImpact"
                    :rules="none"
                    :rule-type="RuleType.NONE"
                />
            </div>
        </div>
    </div>
</template>
