<script setup lang="ts">
import ResultTag from '@/components/ResultTag.vue'
import Tag from '@/components/Tag.vue'
import HTMLElement from '@/components/resultsOverview/testsOverview/tests/testItem/testDetails/HTMLElement.vue'
import type { ModResultEntry } from '@/result'
import { TagType } from '@/components/tagType'
import { ResultType } from '@/result'
import { IconHelp } from '@tabler/icons-vue'
import { sanitizeUrl } from '@braintree/sanitize-url'

defineProps<{ test: ModResultEntry }>()
</script>

<template>
    <div data-testid="details">
        <div class="flex flex-col gap-1.5 mb-5">
            <div data-testid="details-tags" class="flex gap-1.5 flex-wrap">
                <Tag
                    v-for="tag in test.tags"
                    :key="tag"
                    :tag-type="TagType.INFO"
                    :text="tag"
                />
            </div>
            <div class="flex gap-1.5">
                <div data-testid="details-header" class="text-3xl">
                    {{ test.id }}
                </div>
                <div
                    data-testid="details-result"
                    class="flex flex-col justify-around"
                >
                    <ResultTag :result-type="test.resultType" />
                </div>
            </div>
            <div>
                <span data-testid="details-description">{{
                    test.description
                }}</span>
                <br />
                <span data-testid="details-help">{{ test.help }}</span>
            </div>
            <div class="flex gap-1">
                <div class="flex items-center"><IconHelp /></div>
                <a
                    data-testid="details-url"
                    :href="sanitizeUrl(test.helpUrl)"
                    target="_blank"
                    >{{ test.helpUrl }}</a
                >
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <HTMLElement
                v-for="(node, index) in test.nodes"
                :key="node.target.join('')"
                :show-impact="test.resultType !== ResultType.PASSED"
                :html="node.html"
                :any="node.any"
                :all="node.all"
                :none="node.none"
                :default-open="index === 0"
            />
        </div>
    </div>
</template>
