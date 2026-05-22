<template>
    <div class="flex flex-col gap-2">
        <div v-for="item,i in items" :key="i">
            <div class="flex justify-between items-center py-2 px-3 bg-gray-100 rounded" :class="{'rounded-b-none':i===opened}">
                <h1 class="font-medium">{{ i+1 }}. {{ item[itemTitle as keyof typeof item] }}</h1>
                <button @click="openExpand(i)" class="rounded-full p-2 border">
                    <AkChevronUp :class="i===opened?'rotate-0':'rotate-180'" />
                </button>
            </div>
            <div class="border border-t-0 p-2 rounded-b" :class="i===opened?'block':'hidden'">
                <slot :item="item" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AkChevronUp } from "@kalimahapps/vue-icons"

const opened = ref<number>(-1)
const { items, itemTitle = 'title' } = defineProps<{
    itemTitle: string,
    items: {
        title: string,
        content: string
    }[] 
}>()

const openExpand = (i: number) => {
    opened.value = i === opened.value ? -1 : i
}
</script>