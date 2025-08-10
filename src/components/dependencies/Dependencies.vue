<script setup lang="ts">
import Dependency from './Dependency.vue';
</script>

<template>
    <div>
        <div class="text-3xl">Dependencies</div>
        <div class="mt-2">
            <div class="text-2xl">MIT License</div>
            <div class="mt-2 flex flex-col gap-5">
                <Dependency title="a11y-html" copyright="Copyright (c) 2025 Lennart Gerken"
                    repo="https://github.com/lennartgerken/a11y-html" />
                <Dependency title="tailwindcss" copyright="Copyright (c) Tailwind Labs, Inc."
                    repo="https://github.com/tailwindlabs/tailwindcss" />
                <Dependency title="vue" copyright="Copyright (c) 2018-present, Yuxi (Evan) You"
                    repo="https://github.com/vuejs/core" />
            </div>
        </div>
        <div class="mt-5">
            <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
            </p>
            <br />
            <p>
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
            </p>
            <br />
            <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
            </p>

        </div>
    </div>
</template>