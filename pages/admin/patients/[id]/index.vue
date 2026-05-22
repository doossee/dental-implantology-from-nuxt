<template>
  <div class="border bg-white rounded p-4">
    <form @submit.prevent="handleUpdate" class="flex flex-col items-start md:flex-row gap-8">
      <div class="flex-1 w-full">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <app-input v-model="patientData.firstName" label="Имя" :attributes="{required: true, placeholder: 'Имя'}" />
          <app-input v-model="patientData.lastName" label="Фамилия" :attributes="{required: true, placeholder: 'Фамилия'}" />
          <app-input v-model="patientData.middleName" label="Отчество" :attributes="{placeholder: 'Отчество'}" />
          <app-input v-mask="'+############'" v-model="patientData.phone" label="Телефон" :attributes="{required: true, placeholder: 'Телефон'}" />
          <app-input v-mask="'+############'" v-model="patientData.additionalPhone" label="Дополнительный телефон" :attributes="{placeholder: 'Дополнительный телефон'}" />
          <app-select required v-model="patientData.gender" label="Пол" :items="[{name: 'Мужской',value:'MALE'},{name: 'Женский',value:'FEMALE'}]" />
          <app-input v-model="patientData.address" label="Адрес" :attributes="{placeholder: 'Адрес'}" />
          <app-input v-model="patientData.birthDate" label="Дата рождения" :attributes="{type: 'date'}" />
          <app-input v-model="patientData.email" label="Электронная почта" :attributes="{type: 'email', placeholder: 'example@mail.com'}" />
        </div>
  
        <div class="mt-4 flex items-center justify-end gap-4">
          <app-btn type="button" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="handleDelete" size="small">Удалить</app-btn>
          <app-btn :disabled="loading" type="submit" size="small">{{ loading?'Загружается':'Сохранить' }}</app-btn>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { pickNeededPatientFields, ALERT_MESSAGES } from '@/constants'

const { pushAlert } = useAlert()
const { patient, updatePatient, deletePatient } = usePatients()

definePageMeta({
  middleware: ['auth', 'role'],
})

const loading = ref(false)
const patientId = ref(patient.value?.id!)
const patientData = ref(pickNeededPatientFields(patient.value||{}))

const handleDelete = async () => {
  if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

  try {
    await deletePatient(patientId.value)
    navigateTo('/admin/patients')
    pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
  } catch (error) {
    console.log(error)
  }
}

const handleUpdate = async () => {
  try {   
    const data = await updatePatient(patientId.value, patientData.value)
    Object.assign(patient.value||{}, data)
    pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
  } catch (error) {
    console.log(error)
  }
}
</script>