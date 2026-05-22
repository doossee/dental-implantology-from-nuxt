<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-white border rounded p-2">
        <app-switch v-model="kidTooth" label="Детская карта" />
        <div class="hidden md:block"></div>
        <div class="hidden md:block"></div>
        <div id="i-e-content" class="flex justify-end"></div>
    </div>
    
    <app-tooths @open-tooth="handleOpenTooth" @condition-tooth="handleSelectPlan" v-if="patient?.teeth" :teeth="patient.teeth" :kid="kidTooth" /> 
    
    <app-examinations-table />

    <app-dialog v-model="dialog" @close-dialog="removeItemValues" title="Список процедур" rounded max-width="600">
        <app-services-list>
            <template #actions="{procedure}">
                <div v-if="itemIndex!==null" class="flex items-center gap-2">
                    <app-btn @click="pushTreatmentsProcedures(procedure)" size="small" class="relative">
                        Добавить
                        <app-count-badge :count="currentExamination?.treatments?.filter((p) => p.procedureId === procedure.id)?.length" />
                    </app-btn>
                    <app-btn :disabled="currentExamination?.treatments?.filter((p) => p.procedureId === procedure.id)?.length! == 0" @click="removeTreatment(procedure.id)" class="!px-2 relative" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="small">
                        <ClCloseMd class="size-4" />
                    </app-btn>
                </div>
            </template>
        </app-services-list>

        <div class="flex justify-between items-center gap-4 mt-4 pl-1">
            <app-price :value="totalPrice" class="text-sm text-balance">
                <template #prepend>Общие: </template>
            </app-price>

            <div class="flex items-center gap-2">
                <app-doctor-select class="w-fit" v-if="(user?.userRole === 'ADMIN'||user?.isSuperUser)&&!currentExamination?.examinationId" v-model="doctorId" />
                <app-btn size="small" @click="handlUpdateOrCreate" :disabled="currentExamination?.treatments.length===0">Сохранить</app-btn>
            </div>
        </div>
    </app-dialog>
</template>

<script setup lang="ts">
import { ALERT_MESSAGES } from '@/constants'
import { ClCloseMd } from '@kalimahapps/vue-icons'
import type { Procedure, Examination } from '@/types'

definePageMeta({
  middleware: ['auth'],
})

const user = useUserData()
const { pushAlert } = useAlert()
const { patient } = usePatients()
const { planExaminations, getExaminations, updateExamination, createExamination } = useExaminations()

const route = useRoute()
const dialog = ref(false)
const kidTooth = ref(false)
const filterStatus = ref('')
const procedures = ref<Procedure[]>([])
const doctorId = ref<number|null>(null)
const itemIndex = ref<number|null>(null)
const examinations = ref<Examination[]>([])

const totalPrice = computed(() => {
    return itemIndex.value === null ? procedures.value.reduce((a,b) => a + b.price, 0) : 
    planExaminations.value[itemIndex.value]?.treatments?.reduce((a,b) => a + b.price, 0) || 0
})

const currentExamination = computed(() => {
    return itemIndex.value === null ? null : planExaminations.value[itemIndex.value]
})

const handleOpenTooth = (tooth: number) => {
    navigateTo(`/admin/patients/${route.params.id}/tooth/${tooth}`)
}

const handleSelectPlan = async (id: number, condition?: any[]) => {
    dialog.value = true

    const index1 = planExaminations.value.findIndex(e => e.toothId === id)
    if(index1 > -1) {
        itemIndex.value = index1
        return
    }

    const examination = examinations.value.find(e => e.toothId === id)
    if(examination) {
        planExaminations.value.push({
            toothId: id,
            patientId: +route.params.id,
            examinationId: examination.id,
            treatments: [...examination.treatments],
        })

        itemIndex.value = planExaminations.value.length - 1

        return
    }

    try {   
        const data = await getExaminations({ toothId: id, status: 'PENDING', byCreatedDate: 'desc' })
        if(data.data[0]) planExaminations.value.push({
            toothId: id,
            patientId: +route.params.id,
            examinationId: data.data[0].id,
            treatments: data.data[0].treatments as any
        })

        else planExaminations.value.push({ examinationId: null, toothId: id, treatments: [], condition, patientId: +route.params.id })
        itemIndex.value = planExaminations.value.length - 1
    } catch (error) {
        console.log(error)
    }
}

const pushTreatmentsProcedures = (procedure: Procedure) => {
    if(itemIndex.value === null) return
    pushAlert(ALERT_MESSAGES.PROCEDURE_ADDED, 'SUCCESS')

    planExaminations.value[itemIndex.value]?.treatments
        .push({price: procedure.price, procedureId: procedure.id, isCompleted: false, procedure} as any)
}

const removeTreatment = (id: number) => {
    if(itemIndex.value === null) return
    pushAlert(ALERT_MESSAGES.PROCEDURE_ADDED, 'SUCCESS')

    planExaminations.value[itemIndex.value].treatments = 
    planExaminations.value[itemIndex.value].treatments.filter(t => t.procedureId !== id)
}

const handlUpdateOrCreate = async () => {
    if(!currentExamination.value) return
    
    let data: any
    const { examinationId, toothId, treatments: t, condition } = currentExamination.value
    const treatments = t?.map(({price, procedureId, isCompleted}) => ({ price, procedureId, isCompleted }))
    
    try {   
        if(examinationId) {
            data = await updateExamination(examinationId, { treatments })
            handleUpdateItem(data)
        } else {
            const newExamination: any = { toothId, treatments, toothCondition: condition }
            if(doctorId.value == null && user.value?.userRole === 'ADMIN') return pushAlert('Нужно выберать доктору', 'WARNING')
            else newExamination.doctorId = doctorId.value
    
            data = await createExamination(newExamination)
            currentExamination.value.examinationId = data.id
            handleAddNewItem(data)
        }
        
        currentExamination.value.treatments = [...data.treatments]
    
        removeItemValues()
    } catch (error) {
        console.log(error)
    }
}

const handleAddNewItem = (data: Examination) => {
    if(['', 'PENDING'].includes(filterStatus.value)) examinations.value.unshift(data)
}

const handleUpdateItem = (data: Examination) => {
    const index = examinations.value.findIndex(e => e.id === data.id)
    if(index > -1) Object.assign(examinations.value[index], data)
}

const removeItemValues = () => {
    dialog.value = false
    procedures.value = []
    doctorId.value = null
    itemIndex.value = null
}

provide('examination-items', examinations)
provide('examination-filter', filterStatus)
</script>