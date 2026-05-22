<template>
    <div class="p-6 rounded-[18px] grid gap-4 transition-shadow hover:shadow-lg shadow-black/5">
        <img :src="item.icon">
        <h1 class="text-primary-600 text-lg font-medium">{{ item.title.ru }}</h1>
        <p class="text-sm font-light text-[#7D7F8C]">{{ item.description.ru }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    item:{
        icon: string,
        title: {
            uz: string
            en: string
            ru: string
        },
        description: {
            uz: string
            en: string
            ru: string
        }
    }
}>()
</script>