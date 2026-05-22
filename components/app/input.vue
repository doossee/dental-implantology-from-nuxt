<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!label || icon">
            <client-only>
                <component class="text-primary-500 w-4 h-4" :is="icon"></component>
                <label :for="id" class="text-gray-500 text-sm font-medium">
                    {{ label }}
                    <span v-show="attributes.required" class="text-red-500">*</span>
                </label>
            </client-only>
        </div>
        <div class="border rounded overflow-hidden flex items-center relative">
            <input aria-label="input" :id="id" @input="emits('inputed', $event)" @change="emits('changed', $event)" @focus="emits('focused', $event)" @keypress.enter="emits('enter-press', $event)" class="w-full outline-none h-full px-4 text-sm" :class="attributes.type === 'date' ? 'py-2' : 'py-2.5'" v-model="model" v-bind="attributes">
            <div class="absolute h-full top-0 right-0 flex justify-center items-center px-2" v-if="$slots['append']">
                <slot name="append" />
            </div>
            <app-btn v-if="clearable" v-show="!!model" @click="handleCleared" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" class="mr-1" size="square">
                <ClCloseMd />
            </app-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import { ClCloseMd } from '@kalimahapps/vue-icons'

const id = useId()
const emits = defineEmits(['inputed', 'changed', 'focused', 'enter-press', 'cleared'])
const model = defineModel()
const { attributes = {}, icon, label } = defineProps<{
    icon?: any
    mask?: string
    label?: string
    clearable?: boolean
    attributes?: InputHTMLAttributes & { 'v-mask'?: string }
}>()

const handleCleared = () => {
    model.value = ''
    emits('cleared')
}
</script>