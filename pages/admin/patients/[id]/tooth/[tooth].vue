<template>
    <div class="mb-2 flex justify-between items-start">
        <div>
            <div class="mb-4 flex items-center gap-2">
                <app-btn @click="navigateTo(`/admin/patients/${route.params.id}/initial-examinations`)" size="square">
                    <ClChevronLeft class="size-4" />
                </app-btn>
                <span class="font-medium">Зуб: #{{ route.params.tooth }} </span>
                <span> / {{ patient?.firstName }} {{ patient?.lastName }}</span>
            </div>
            <app-btn :disabled="dialog2" @click="dialog2=true" size="small">Добавить новый осмотр</app-btn>
        </div>
        <app-btn @click="navigateTo(`/admin/patients/${route.params.id}/initial-examinations`)" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="square">
            <ClCloseMd class="size-4" />
        </app-btn>
    </div>

    <div class="flex gap-2 flex-col-reverse items-start lg:flex-row">
        <div class="flex-1 w-full">

            <div class="grid gap-2">
                <app-examination-item-new
                    v-if="dialog2"
                    :procedures="procedures"
                    :tooth="+route.params.tooth"

                    @choose-item="dialog=true"
                    @close="removeNewItemValues"
                    @item-created="handleCreateNewItem"
                    @remove-procedure="handleRemoveProcedure"
                    @toggle-procedure="toggleProcedureComplete" />

                <app-examination-item
                    v-for="examination,i in items"
                    :index="i"
                    :key="examination.id"
                    :is-open="examination.id === expandNumber"
                    :examination="examination"
                    
                    @removed-item="handleRemoveItem(i)"
                    @open-item="expandNumber = expandNumber === examination.id ? -1 : examination.id"
                    @choose-item="chooseItem" />
            </div>

            <p class="text-gray-600 text-sm mt-2 flex justify-center items-center gap-2">
                <span v-if="items.length===0&&!loading">Нет осмотров</span>
                <McLoading2Line class="w-6 h-6 animate-spin" v-show="loading" />
                <span v-show="loading" class="mb-0.5">Загрузка...</span>
            </p>

        </div>

        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 w-full md:w-full lg:w-fit md:min-w-[450px]">
            <app-tooth-x-ray :tooth-id="tooth" />
            <app-tooth-photos :tooth-id="tooth" />
        </div>
    </div>

    <app-dialog v-model="dialog" @close-dialog="removeItemValues" title="Список процедур" rounded max-width="600">
        <app-services-list>
            <template #actions="{procedure}">
                <template v-if="itemIndex!==null">
                    <app-btn @click="pushTreatmentsProcedures(procedure)" size="small" class="relative">
                        Добавить
                        <app-count-badge :count="currentExamination?.treatments?.filter(p => p.procedureId === procedure.id)?.length" />
                    </app-btn>
                </template>
                <template v-else>
                    <app-btn @click="pushNewProcedure(procedure)" size="small" class="relative">
                        Добавить
                        <app-count-badge :count="procedures.filter(p => p.id === procedure.id)?.length" />
                    </app-btn>
                </template>
            </template>
        </app-services-list>

        <div class="flex justify-between items-center gap-4 mt-4 pl-1">
            <app-price :value="totalPrice" class="text-sm text-balance">
                <template #prepend>Общие: </template>
            </app-price>
            <app-btn size="small" @click="removeItemValues">Закрыть</app-btn>
        </div>
    </app-dialog>

    <!-- <app-dialog v-model="dialog1" @close-dialog="removeItemValues" title="Создать платеж" rounded max-width="600">
        <app-payment-form v-if="currentExamination!==null" :examination="currentExamination" @create-payment="handleChangeStatus" />
    </app-dialog> -->
</template>

<script setup lang="ts">
import { ALERT_MESSAGES } from '@/constants'
import type { Examination, Procedure, ExaminationStatus } from '@/types'
import { ClCloseMd, McLoading2Line, ClChevronLeft } from '@kalimahapps/vue-icons'

definePageMeta({
  middleware: ['auth'],
})

const { pushAlert } = useAlert()
const { patient } = usePatients()
const { getExaminations } = useExaminations()

const route = useRoute()
const router = useRouter()

const dialog = ref(false)
const dialog1 = ref(false)
const loading = ref(false)
const items = ref<Examination[]>([])
const itemId = ref<number|null>(null)
const itemIndex = ref<number|null>(null)
const expandNumber = ref<number>(+route.query.examination!||0)
const procedures = ref<(Procedure & { isCompleted?: boolean })[]>([])

const tooth = computed(() => {
    return patient.value?.teeth.find(t => t.num === +route.params.tooth)?.id||null
})

const dialog2 = ref(false || !!route.query.new || tooth.value == null)

const totalPrice = computed(() => {
    return itemIndex.value === null ? procedures.value.reduce((a,b) => a + b.price, 0) : 
    items.value[itemIndex.value]?.treatments?.reduce((a,b) => a + b.price, 0) || 0
})

const currentExamination = computed(() => {
    return itemIndex.value === null ?
        null :
    items.value[itemIndex.value]
})

const chooseItem = (id: number, index: number, type: 'PROCEDURE' | 'PAYMENT') => {
    itemId.value = id
    itemIndex.value = index
    
    if(type === 'PROCEDURE') {
        dialog.value = true
    }else if(type === 'PAYMENT') {
        dialog1.value = true
    }
}

// const handleChangeStatus = (id: number, status: ExaminationStatus) => {
//     const index = items.value.findIndex(e => e.id === id)
//     if(index < 0) return

//     items.value[index].status = status
// }

const handleRemoveItem = (index: number) => {
    items.value.splice(index, 1)
}


const handleCreateNewItem = (examination: Examination) => {
    if(tooth.value === null) patient.value?.teeth?.push({...examination.tooth, id: examination.toothId})
    items.value.push({...examination, payments: []})
    removeNewItemValues()
}

const pushNewProcedure = (procedure: Procedure) => {
    pushAlert(ALERT_MESSAGES.PROCEDURE_ADDED, 'SUCCESS')
    procedures.value.push({...procedure, isCompleted: false})
}

const removeNewItemValues = () => {
    if(!!route.query.new) {
        router.replace({ query: {} })
    }
    dialog2.value = false
    procedures.value = []
}


const pushTreatmentsProcedures = (procedure: Procedure) => {
    if(itemIndex.value === null) return

    items.value[itemIndex.value]?.treatments.push({price: procedure.price, procedureId: procedure.id, isCompleted: false, procedure} as any)
}

const handleRemoveProcedure = (index: number) => {
    procedures.value.splice(index, 1)
}

const toggleProcedureComplete = (procedureId: number) => {
    const index = procedures.value.findIndex(p => p.id === procedureId)!
    if(index > -1)
        procedures.value[index].isCompleted = !procedures.value[index].isCompleted
}


const removeItemValues = () => {
    dialog.value = false
    dialog1.value = false
    
    itemId.value = null
    itemIndex.value = null
}

const init = async () => {
    try {
        loading.value = true
        if(tooth.value === null) return
        const E = await getExaminations({toothId: tooth.value})
        items.value = E.data as any
        if(items.value.length === 0) return dialog2.value = true
        expandNumber.value = items.value[0].id
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

init()
</script>