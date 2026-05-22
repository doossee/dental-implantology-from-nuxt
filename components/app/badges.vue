<template>
    <div class="flex flex-wrap gap-1">
        <span v-for="cond,i in items" :key="i" class="text-xs px-2 py-1 rounded bg-primary-500 text-white">
            {{ data[cond as keyof typeof data] }}
        </span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    items: any[],
    data: any
}>()
</script>