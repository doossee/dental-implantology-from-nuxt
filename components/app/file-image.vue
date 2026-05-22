<template>
    <div class="flex items-center gap-4 p-2 rounded bg-gray-50 border">
        <div class="w-[60px] h-[60px] rounded overflow-hidden">
            <img :src="fileSrc" class="w-full h-full object-cover">
        </div>
        <div class="flex-1">
            <h2 class="overflow-hidden line-clamp-1 whitespace-break-spaces overflow-ellipsis">{{ file.name }}</h2>
            <p class="text-sm text-gray-600">{{ size }}</p>
        </div>
        <button type="button" class="mt-0.5" @click="emits('remove-item')">
            <AnFilledCloseCircle class="size-5 text-red-600" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { AnFilledCloseCircle } from '@kalimahapps/vue-icons'

const emits = defineEmits(['remove-item'])
const { file } = defineProps<{file: any}>()

const size = computed(() => {
    var i = file.size == 0 ? 0 : Math.floor(Math.log(file.size) / Math.log(1024));
    return +((file.size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['b', 'kb', 'mb', 'gb', 'tb'][i];
})

const fileSrc = computed(() => {
    return URL.createObjectURL(file)
})
</script>