<script setup lang="ts">
import { RuleType } from '@/result'
import Rules from './Rules.vue'
import type { CheckResult } from 'axe-core'
import { ref } from 'vue'

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
            <div class="flex justify-center items-center font-bold pr-1">
                <button
                    title="open"
                    type="button"
                    :class="[
                        'transition duration-300',
                        { 'rotate-90': isOpen }
                    ]"
                    @click="isOpen = !isOpen"
                >
                    &#11208;
                </button>
            </div>
            <div class="bg-gray-200 p-2 wrap-anywhere mb-1.5 grow">
                <code data-testid="html"
                    ><button title="open" @click="isOpen = !isOpen">
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
