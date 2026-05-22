<template>
    <span :class="props.class||''">
        <slot name="prepend" />
        {{ new Intl.NumberFormat('en-EN').format(props.value) }} сум
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{ value: number, class?: string }>()
</script>