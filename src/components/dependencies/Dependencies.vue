<script setup lang="ts">
import Dependency from './Dependency.vue';
</script>

<template>
    <div>
        <div class="text-3xl">Dependencies</div>
        <div class="mt-5 flex flex-col gap-5">
            <Dependency title="a11y-html" copyright="Copyright (c) 2025 Lennart Gerken"
                repo="https://github.com/lennartgerken/a11y-html" license="MIT"
                licenceUrl="https://opensource.org/license/mit" />
            <Dependency title="tailwindcss" copyright="Copyright (c) Tailwind Labs, Inc."
                repo="https://github.com/tailwindlabs/tailwindcss" license="MIT"
                licenceUrl="https://opensource.org/license/mit" />
            <Dependency title="vue" copyright="Copyright (c) 2018-present, Yuxi (Evan) You"
                repo="https://github.com/vuejs/core" license="MIT" licenceUrl="https://opensource.org/license/mit" />
        </div>

    </div>
</template>