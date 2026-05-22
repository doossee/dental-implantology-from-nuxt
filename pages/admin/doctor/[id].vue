<template>
    <div class="w-full p-2">
        <div class="bg-white p-4 border rounded mb-2">

            <div class="flex items-start flex-col  md:flex-row gap-6">
                <div class="w-[100px] h-[100px] border-2 hover:bg-primary-100 border-primary-600 p-1 overflow-hidden rounded-full">
                    <app-image no-modal :src="doctor?.avatar!"
                        class="w-full rounded-full h-full object-cover" />
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 flex-1 w-full md:mt-1">
                    <h1 class="col-span-2 md:col-span-3 lg:col-span-6 font-medium md:text-lg">
                        {{ doctor?.lastName }} {{ doctor?.firstName }} {{ doctor?.middleName }}
                    </h1>

                    <div>
                        <span class="text-sm font-medium text-gray-700">Телефон</span>
                        <h2 class="font-medium text-sm md:text-base">{{ doctor?.phone }}</h2>
                    </div>
                    <div>
                        <span class="text-sm font-medium text-gray-700">Дата рождения</span>
                        <h2 class="font-medium text-sm md:text-base">{{ new Date(doctor?.birthDate!).toLocaleDateString() }}</h2>
                    </div>
                    <div v-show="doctor?.email">
                        <span class="text-sm font-medium text-gray-700">Email</span>
                        <h2 class="font-medium text-sm md:text-base">{{ doctor?.email || '-' }}</h2>
                    </div>
                    <div v-show="doctor?.address">
                        <span class="text-sm font-medium text-gray-700">Адрес</span>
                        <h2 class="font-medium text-sm md:text-base">{{ doctor?.address || '-' }}</h2>
                    </div>
                    <div v-show="doctor?.experience">
                        <span class="text-sm font-medium text-gray-700">Опыт</span>
                        <h2 class="font-medium text-sm md:text-base">{{ doctor?.experience }} лет</h2>
                    </div>
                    <div v-show="doctor?.specialties.length !== 0">
                        <span class="text-sm font-medium text-gray-700">Специализация</span>
                        <h2 class="font-medium">
                            <span class="text-sm whitespace-nowrap" v-for="s,i in doctor?.specialties||[]" :key="i">
                                {{ SPECIALITIES[s as keyof typeof SPECIALITIES] }},&nbsp;
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <app-data-table :count="count" :items="items" :loading="loading"
            :headers="headers" @fetching="getItems">
            <template #table-top>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </template>
            <template #table-item-procedure="{tableItem}">
                <span class="text-sm text-balance">{{ tableItem.procedure.title_ru }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" size="small" @click="editItem(tableItem, index)">Изменить</app-btn>
                </div>
            </template>
        </app-data-table>

        <app-dialog rounded :title="itemIndex==null?'Добавление КПИ':'Редактирование КПИ'" v-model="dialog" @close-dialog="close">
            <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">

                <app-input v-model="$item.percent" label="Процент" :attributes="{required: true, type:'number', min: 0, max: 100, placeholder: 'Процент'}" />
                <app-select required v-model="selectedService" :items="services" name="title" value="id" label="Сервис" placeholder="Сервис" :nullvalue="null" />
                <app-select :disabled="!selectedService" required v-model="$item.procedureId" :items="procedures" name="title_ru" value="id" label="Процедура" placeholder="Процедура" :nullvalue="null" />
                <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
            </form>
        </app-dialog>
    </div>
</template>

<script setup lang="ts">
import { KPI_PERCENT_TABLE_HEADERS } from '@/constants'
import type { KpiPercent, Service, User } from '@/types'
import { ALERT_MESSAGES, SPECIALITIES } from '@/constants'

definePageMeta({
    layout: 'admin-layout',
    middleware: ['auth', 'role'],
})

const { getUser } = useUsers()
const { pushAlert } = useAlert()
const { getServices } = useServices()
const { createKPI, getKPIs, updateKPI } = useKPIs()

const route = useRoute()
const userId = Number(route.params.id)

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const doctor = ref<User|null>(null)
const items = ref<KpiPercent[]>([])
const services = ref<Service[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const selectedService = ref<number|null>(null)
const $item = reactive<Partial<KpiPercent>>({
    percent: 0,
    doctorId: userId,
    procedureId: null as any,
})

const headers = computed(() => {
    return KPI_PERCENT_TABLE_HEADERS.filter(r => r.value !== 'doctor')
})

const procedures = computed(() => {
    if(selectedService.value)
        return services.value.find(s => s.id === selectedService.value)?.procedures ?? []
    return []
})

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getKPIs({...params, doctorId: userId})
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
    const [S, D]: any = await Promise.all([getServices({}), getUser(userId)])
    services.value = S
    doctor.value = D
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