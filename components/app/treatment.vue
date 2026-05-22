<template>
    <div class="px-4 py-2 border rounded flex items-center flex-row justify-between gap-8" :class="{'bg-gray-100':treatment.isCompleted}">
        <div>
            <h3>{{ treatment?.procedure?.title_ru }}</h3>
            
            <div v-if="editedPrice===null" class="flex gap-2 items-center">
                <app-price :value="treatment?.price" class="font-medium text-gray-700" />
                <app-btn v-if="!treatment.isCompleted" @click="editedPrice=treatment.price" size="square">
                    <HiSolidPencil />
                </app-btn>
            </div>
            <div v-else class="flex gap-2 items-center">
                <app-input v-model="editedPrice" @enter-press="changePrice(editedPrice)" :attributes="{ placeholder: 'Цена', type: 'number' }" />
                <app-btn v-show="editedPrice!==treatment.price" @click="changePrice(editedPrice)"  customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" size="square">
                    <AkCheck />
                </app-btn>
                <app-btn @click="editedPrice=null" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="square">
                    <ClCloseMd />
                </app-btn>
            </div>
        </div>
        <div class="flex items-center gap-2" v-if="!hideActions">
            <app-btn v-show="!treatment.isCompleted" @click="emits('toggle-complete-treatment')" customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" size="square">
                <AkCheck />
            </app-btn>
            <app-btn @click="emits('remove-treatment')" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="square">
                <McDeleteFill />
            </app-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Treatment } from '@/types'
import { AkCheck, McDeleteFill, ClCloseMd, HiSolidPencil } from '@kalimahapps/vue-icons'

const { treatment } = defineProps<{
    treatment: Treatment
    hideActions?: boolean
}>()
const emits = defineEmits(['remove-treatment', 'toggle-complete-treatment', 'price-changed'])

const editedPrice = ref<number|null>(null)

const changePrice = (price: number) => {
    treatment.price = price
    emits('price-changed', price)
    editedPrice.value = null
}
</script>