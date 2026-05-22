<template>
    <div class="w-full p-2">
        <!-- <h1 class="text-sm text-gray-600 font-medium mb-2">Услуги</h1> -->
        
        <app-data-table
            hide-bottom
            :items="_services"
            :loading="loading"
            :count="_services.length"
            :headers="SERVICE_TABLE_HEADERS"
            @searched="serviceSearch=$event">
            <template #table-top>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="serviceDialog=true" size="small">Добавить</app-btn>
            </template>
            <template #table-item-id="{index}">
                <span class="text-sm">{{ index+1 }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editServiceItem(tableItem, index)" size="small">Изменить</app-btn>
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteServiceItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>

    <hr class="mt-2 mb-4">

    <div class="w-full px-2">
        <!-- <h1 class="text-sm text-gray-600 font-medium mb-2">Процедуры</h1> -->

        <app-data-table
            :count="count"
            :items="items"
            :loading="loading"
            :headers="PROCEDURE_TABLE_HEADERS"

            @fetching="getItems">
            <template #table-top>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </template>
            <template #table-item-id="{index}">
                <span class="text-sm">{{ index+1 }}</span>
            </template>
            <template #table-item-service="{tableItem}">
                <span class="text-sm text-balance">{{ tableItem.service?.title }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</app-btn>
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>

    <app-dialog rounded :title="serviceItemIndex==null?'Добавление услуга':'Редактирование услуга'" v-model="serviceDialog" @close-dialog="closeService">
        <form @submit.prevent="saveServices" class="mt-4 flex flex-col gap-4">

            <app-input v-model="service.title" label="Название" :attributes="{ required: true, placeholder: 'Название' }" />
            
            <app-textarea v-model="service.description" label="Описание" placeholder="Описание" />
        
            <app-btn :disabled="serviceCreateLoading" type="submit" size="small">{{ serviceCreateLoading?'Загружается':'Сохранить' }}</app-btn>
        </form>
    </app-dialog>

    <app-dialog rounded :title="itemIndex==null?'Добавление Процедуры':'Редактирование Процедуры'" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">

            <app-input v-model="$item.title_en" label="Название (EN)" :attributes="{required: true, placeholder: 'Название (EN)'}" />
            <app-input v-model="$item.title_ru" label="Название (RU)" :attributes="{required: true, placeholder: 'Название (RU)'}" />
            <app-input v-model="$item.title_uz" label="Название (UZ)" :attributes="{placeholder: 'Название (UZ)'}" />
            <app-input v-model="$item.code" label="Код процедуры" :attributes="{placeholder: 'Код процедуры'}" />
            <app-input v-model="$item.price" label="Цена" :attributes="{required: true, type:'number', placeholder: 'Цена'}" />
            <app-select required v-model="$item.serviceId" :items="services" name="title" value="id" label="Сервис" placeholder="Сервис" :nullvalue="null" />
            
        
            <app-textarea required v-model="$item.description_en" label="Описание (EN)" placeholder="Описание (EN)" />
            <app-textarea required v-model="$item.description_ru" label="Описание (RU)" placeholder="Описание (RU)" />
            <app-textarea v-model="$item.description_uz" label="Описание (UZ)" placeholder="Описание (UZ)" />

            <app-switch v-model="$item.isPublic" label="Показать на сайте" />
            <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { Procedure, Service } from '@/types'
import { PROCEDURE_TABLE_HEADERS, ALERT_MESSAGES, SERVICE_TABLE_HEADERS } from '@/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { pushAlert } = useAlert()

const { createService, deleteService, getServices, updateService } = useServices()
const { createProcedure, deleteProcedure, getProcedures, updateProcedure } = useProcedures()

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<Procedure[]>([])
const services = ref<Service[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const $item = reactive<Partial<Procedure>>({
    price: 0,
    code: "",
    title_en: "",
    title_ru: "",
    title_uz: "",
    isPublic: true,
    description_en: "",
    description_ru: "",
    description_uz: "",
    serviceId: null as any,
})
const service = reactive<Partial<Service>>({
    title: "",
    description: "",
})

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getProcedures(params)
        count.value = data.meta.total
        items.value = data.data.map(p => ({
            ...p,
            service: services.value.find(s => s.id === p.serviceId)
        })) as any
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: Procedure, index: number) => {
    Object.assign($item, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {   
        await deleteProcedure(id)
        items.value.splice(index, 1)
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const create = async (body: any) => {
    try {
        const data = await createProcedure(body)
        items.value.push({...data, service: services.value.find(s => s.id === data.serviceId)} as any)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const update = async (index: number, {id, service, ...body}: any) => {
    try {   
        const data = await updateProcedure(id, body)
        Object.assign(items.value[index], {...data, service: services.value.find(s => s.id === data.serviceId)})
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const save = async () => {
    try {
        createLoading.value = true
    
        if(itemIndex.value !== null) await update(itemIndex.value, $item)
        else await create($item)

        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    delete $item.id
    Object.assign($item, {
        price: 0,
        code: "",
        title_en: "",
        title_ru: "",
        title_uz: "",
        description_en: "",
        description_ru: "",
        description_uz: "",
        serviceId: null as any,
    })
    dialog.value = false
    itemIndex.value = null
}



const serviceSearch = ref('')
const serviceDialog = ref(false)
const serviceLoading = ref(false)
const serviceItemIndex = ref<number|null>(null)
const serviceCreateLoading = ref<boolean>(false)

const _services = computed(() => {
    if(!serviceSearch.value.trim()) return services.value
    else return services.value.filter(s =>  
        s.title.toLocaleLowerCase().includes(serviceSearch.value.toLocaleLowerCase()) ||
        s.description?.toLocaleLowerCase()?.includes(serviceSearch.value.toLocaleLowerCase()))
})

const getServiceItems = async (params: any) => {
    try {
        serviceLoading.value = true
        const data = await getServices(params)
        services.value = data as any
    } catch (error) {
        console.log(error)
    } finally {
        serviceLoading.value = false
    }
}

const editServiceItem = (item: Service, index: number) => {
    Object.assign(service, item)
    serviceItemIndex.value = index
    serviceDialog.value = true
}

const deleteServiceItem = async (id: number, index: number) => {
    try {
        if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return
        await deleteService(id)
        services.value.splice(index, 1)
        items.value = items.value.filter(p => p.serviceId !== id)
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const createServices = async (body: any) => {
    try {
        const data = await createService(body)
        services.value.push(data as any)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const updateServices = async (index: number, { id, procedures, ...body }: any) => {
    try {   
        const data = await updateService(id, body)
        Object.assign(services.value[index], data)
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const saveServices = async () => {
    try {
        serviceCreateLoading.value = true
        if(serviceItemIndex.value !== null) await updateServices(serviceItemIndex.value, service)
        else await createServices(service)
        closeService()
    } catch (error) {
        console.log(error)
    } finally {
        serviceCreateLoading.value = false
    }
}

const closeService = () => {
    delete service.id
    Object.assign(service, {
        title: "",
        description: "",
    })
    serviceDialog.value = false
    serviceItemIndex.value = null
}

await getServiceItems({})
</script>