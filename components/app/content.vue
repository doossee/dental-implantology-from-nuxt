<template>
    <div class="flex flex-col gap-4">
        <div v-if="!!subtitle" class="flex items-center justify-center sm:justify-start gap-2">
            <svg-subtitle-tooth />
            <span class="text-primary-600 text-sm md:text-sm font-semibold" v-html="subtitle"></span>
        </div>
        <h1 class="text-2xl md:text-4xl font-medium" v-if="title" v-html="title"></h1>
        <p class="text-gray-700" v-if="description" v-html="description"></p>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title?: string,
    subtitle?: string,
    subtitle_inline?: boolean,
    description?: string,
}>()
</script>