<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useTemplateRef,
    watch
} from 'vue'

const props = defineProps<{ name: string; options: string[] }>()
const sortedOptions = ref<string[]>([])
const selectedOptions = defineModel<string[]>({ required: true })

const isOpen = ref(false)
const dropdown = useTemplateRef('dropdown')
const dropdownPosition = ref('left-0')

watch(
    () => props.options,
    (options) => {
        sortedOptions.value = options
        sortedOptions.value.sort((a, b) =>
            a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
        )
    },
    { immediate: true }
)

const allActive = () => {
    return !sortedOptions.value.find(
        (value) => !selectedOptions.value.includes(value)
    )
}

const setOption = (option: string) => {
    if (selectedOptions.value.includes(option))
        selectedOptions.value = selectedOptions.value.filter(
            (current) => current !== option
        )
    else selectedOptions.value = [...selectedOptions.value, option]
}

const activateAllOptions = () => {
    if (allActive()) selectedOptions.value = []
    else selectedOptions.value = sortedOptions.value
}

const circleColor = computed(() => {
    if (!allActive()) return 'bg-blue'
    else return 'bg-gray'
})

const updateDropdownPositon = () => {
    requestAnimationFrame(() => {
        if (isOpen.value && dropdown.value) {
            const rect = dropdown.value.getBoundingClientRect()

            if (rect.right > window.innerWidth)
                dropdownPosition.value = 'right-0'
            else if (rect.left < 0) dropdownPosition.value = 'left-0'
            else dropdownPosition.value = 'left-0'
        }
    })
}

const closeDropdown = () => {
    isOpen.value = false
    dropdownPosition.value = ''
}

const toggleDropdown = () => {
    if (isOpen.value) closeDropdown()
    else {
        isOpen.value = true
        nextTick(() => updateDropdownPositon())
    }
}

const handleResize = () => closeDropdown()

onMounted(() => window.addEventListener('resize', handleResize))
onBeforeUnmount(() => window.removeEventListener('resize', handleResize))
</script>

<template>
    <div data-testid="multi-select" class="w-fit">
        <div class="relative border-b border-light-gray p-1.5 box-border h-10">
            <button data-testid="open" type="button" @click="toggleDropdown">
                <span :class="['cirlce', circleColor]"></span>
                <span class="pl-1 text-base">{{ name }}</span>
            </button>
            <div
                v-if="isOpen"
                ref="dropdown"
                v-click-other="closeDropdown"
                data-testid="dropdown"
                :class="[
                    'whitespace-nowrap p-2 absolute max-h-80 overflow-y-scroll bg-white border border-light-gray',
                    dropdownPosition
                ]"
            >
                <button type="button" @click="activateAllOptions">
                    {{ allActive() ? 'Deselect all' : 'Select all' }}
                </button>
                <label
                    v-for="option in sortedOptions"
                    :key="option"
                    class="flex gap-1"
                >
                    <input
                        :name="option"
                        type="checkbox"
                        :checked="selectedOptions?.includes(option)"
                        @change="setOption(option)"
                    />
                    <div class="flex flex-col justify-center">
                        <span class="w-fit h-fit">{{ option }}</span>
                    </div>
                </label>
            </div>
        </div>
    </div>
</template>
