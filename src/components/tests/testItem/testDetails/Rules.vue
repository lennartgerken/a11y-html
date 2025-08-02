<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import { computed } from 'vue'
import ImpactTag from './ImpactTag.vue'
import Tooltip from '@/components/Tag.vue'
import type { CheckResult } from 'axe-core'
import { TagType } from '@/components/tagType'
import { RuleType } from '@/result'

const props = defineProps<{
    showImpact: boolean,
    ruleType: RuleType,
    rules: CheckResult[]
}>()

const ruleTypeTooltip = computed(() => {

    switch (props.ruleType) {
        case RuleType.ANY:
            return "Any of these checks has to pass"
        case RuleType.ALL:
            return "All of these checks have to pass"
        default:
            return "None of these checks should pass"
    }

})
</script>

<template>
    <div :data-testid="'rule-' + rule.id" v-for="rule in props.rules">
        <div class="flex gap-1.5">
            <div data-testid="rule-header" class="text-xl">{{ rule.id }}</div>
            <div data-testid="rule-type">
                <Tag :tag-type="TagType.INFO" :text="props.ruleType" :tooltip="ruleTypeTooltip" />
            </div>
            <div data-testid="rule-impact">
                <ImpactTag v-if="showImpact" :impact="rule.impact" />
                <Tooltip v-if="!showImpact" :tag-type="TagType.INACTIVE" :text="rule.impact" />
            </div>
        </div>
        <div data-testid="rule-description">{{ rule.message }}</div>
    </div>
</template>