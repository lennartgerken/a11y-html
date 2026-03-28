<script setup lang="ts">
import { RuleType } from '@/result'
import Rules from './Rules.vue'
import type { CheckResult } from 'axe-core'
import { ref } from 'vue'
import OpenButton from '@/components/OpenButton.vue'
import { IconFileTypeHtml, IconTargetArrow } from '@tabler/icons-vue'
import type { UnlabelledFrameSelector } from 'axe-core'
import Target from './Target.vue'

const props = defineProps<{
    showImpact: boolean
    html: string
    target: UnlabelledFrameSelector
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
            <div class="flex">
                <OpenButton v-model="isOpen" testid="html-open" :title="html" />
                <div class="flex items-center text-2xl">
                    <IconFileTypeHtml />
                </div>
            </div>
            <div class="bg-gray-200 dark:bg-gray-700 p-2 wrap-anywhere grow">
                <code data-testid="html"
                    ><button @click="isOpen = !isOpen">
                        {{ html }}
                    </button></code
                >
            </div>
            <div v-if="isOpen" class="col-2 flex min-w-0 flex-col gap-1.5">
                <div class="flex gap-1">
                    <div class="flex items-center">
                        <IconTargetArrow />
                    </div>
                    <Target :target="target" />
                </div>
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
