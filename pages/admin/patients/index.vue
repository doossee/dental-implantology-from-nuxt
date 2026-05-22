<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :loading="loading"
            :headers="headers"
            
            @fetching="getItems">
            <template #table-top>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </template>
            <template #table-item-name="{tableItem}">
                <nuxt-link class="hover:underline text-right md:text-left" :to="`/admin/patients/${tableItem.id}`">
                    <h3 class="text-sm font-medium">{{ tableItem.firstName }} {{ tableItem.lastName }}</h3>
                    <p class="text-xs text-gray-700">{{ tableItem.phone }}</p>
                </nuxt-link>
            </template>
            <template #table-item-only-name="{tableItem}">
                <div class="flex items-center gap-2">
                    <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <app-image :src="tableItem?.avatar" class="w-full h-full object-cover" />
                    </div>
                    <nuxt-link class="hover:underline" :to="`/admin/patients/${tableItem.id}/initial-examinations`">
                        <h3 class="text-sm font-medium">{{ tableItem.firstName }} {{ tableItem.lastName }}</h3>
                    </nuxt-link>
                </div>
            </template>
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <app-image :src="tableItem?.avatar" class="w-full h-full object-cover" />
                </div>
            </template>
            <template #table-item-gender="{tableItem}">
                <span class="text-sm text-balance">{{ {'MALE':"Мужской", "FEMALE": "Женской"}[tableItem.gender as "MALE"] }}</span>
            </template>
            <template #table-item-birthDate="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.birthDate!).toDateString() }}</span>
            </template>
            <template #table-item-createdAt="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
            <template #table-item-lastVisit="{tableItem}">
                <span class="text-sm text-balance">{{ tableItem.lastVisit ? new Date(tableItem.lastVisit!).toLocaleString() : '-' }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <nuxt-link class="hover:underline" :to="`/admin/patients/${tableItem.id}${(user?.userRole === 'ADMIN' || user?.isSuperUser)?'':'/initial-examinations'}`">
                        <app-btn size="small">Посмотреть</app-btn>
                    </nuxt-link>
                    <app-btn v-if="(user?.userRole === 'ADMIN' || user?.isSuperUser)" customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog rounded :title="itemIndex==null?'Добавление пациента':'Редактирование пациента'" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <div class="flex items-center justify-start">
                <label for="file-input" class="cursor-pointer">
                    <div class="w-[120px] h-[120px] border-2 hover:bg-primary-100 border-primary-600 p-1 overflow-hidden rounded-full">
                        <app-image no-modal :src="currentImage" class="w-full rounded-full h-full object-cover" alt="" />
                    </div>
                </label>
            </div>
            <input hidden @change="onFileChange" id="file-input" accept="image/jpg,image/jpeg,image/png,image/bpm;capture=camera" type="file">

            <app-input v-model="$item.firstName" label="Имя" :attributes="{required: true, placeholder: 'Имя', minlength: 1, maxlength: 50}" />
            <app-input v-model="$item.lastName" label="Фамилия" :attributes="{required: true, placeholder: 'Фамилия', minlength: 1, maxlength: 50}" />
            <app-input v-model="$item.middleName" label="Отчество" :attributes="{placeholder: 'Отчество', minlength: 1, maxlength: 50}" />
            <app-input v-mask="'+############'" v-model="$item.phone" label="Телефон" :attributes="{required: true, placeholder: 'Телефон'}" />
            <app-input v-model="$item.birthDate" label="Дата рождения" :attributes="{type: 'date'}" />
            <app-input v-model="$item.address" label="Адрес" :attributes="{placeholder: 'Адрес'}" />
            <app-select v-model="$item.gender" label="Пол" :items="[{name: 'Мужской',value:'MALE'},{name: 'Женский',value:'FEMALE'}]" />
            <app-doctor-select required v-model="$item.doctorId" label />
            
            <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { Patient } from '@/types'
import { PATIENT_TABLE_HEADERS, PATIENT_TABLE_HEADERS_2, ALERT_MESSAGES } from '@/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const user = useUserData()
const { pushAlert } = useAlert()
const { createPatient, getPatients, updatePatient, changePatientAvatar } = usePatients()

const dialog = ref(false)
const loading = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const items = ref<Patient[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const $item = ref<Partial<Patient>>({
    phone: "",
    address: "",
    lastName: "",
    firstName: "",
    middleName: "",
    doctorId: null,
    gender: "MALE",
})

const headers = computed(() => ((user.value?.userRole === 'ADMIN' || user.value?.isSuperUser) || user.value?.isSuperUser) ? PATIENT_TABLE_HEADERS : PATIENT_TABLE_HEADERS_2)
const currentImage = computed(() => {
    if(file.value) return URL.createObjectURL(file.value)
    else if($item.value.avatar) return $item.value.avatar
    return ''
})

const onFileChange = (e: any) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return file.value = null
  return file.value = files[0]
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getPatients(params)
        items.value = data.data as any
        count.value = data.meta.total!
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: Patient, index: number) => {
    $item.value = Object.assign({}, {...item, birthDate: String(item.birthDate).split('T')[0]})
    itemIndex.value = index
    dialog.value = true
}

const create = async (body: any) => {
    try {   
        const data = await createPatient(body)
        $item.value.id = data.id
        items.value.push(data as any)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const update = async (index: number, {id, doctorId, doctor, age, avatar, createdAt, updatedAt, additionalInformation, teeth, lastVisit, ...body}: Partial<Patient>) => {
    try {   
        const data = await updatePatient(id!, body)
        Object.assign(items.value[index], data)
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const changeAvatar = async (id: number) => {
    const formData = new FormData()
    formData.append('avatar', file.value)
    
    try {   
        const data = await changePatientAvatar(id, formData)
        const index = items.value.findIndex(i => i.id === id)
        if(index>-1) items.value[index].avatar = data.avatar
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const save = async () => {
    try {
        createLoading.value = true
        if(itemIndex.value !== null) await update(itemIndex.value, $item.value)        
        else await create($item.value)
        if(file.value) await changeAvatar($item.value.id!)
        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    $item.value = Object.assign({}, {
        phone: "",
        address: "",
        lastName: "",
        firstName: "",
        middleName: "",
        doctorId: null,
        gender: "FEMALE",
    }) as any
    file.value = null
    dialog.value = false
    itemIndex.value = null
}
</script>