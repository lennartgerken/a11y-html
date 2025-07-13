<script setup lang="ts">
import { RuleType } from '@/enums';
import Rules from './Rules.vue';
import type { CheckResult } from 'axe-core';

const props = defineProps<{
    showImpact: boolean,
    html: string,
    any: CheckResult[],
    all: CheckResult[],
    none: CheckResult[]
}>()
</script>

<template>
    <div>
        <div class="bg-gray-200 p-2 wrap-anywhere">
            <code>{{ html }}</code>
        </div>
        <div class="flex flex-col mt-1.5 gap-1.5">
            <Rules :show-impact="props.showImpact" :rules="props.any" :rule-type="RuleType.ANY" />
            <Rules :show-impact="props.showImpact" :rules="props.all" :rule-type="RuleType.ALL" />
            <Rules :show-impact="props.showImpact" :rules="props.none" :rule-type="RuleType.NONE" />
        </div>
    </div>
</template>