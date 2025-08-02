<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef } from 'vue';

const emit = defineEmits<{
    filter: [options: string[]]
}>()


const props = defineProps<{ name: string, options: string[] }>()
const optionValues = reactive(new Map<string, boolean>())
const isOpen = ref(false)
const dropdown = useTemplateRef('dropdown')
const dropdownPosition = ref('left-0')

props.options.sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())).forEach(option => optionValues.set(option, true))

const allActive = () => {

    return !Array.from(optionValues).find(([_key, value]) => value === false)

}

const emitOptions = () => {

    emit('filter', Array.from(optionValues).filter(([_key, value]) => value === true).map(([key, value]) => key))

}

const setOption = (option: string) => {

    optionValues.set(option, !optionValues.get(option))
    emitOptions()

}

const activateAllOptions = () => {

    const setStatus = !allActive()
    Array.from(optionValues.keys()).forEach(key => optionValues.set(key, setStatus))
    emitOptions()

}

const circleColor = computed(() => {

    if (!allActive())
        return "bg-blue"
    else
        return "bg-gray"

})

const updateDropdownPositon = () => {

    requestAnimationFrame(() => {

        if (isOpen.value && dropdown.value) {

            const rect = dropdown.value.getBoundingClientRect()

            if (rect.right > window.innerWidth)
                dropdownPosition.value = 'right-0'
            else if (rect.left < 0)
                dropdownPosition.value = 'left-0'
            else
                dropdownPosition.value = 'left-0'

        }

    })

}

const closeDropdown = () => {

    isOpen.value = false
    dropdownPosition.value = ''

}

const toggleDropdown = () => {

    if (isOpen.value)
        closeDropdown()
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
            <div data-testid="dropdown" ref="dropdown" v-if="isOpen" v-click-other="closeDropdown"
                :class="['whitespace-nowrap p-2 absolute max-h-80 overflow-y-scroll bg-white border border-light-gray', dropdownPosition]">
                <button type="button" @click="activateAllOptions">
                    {{ allActive() ? 'Deselect all' : 'Select all' }}
                </button>
                <label class="flex gap-1" v-for="[key, value] in optionValues">
                    <input :name="key" @change="setOption(key)" :checked="value" type="checkbox" />
                    <div class="flex flex-col justify-center"><span class="w-fit h-fit">{{ key }}</span></div>
                </label>
            </div>
        </div>
    </div>
</template>