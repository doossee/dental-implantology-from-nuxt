<template>
    <div class="bg-white rounded border p-4 h-fit">

        <div class="flex text-left items-start md:items-center gap-2 flex-col md:flex-row text-gray-700 text-sm">
            <div class="flex gap-2 items-center">
                <app-btn @click="emits('open-item')" size="square" class="!px-1 !py-1 !text-xl">
                    <AkChevronRightSmall :class="{'rotate-90': isOpen}" />
                </app-btn>
                <span>{{ examination.doctor?.firstName }} {{ examination.doctor?.lastName }},</span>
                <span>{{ EXAMINATION_STATUSES[examination.status] }}</span>
            </div>
            <span class="flex-1 hidden md:block"></span>
            <div class="flex gap-2 items-center justify-between w-full md:w-fit">
                <div class="flex gap-2 items-center">
                    <span>{{ new Date(examination?.createdAt!).toLocaleString() }}</span>
                    <app-price :value="totalPrice" class="text-balance">
                        <template #prepend>Общие: </template>
                    </app-price>
                </div>
                <div class="flex gap-2 items-center">
                    <app-btn :disabled="examination.treatments.length === 0 || allCompleted" @click="handleToggleAll(allCompleted)" customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" size="square">
                        <AkCheck />
                    </app-btn>
                    <app-btn @click="handleDeleteExamination" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="square">
                        <McDeleteFill />
                    </app-btn>
                </div>
            </div>
        </div>

        <template v-if="isOpen">
            <div class="mt-4 grid grid-cols-1 lg:grid-cols-[250px_auto] gap-4">
    
                <div>
                    <div class="mb-2">
                        <app-tooth-image :tooth-num="examination?.tooth?.num!" :conditions="examination?.toothCondition" />
                    </div>
            
                    <app-multiple-select @update:model-value="isEdited=true" hide-input v-model="examination!.toothCondition" placeholder="Состояние зуба..." :items="THERAPY_MAP" value="value">
                        <template #chip-item="{item}">
                            <span class="text-sm whitespace-nowrap">
                                {{ THERAPY_MAP.find(({value}) => item === value)?.title }}
                            </span>
                        </template>
                    </app-multiple-select>

                </div>
                
                <div class="grid gap-2">
                    <app-treatment v-for="treatment,i in examination?.treatments||[]" :key="i"
                        :treatment="treatment"
                        @toggle-complete-treatment="handleToggleTreatment(i)"
                        @remove-treatment="handleRemoveTreatment(i)"
                        @price-changed="changePrice($event, i)" />
        
                    <div v-show="!examination?.treatments?.length" class="text-center p-2 border rounded"
                        :class="examination.status === 'FULLY_PAID'?'pointer-events-none':'pointer-events-auto cursor-pointer hover:bg-gray-50'"
                        @click="emits('choose-item', examination.id, index, 'PROCEDURE')">
                        <span class="text-sm text-gray-600">Нет процедуры</span>
                    </div>
                    
                    <div class="flex gap-2 items-center justify-between flex-wrap mt-4">
                        <app-btn :disabled="examination.status === 'FULLY_PAID'" size="small" @click="emits('choose-item', examination.id, index, 'PROCEDURE')">Добавить лечения</app-btn>
                        <div class="flex items-center gap-2">
                            <app-btn :disabled="!isEdited" @click="handleUpdateExamination" size="small">Сохранить</app-btn>
                            <!-- <app-btn v-if="user?.userRole === 'ADMIN'" :disabled="disablePayment"  size="small" @click="emits('choose-item', examination.id, index, 'PAYMENT')">Оплатить</app-btn> -->
                        </div>
                    </div>

                </div>
                
            </div>
            
        </template>

    </div>
</template>

<script setup lang="ts">
import type { Examination } from '@/types'
import { THERAPY_MAP, ALERT_MESSAGES, EXAMINATION_STATUSES } from '@/constants'
import { AkChevronRightSmall, McDeleteFill, AkCheck } from '@kalimahapps/vue-icons'

const emits = defineEmits(['choose-item', 'open-item', 'removed-item'])
const { examination, isOpen = true } = defineProps<{ examination: Examination, index?: number, isOpen: boolean }>()

const user = useUserData()
const { pushAlert } = useAlert()
const { updateExamination, deleteExamination } = useExaminations()

const isEdited = ref(false)

const totalPrice = computed(() => examination?.treatments?.reduce((a,b) => a + b.price, 0) || 0)
const allCompleted = computed(() => examination?.treatments.length > 0 && examination?.treatments.every(t => t.isCompleted))
// const disablePayment = computed(() => 
//     ((examination?.treatments.every(t => t.isCompleted) && examination.status === 'FULLY_PAID') &&
//     examination.treatments.length > 0) ||
//     examination.status === 'FULLY_PAID' ||
//     examination.treatments.every(t => t.price===0))

const handleToggleTreatment = (index: number) => {
    if(examination?.treatments?.[index]?.isCompleted === undefined) return
        examination!.treatments[index].isCompleted = !examination!.treatments[index].isCompleted
    isEdited.value = true
}

const handleToggleAll = (b: boolean) => {
    if(!confirm('Вы хотите завершить все процедуры?')) return
    examination?.treatments.forEach(t => t.isCompleted = !b)
    isEdited.value = true
}

const handleRemoveTreatment = (index: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return
    examination.treatments?.splice(index, 1)
}

const handleUpdateExamination = async () => {
    try {   
        const { status, sum } = await updateExamination(examination.id, {
            toothCondition: examination?.toothCondition,
            treatments: examination?.treatments?.map(({price, procedureId, isCompleted}) => ({
                price,
                procedureId,
                isCompleted,
            })),
        })
        isEdited.value = false
        examination.status = status as any
        examination.sum = sum
    
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const handleDeleteExamination = async () => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {   
        isEdited.value = true
        await deleteExamination(examination.id)
        emits('removed-item')
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const changePrice = (price: number, index: number) => {
    if(!examination?.treatments?.[index]) return
    examination.treatments[index].price = +price
    examination.treatments[index].procedure!.price = +price
}

watch(totalPrice, () => isEdited.value = true)
</script>