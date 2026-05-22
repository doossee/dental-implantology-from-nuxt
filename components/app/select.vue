<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-primary-500 w-4 h-4" :is="props.icon"></component>
            <label :for="id" class="text-sm text-gray-500 font-medium">
                {{ props.label }}
                <span v-show="required" class="text-red-500">*</span>
            </label>
        </div>
        <div class="rounded overflow-hidden border" :class="props.class||''">
            <select :id="id" :disabled="!!props.disabled" :required="required" v-model="model" @change="emits('changed', $event)" class="text-sm py-2.5 px-4 w-full outline-none cursor-pointer" :class="selectClass||''">
                <option :value="nullvalue" disabled selected v-if="props.placeholder" class="text-gray-600">{{ props.placeholder }}</option>
                <option v-for="item,i in items" :key="i" :value="item[value||'value']">
                    <slot v-if="$slots['item']" name="item" :item="item" />
                    <span v-else>{{ item[name||'name'] }}</span>
                </option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
interface Props {
    icon?: any
    type?: string
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean,

    items: T & { name?: string | number, value?: any }[],
    name?: string,
    value?: string,
    class?: string,
    selectClass?: string,
    nullvalue?: '' | undefined | null,
}

const id = useId()
const model = defineModel()
const emits = defineEmits(['changed'])
const props = defineProps<Props>()
const { items } = toRefs(props)
</script>