<template>
    <div class="bg-white p-4 rounded border">

        <div class="flex justify-between items-start md:items-center gap-2 flex-col md:flex-row text-gray-700 border-b pb-2 text-sm">
            <div class="flex items-center gap-2 justify-between w-full md:w-fit">
                <app-doctor-select class="w-fit" v-if="user?.userRole === 'ADMIN'" v-model="doctorId" />

                <span>Создать новый осмотр</span>
            </div>

            <span class="flex-1 hidden md:block"></span>
            
            <div class="flex gap-2 items-center justify-between w-full md:w-fit">
                <span>{{ new Date().toLocaleString() }}</span>
                <div class="flex gap-2 items-center">
                    <app-price :value="totalPrice" class="text-balance">
                        <template #prepend>Общие: </template>
                    </app-price>
                    <app-btn @click="emits('close')" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="square">
                        <ClCloseMd />
                    </app-btn>
                </div>
            </div>
        </div>

        <div class="mt-4 grid grid-cols-1 lg:grid-cols-[280px_auto] gap-4">

            <div>
                <div class="rounded border mb-2">
                    <app-tooth-image :tooth-num="tooth" :conditions="conditions" />
                </div>

                <app-multiple-select v-model="conditions" hide-input placeholder="Состояние зуба" :items="THERAPY_MAP" value="value">
                    <template #chip-item="{item}">
                        <span class="text-sm whitespace-nowrap">
                            {{ THERAPY_MAP.find(({value}) => item === value)?.title }}
                        </span>
                    </template>
                </app-multiple-select>

            </div>

            <div class="grid gap-2">

                <app-procedure v-for="procedure,i in procedures" :key="i"
                    :procedure="procedure" @remove-procedure="emits('remove-procedure', i)"
                    @toggle-complete-procedure="emits('toggle-procedure', procedure.id)" />

                <div v-show="!procedures.length" class="text-center w-full border rounded p-2 cursor-pointer hover:bg-gray-50"  @click="emits('choose-item', null, 0, 'PROCEDURE')">
                    <span class="text-sm text-gray-600">Нет процедуры</span>
                </div>

                <div class="flex items-center justify-between gap-2">
                    <app-btn size="small" @click="emits('choose-item', null, 0, 'PROCEDURE')">Добавить лечения</app-btn>
                    <app-btn :disabled="isDisabled" @click="handleCreateExamination" size="small">Сохранить</app-btn>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Procedure } from '@/types'
import { ClCloseMd } from '@kalimahapps/vue-icons'
import { THERAPY_MAP, ALERT_MESSAGES } from '@/constants'

const emits = defineEmits(['choose-item', 'item-created', 'remove-procedure', 'toggle-procedure', 'close'])
const { procedures, tooth } = defineProps<{ tooth: number, procedures: (Procedure & { isCompleted?: boolean })[] }>()

const user = useUserData()
const { pushAlert } = useAlert()
const { patient } = usePatients()
const { createExamination } = useExaminations()

const doctorId = ref<number|null>(null)
const conditions = ref<string[]>(patient.value?.teeth.find(t => t.num == tooth)?.condition || [])

const toothId = computed(() => patient.value?.teeth.find(t => t.num == tooth)?.id)
const isDisabled = computed(() => procedures.length === 0)
const totalPrice = computed(() => procedures.reduce((a,b) => a + b.price, 0) || 0)

const handleCreateExamination = async () => {
    if(doctorId.value == null && user.value?.userRole === 'ADMIN') return pushAlert('Нужно выберать доктору', 'WARNING')
    if(!procedures.length) return pushAlert('Нужно добавить пройедуру', 'WARNING')
    const newExamination: any = {
        toothId: toothId.value,
        toothCondition: conditions.value,
        treatments: procedures.map(({price, id, isCompleted}) => ({
            price,
            isCompleted,
            procedureId: id,
        })),
    }
    if(user.value?.userRole === 'ADMIN') newExamination.doctorId = doctorId.value

    try {
        const data = await createExamination(newExamination)
        emits('item-created', data)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch(error) {
        console.log(error)
    }
}
</script>