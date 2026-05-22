<template>
    <div class="w-full px-2">
        <app-data-table
            :count="count"
            :items="items"
            :loading="loading"
            :headers="KPI_PERCENT_TABLE_HEADERS"

            @fetching="getItems">
            <template #table-top>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </template>
            <template #table-item-id="{index}">
                <span class="text-sm">{{ index+1 }}</span>
            </template>
            <template #table-item-doctor="{tableItem}">
                <!-- <nuxt-link class="hover:underline" :to="`/admin/doctor/${tableItem.userId}`"> -->
                <div class="flex items-center gap-2">
                    <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <app-image :src="tableItem.doctor?.avatar" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 class="text-sm font-medium">{{ tableItem.doctor?.firstName }} {{ tableItem.doctor?.lastName }}</h3>
                        <p class="text-xs text-gray-700">{{ tableItem.doctor?.phone }}</p>
                    </div>
                </div>
                <!-- </nuxt-link> -->
            </template>
            <template #table-item-procedure="{tableItem}">
                <span class="text-sm text-balance">{{ tableItem.procedure.title_ru }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</app-btn>
                    <!-- <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn> -->
                </div>
            </template>
        </app-data-table>
    </div>

    <app-dialog rounded :title="itemIndex==null?'Добавление КПИ':'Редактирование КПИ'" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">

            <app-input v-model="$item.percent" label="Процент" :attributes="{required: true, type:'number', min: 0, max: 100, placeholder: 'Процент'}" />
            <app-select required v-model="selectedService" :items="services" name="title" value="id" label="Сервис" placeholder="Сервис" :nullvalue="null" />
            <app-select :disabled="!selectedService" required v-model="$item.procedureId" :items="procedures" name="title_ru" value="id" label="Процедура" placeholder="Процедура" :nullvalue="null" />
            <app-doctor-select required v-model="$item.doctorId" label />
            <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { KpiPercent, Service } from '@/types'
import { KPI_PERCENT_TABLE_HEADERS, ALERT_MESSAGES, } from '@/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { pushAlert } = useAlert()
const { getServices } = useServices()
const { createKPI, getKPIs, updateKPI } = useKPIs()

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<KpiPercent[]>([])
const services = ref<Service[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const selectedService = ref<number|null>(null)
const $item = reactive<Partial<KpiPercent>>({
    percent: 0,
    doctorId: null as any,
    procedureId: null as any,
})

const procedures = computed(() => {
    if(selectedService.value)
        return services.value.find(s => s.id === selectedService.value)?.procedures ?? []
    return []
})

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getKPIs(params)
        count.value = data.meta.total
        items.value = data.data as any
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: KpiPercent, index: number) => {
    selectedService.value = item.procedure?.serviceId
    Object.assign($item, item)
    itemIndex.value = index
    dialog.value = true
}

// const deleteItem = async (id: number, index: number) => {
//     if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

//     try {   
//         await deleteKPI(id)
//         items.value.splice(index, 1)
//         pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
//     } catch (error) {
//         console.log(error)
//     }
// }

const create = async (body: any) => {
    try {
        const data = await createKPI(body)
        console.log(data)
        items.value.push(data as any)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const update = async (index: number, {id, service, ...body}: any) => {
    try {   
        const data = await updateKPI(id, body)
        console.log(data)
        Object.assign(items.value[index], data)
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const save = async () => {
    try {
        createLoading.value = true
    
        const { doctor, procedure, ...body } = $item

        if(itemIndex.value !== null) await update(itemIndex.value, body)
        else await create(body)

        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const init = async () => {
    const data = await getServices({})
    services.value = data as any
}

const close = () => {
    delete $item.id
    Object.assign($item, {
        percent: 0,
        doctorId: null,
        procedureId: null,
    })
    dialog.value = false
    itemIndex.value = null
    selectedService.value = null
}

init()
</script>