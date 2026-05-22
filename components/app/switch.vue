<template>
    <div class="flex items-center space-x-2">
        <label :for="id" class="switch relative inline-flex items-center cursor-pointer">
            <input :id="id" type="checkbox" v-model="model" :value="value" class="sr-only peer" />
            <span :class="small?'w-7 h-4':'w-11 h-6'" class="bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-primary-600 transition-colors"></span>
            <span :class="small?'w-3 h-3 peer-checked:translate-x-3':'w-5 h-5 peer-checked:translate-x-5'" class="absolute bg-white rounded-full border border-gray-300 left-[2px] top-[2px] transition-transform"></span>
        </label>
        <label :for="id" class="text-sm text-gray-700 cursor-pointer font-medium select-none">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
const id = useId()
const model = defineModel()
const { value = true } = defineProps<{ label?: string, value?: any, small?: boolean }>()
</script>