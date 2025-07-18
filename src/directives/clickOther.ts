import type { Directive } from "vue";

const directive: Directive = {

    beforeMount(el, binding) {

        el.clickOther = (event: Event) => {

            if (!(el === event.target || el.contains(event.target)))
                binding.value(event)

        }

        requestAnimationFrame(() => document.addEventListener('click', el.clickOther))

    },

    unmounted(el) {

        document.removeEventListener('click', el.clickOther)

    }

}

export default directive