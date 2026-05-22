<template>
    <div class="px-2 py-1 border rounded flex items-center flex-row justify-between" :class="{'bg-gray-100':procedure.isCompleted}">
        <div>
            <h3><span v-show="procedure.code?.trim()">{{procedure.code}}.</span> {{ procedure.title_ru }}</h3>
            <app-input v-model="procedure.price" :attributes="{placeholder: 'Цена процедуры', type: 'number', min: 0, required: true}" />
        </div>
        <div class="flex items-center gap-2" v-if="!hideActions">
            <app-btn @click="emits('toggle-complete-procedure')" customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" size="square">
                <AkCheck v-show="!procedure.isCompleted" />
                <ClCloseMd v-show="procedure.isCompleted" />
            </app-btn>
            <app-btn @click="emits('remove-procedure')" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="square">
                <McDeleteFill />
            </app-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Procedure } from '~/types'
import { McDeleteFill, AkCheck, ClCloseMd } from '@kalimahapps/vue-icons'

defineProps<{
    procedure: Procedure & { isCompleted?: boolean }
    hideActions?: boolean
}>()
const emits = defineEmits(['remove-procedure', 'toggle-complete-procedure', 'price-changed'])
</script>