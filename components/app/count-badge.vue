<template>
    <span v-show="count>0" class="px-2 py-0.5 rounded-full bg-red-500 text-xs text-white -right-2 -top-2 absolute">
        {{ count }}
    </span>
</template>

<script setup lang="ts">
const { count = 0 } = defineProps<{ count?: number }>()
</script>