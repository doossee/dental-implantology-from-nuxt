<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-primary-500 w-5 h-5" :is="props.icon"></component>
            <label :for="id" class="text-gray-500 text-sm font-medium">
                {{ props.label }}
                <span v-show="required" class="text-red-500">*</span>
            </label>
        </div>
        <div class="border rounded overflow-hidden">
            <textarea :id="id" @input="emits('inputed', $event)" class="w-full outline-none h-full px-4 py-2 resize-none text-sm" :required="!!props.required" :rows="props.rows||4" :placeholder="props.placeholder||''" v-model="model"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
const id = useId()
const emits = defineEmits(['inputed'])
const model = defineModel<any>()
const props = defineProps<{
    icon?: any
    rows?: number
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean
}>()
</script>