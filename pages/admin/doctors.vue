<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :loading="loading"
            :headers="DOCTOR_TABLE_HEADERS"
            
            @fetching="getItems">
            <template #table-top>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </template>
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <app-image :src="tableItem.avatar" class="w-full h-full object-cover" />
                </div>
            </template>
            <template #table-item-name="{tableItem}">
                
                <nuxt-link class="hover:underline text-right md:text-left" :to="`/admin/doctor/${tableItem.id}`">
                    <h3 class="text-sm font-medium">{{ tableItem.firstName }} {{ tableItem.lastName }}</h3>
                    <p class="text-xs text-gray-700">{{ tableItem.phone }}</p>
                </nuxt-link>
            </template>
            <template #table-item-birthDate="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.birthDate!).toDateString() }}</span>
            </template>
            <template #table-item-spec="{tableItem}">
                <app-badges :items="tableItem.specialties" :data="SPECIALITIES" />
            </template>
            <template #table-item-createdAt="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</app-btn>
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog rounded :title="itemIndex==null?'Добавление доктора':'Редактирование доктора'" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">

            <app-input v-model="doctor.firstName" label="Имя" :attributes="{required: true, placeholder: 'Имя'}" />
            <app-input v-model="doctor.lastName" label="Фамилия" :attributes="{required: true, placeholder: 'Фамилия'}" />
            <app-input v-model="doctor.middleName" label="Отчество" :attributes="{placeholder: 'Отчество'}" />
            
            <app-input v-model="doctor.phone" label="Телефон" :attributes="{required: true, placeholder: 'Телефон'}" />
            <app-input v-model="doctor.birthDate" label="Дата рождения" :attributes="{type: 'date', placeholder: 'Дата рождения'}" />
            <app-input v-model="doctor.experience" label="Опыт" :attributes="{type: 'number', placeholder: 'Опыт'}" />
            <app-input v-model="doctor.address" label="Адрес" :attributes="{placeholder: 'Адрес'}" />
            
            <app-multiple-select v-model="doctor.specialties" :items="Object.keys(SPECIALITIES).map(k => ({title: SPECIALITIES[k as keyof typeof SPECIALITIES], value: k}))" label="Специализация" placeholder="Специализация">
                <template #chip-item="{item}">
                    <span class="text-xs whitespace-nowrap">{{ SPECIALITIES[item as keyof typeof SPECIALITIES] }}</span>
                </template>
            </app-multiple-select>
    
            <!-- <app-textarea v-model="doctor.content" label="Контент" placeholder="Контент" /> -->

            <app-switch v-model="doctor.isPublished" label="Публиковать" />
            
            <app-btn :disabled="createLoading" type="submit">
                {{ createLoading?'Загружается':'Сохранить' }}
            </app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { User } from '@/types'
import { SPECIALITIES, DOCTOR_TABLE_HEADERS, ALERT_MESSAGES } from '@/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { pushAlert } = useAlert()
const { createUser, deleteUser, getUsers, updateUser } = useUsers()

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<User[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const doctor = ref<Partial<User>>({
    phone: "",
    address: "",
    content: "",
    lastName: "",
    birthDate: "",
    firstName: "",
    experience: 0,
    middleName: "",
    specialties: [],
    isPublished: false,
})
                           
const getItems = async () => {
    try {
        loading.value = true
        const data = await getUsers({})
        items.value = data as any
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: User, index: number) => {
    doctor.value = Object.assign({}, {...item, birthDate: String(item.birthDate).split('T')[0]})
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {
        await deleteUser(id)
        items.value.splice(index, 1)
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const create = async (body: any) => {
    try {
        const data = await createUser(body)
        items.value.push(data as any)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const update = async (index: number, {id, balance, avatar, updatedAt, createdAt, refreshToken, ...body}: any) => {
    try {
        const obj: any = {}
        Object.keys(body).map(key => {
            if(body[key] !== (items.value[index] as any)[key])
                obj[key] = body[key]
        })
        const data = await updateUser(id, obj)
        Object.assign(items.value[index], data)
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const save = async () => {
    try {
        createLoading.value = true
        if(itemIndex.value !== null) await update(itemIndex.value, doctor.value)
        else await create(doctor.value)
    
        close()
    } catch (error) {
        console.log(error);
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    doctor.value = Object.assign({}, {
        phone: "",
        address: "",
        content: "",
        lastName: "",
        birthDate: "",
        firstName: "",
        experience: 0,
        middleName: "",
        specialties: [],
        isPublished: false,
    })
    dialog.value = false
    itemIndex.value = null
}
</script>