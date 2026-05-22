<template>
    <div class="cursor-pointer hover:bg-gray-50 flex items-center flex-wrap gap-2 border rounded bg-white p-2">
        <div @click.stop v-for="item,i in model" :key="i" class="bg-gray-200 flex justify-between items-center gap-2 w-fit rounded px-2 py-1  pointer-events-auto">
            <span class="text-sm">{{ items.find(i => i[value] === item)[name] }}</span>
            <div>
                <ClCloseSm class="cursor-pointer" @click.stop="handleToggle(item)" />
            </div>
        </div>
    </div>

    <app-dialog :title="dialogTitle" v-model="dialog" rounded>
        <div class="w-full mt-2 grid gap-2">
            <app-input v-model="search" :attributes="{placeholder: 'Поиск'}" />

            <div v-for="item,i in _items" :key="i" class="border rounded p-1 pl-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center gap-2">
                <div>
                    <h2 class="text-sm">{{ item[name] }}</h2>
                </div>

                <app-btn @click="handleToggle(item[value])" class="!py-1.5" size="small">{{model.some(p => p === item[value]) ?'Убрать':'Добавить'}}</app-btn>
            </div>
        </div>
    </app-dialog>
</template>

<script setup lang="ts">
import { ClCloseSm } from '@kalimahapps/vue-icons'

const model = defineModel<string[]>({ default: [] })
const { items, name = 'name', value = 'value' } = defineProps<{
    items: any[],
    name?: string
    value?: string
    dialog: boolean
    dialogTitle?: string
}>()

const search = ref('')
const _items = computed(() => {
    return items.filter(item => String(item[name]).toLowerCase().includes(search.value.toLowerCase()))
})

const handleToggle = (n: string) => {
    const index = model.value.findIndex(i => i === n)
    if(index > -1) {
        model.value.splice(index, 1)
    } else {
        model.value.push(n)
    }
}
</script>