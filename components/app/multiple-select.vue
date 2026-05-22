<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-primary-500 w-4 h-4" :is="props.icon"></component>
            <label :for="id" class="text-sm text-gray-500 font-medium">
                {{ props.label }}
                <span v-show="required" class="text-red-500">*</span>
            </label>
        </div>
        <div v-on-click-outside="closeList" class="relative border rounded bg-white" :class="props.class||''">

            <div class="relative z-0 h-full overflow-x-auto px-1 py-2 scrollbar-none">
                <div class="flex items-center justify-center flex-wrap gap-2 h-full">

                    <div v-for="item,i in model" :key="i" class="relative z-10 bg-gray-200 flex justify-between items-center gap-2 w-fit rounded px-2 py-1 pointer-events-auto">
                        <slot v-if="$slots['chip-item']" name="chip-item" :item="item" />
                        <div>
                            <ClCloseSm class="cursor-pointer" @click.stop="removeItem(i)" />
                        </div>
                    </div>

                    <input v-if="!hideInput" v-model="search" :placeholder="placeholder" class="text-sm pt-2 pb-1 px-2 w-full outline-none bg-white flex-1 min-w-[200px]" @focus="openList()" />
                    <span v-else :class="{'absolute w-full h-full opacity-0': model.length>0,}" @click="openList()" class="flex-1 w-full pl-2 py-0.5 text-sm text-gray-600 cursor-pointer">{{ placeholder }}</span>
                    
                    <app-btn v-show="opened" @click="closeList()" customColor="relative z-10 bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300 !px-0.5 !py-0.5" size="square">
                        <ClCloseMd class="size-3" />
                    </app-btn>
                </div>
            </div>

            <transition name="menu-fade">
                <div v-show="opened" class="absolute z-10 w-full maw-h-[400px] bg-white px-4 py-2 border overflow-auto max-h-[200px]">
                    <div v-for="c,i in searchedItems" :key="i" class="flex gap-2 items-center relative">
                        <input type="checkbox" :id="`c_${id}_${c[title||'title']}`" :value="c[value||'value']" v-model="model">
                        <label :for="`c_${id}_${c[title||'title']}`" class="cursor-pointer select-none">{{ c[title||'title'] }}</label>
                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { ClCloseSm, ClCloseMd } from '@kalimahapps/vue-icons'
import { toRefs, defineProps, defineEmits, defineModel } from 'vue'

interface Props {
    icon?: any
    type?: string
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean

    hideInput?: boolean
    title?: string
    items: any[],
    name?: string,
    value?: string,
    class?: string,
}

const id = useId()
const search = ref('')
const opened = ref(false)

const emits = defineEmits(['changed'])
const model = defineModel<any[], any>({ type: Array, default: [] })
const props = defineProps<Props>()
const { items, title, value } = toRefs(props)

const searchedItems = computed(() => {
    if(!search.value.trim()) return items.value
    return items.value.filter(item => String(item?.[title.value||'title'])
        .toLocaleLowerCase()
        .includes(search.value.toLocaleLowerCase()))
})

const removeItem = (index: number) => {
    model.value = model.value.filter((_, i) => i !== index)
}

const closeList = async () => {
    opened.value = false;
}

const openList = async () => {
    opened.value = true;
};
</script>

<style>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>