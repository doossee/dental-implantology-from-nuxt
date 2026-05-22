<template>
    <button
        class="cursor-pointer inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md disabled:opacity-50 disabled:pointer-events-none border-2 border-transparent text-white"
        @click="$emit('click')"
        aria-label="button"
        :type="type||'button'"
        :disabled="!!disabled"
        :class="[
            classes[size||'large'],
            props.class||'',
            !props?.customColor?'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-300':props?.customColor
        ]">
        <slot />
    </button>
</template>

<script setup lang="ts">
const classes = {
    "small": "py-2 px-3 text-xs",
    "medium": "py-2 px-4",
    "large": "py-3 px-5",
    "square": "p-1"
}

defineEmits(['click'])
const props = defineProps<{
    type?: "button" | "reset" | "submit",
    disabled?: boolean,
    customColor?: string,
    class?: string,
    size?: "small"|"medium"|"large"|"square",
}>()
</script>