<template>
    <div class="w-full p-2">
        <input type="file" hidden id="appointment-excel-input" @change="handleFileUpload">
        <div class="p-2 rounded border grid grid-cols-2 md:grid-cols-4 gap-2 bg-white">
            <app-input v-model="filterdate" @update:model-value="setDays" :attributes="{type: 'date'}" />
            <div class="hidden md:block"></div>
            <div class="hidden md:block"></div>
            <div class="flex items-center gap-2">
                <app-btn @click="clickFileInput('appointment-excel-input')" size="small" customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300">
                    <UiFileExcel class="size-4" />
                </app-btn>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </div>
        </div>

        <div class="border w-full rounded mt-2 overflow-hidden">

            <div class="relative overflow-x-auto flex bg-white">
                <div class="w-[100px] border-r">
                    <div class="h-[30px] flex items-center justify-center text-sm border-b bg-gray-50">Ч/Д</div>
                    <div v-for="hour in WORKING_HOURS" :key="hour" :class="{'text-gray-500':hour==='Обед'}" class="h-[30px] flex items-center justify-center text-sm border-b">{{ hour }}</div>
                </div>

                <div class="flex-1 overflow-auto scrollbar-hide">
                    <div class="min-w-[400px]">

                        <div class="grid grid-cols-2 w-full">
                            <div v-for="item,i in _items" :key="i" class="relative">
                                <div class="relative h-[30px] z-10 text-sm px-8 gap-1 flex flex-col items-center justify-center bg-gray-50 border-b border-r text-nowrap">
                                    <span>{{ item.day1 }}</span>
                                </div>

                                <div>
                                    <div v-for="hour in WORKING_HOURS" :key="hour" @click="selectItem(i, hour, item.day2)"
                                        :class="{'bg-gray-300 pointer-events-none':hour==='Обед'}"
                                        class="hover:bg-gray-50 active:bg-gray-100 cursor-pointer h-[30px] flex items-center justify-center text-sm border-b border-r" />
                                </div>
                                
                                <div class="top-[30px] absolute left-0 w-full">

                                    <app-appointment-item
                                        v-for="app,j in item.appointments"
                                        :key="j"
                                        :appointment="app"
                                        @select-item="selectItem(i, '', item.day2, app)" />

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        
        <app-dialog v-model="dialog" @close-dialog="close" title="Подробности приема" rounded>
            <form @submit.prevent="save" class="bg-white w-full grid gap-4 mt-4">
                <div class="relative z-10">
                    <app-auto-complete required v-model="$item.patientId" @inputed="searching"
                        :loading="patientLoading" :items="patients" itemValue="id" label="Пациент"
                        :searchStr="patientName" placeholder="Пациент" :nullvalue="null">
                        <template #item="{item, onSelected}">
                            <div class="flex items-center gap-2" @click="onSelected(`${item.firstName} ${item.lastName}`, item.id, 1)">
                                <div>
                                    <app-image no-modal :src="item?.avatar||''" class="w-[35px] h-[35px] rounded-full object-cover" />
                                </div>
                                <div class="mb-2">
                                    <span class="text-sm">{{item.firstName}}  {{item.lastName}}</span>
                                </div>
                            </div>
                        </template>
                    </app-auto-complete>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <app-input class="col-span-2 md:col-span-1" v-model="dates.date" label="Дата" :attributes="{type: 'date', required: true}" />
                    <app-select required v-model="dates.startTime" label="Время начала" :items="hours" />
                    <app-select required v-model="dates.endTime" label="Время окончания" :items="hours" />
                </div>

                <app-select v-model="$item.serviceId" :items="services" name="title" value="id" label="Сервис" placeholder="Сервис" :nullvalue="null" />
                <app-textarea v-model="$item.description" label="Описания" placeholder="Описания" />
                
                <div class="flex items-center gap-2 justify-end">
                    <app-btn v-if="$item.id" @click="deleteItem($item.id)" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" type="button" size="small">Удалить</app-btn>
                    <app-btn type="submit" :disabled="loading" size="small">Сохранить</app-btn>
                </div>
            </form>
    
        </app-dialog>
    </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import { UiFileExcel } from '@kalimahapps/vue-icons'
import type { Appointment, Patient, Service } from '@/types'
import { WORKING_HOURS, todayDate, getNextThreeDays, ALERT_MESSAGES, clickFileInput, excelToJson } from '@/constants'

const { pushAlert } = useAlert()
const { getPatients } = usePatients()
const { getServices } = useServices()
const { getAppointmentsMine, createAppointmentMine, deleteAppointmentMine, updateAppointmentMine } = useAppointments()

const dialog = ref(false)
const today = todayDate()
const loading = ref(false)
const patientName = ref('')
const days = ref<string[][]>([])
const patientLoading = ref(false)
const filterdate = ref(today)
const patients = ref<Patient[]>([])
const items = ref<Appointment[]>([])
const dates = ref({
    date: today,
    endTime: '',
    startTime: '',
})
const services = ref<Service[]>([])
const itemIndex = ref<number|null>(null)
const $item = ref<Partial<Appointment>>({
    endDate: '',
    startDate: '',
    description: '',
    patientId: null as any,
    serviceId: null as any,
})

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const hours = computed(() => WORKING_HOURS.map(h => ({ name: h, value: h })))

const _items = computed(() => {
    return days.value.slice(0, 2).map((day) => {
        return {
            day1: day[0],
            day2: day[1],
            appointments: items.value.filter(item => {
                const appointmentDate = String(item.startDate).split('T')[0]
                return appointmentDate === day[1]
            })
        }
    })
})

const generatedDates = computed(() => {
    const endDate = dates.value.date + 'T' + dates.value.endTime + ':00.000Z'
    const startDate = dates.value.date + 'T' + dates.value.startTime + ':00.000Z'

    return { endDate, startDate }
})

const searching = debounce(async (e) => {
    if(!e.target.value?.trim()) return

    try {
        patientLoading.value = true
        const { data } = await getPatients({page: 1, perPage: 1000, search: e.target.value})
        patients.value = data as any
    } catch (error) {
        console.log(error)
    } finally {
        patientLoading.value = false
    }
}, 500)

const selectItem = (index: number, hour: string, day: string, app?: Appointment) => {
    dialog.value = true
    
    if(app) {
        itemIndex.value = index
        if(patients.value.findIndex(p => p.id === app.patientId) == -1) {
            patients.value.push({ ...app.patient, id: app.patientId } as any)
        }

        patientName.value = `${app.patient?.firstName} ${app.patient?.lastName}`

        dates.value.date = day
        dates.value.endTime = String(app.endDate!).split('T')[1].slice(0, 5)
        dates.value.startTime = String(app.startDate).split('T')[1].slice(0, 5)

        $item.value = Object.assign({}, {
            id: app.id,
            patientId: app.patientId,
            serviceId: app.serviceId,
            description: app.description,
        })

        return
    }
    
    let newTime
    if(hour == "12:30") newTime = "13:00"
    else if(hour == "20:30") newTime = "21:00"
    
    else {
        const date = new Date();
        const [h, m] = hour.split(':')
    
        date.setHours(parseInt(h, 10));
        date.setMinutes(parseInt(m, 10));
        date.setHours(date.getHours() + 1);
    
        const newHours = String(date.getHours()).padStart(2, '0');
        const newMinutes = String(date.getMinutes()).padStart(2, '0');

        newTime = `${newHours}:${newMinutes}`;
    }
    
    dates.value.date = day
    dates.value.startTime = hour
    dates.value.endTime = newTime

    $item.value = Object.assign({}, {
        description: '',
        patientId: null as any,
        serviceId: null as any,
    })
}

const updateItem = async (index: number, {id, ...body}: any) => {
    try {
        const data: any = await updateAppointmentMine(id, {
            ...body,
            ...generatedDates.value
        })
        const patient = patients.value.find(p => p.id === data.patientId)
        const service = services.value.find(s => s.id === data.serviceId)
    
        Object.assign(items.value[index], {...data, patient, service } as any)
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error);
    }
}

const createItem = async () => {
    try {
        const newItem: any = await createAppointmentMine({
            ...$item.value,
            ...generatedDates.value
        })

        const patient = patients.value.find(p => p.id === newItem.patientId)
        const service = services.value.find(s => s.id === newItem.serviceId)

        items.value.push({...newItem, patient, service } as any)
        close()
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const save = async () => {
    try {
        // if($item.value.serviceId == null) return pushAlert('Нужно выбрать сервис', 'WARNING')
        loading.value = true
        if(itemIndex.value !== null) await updateItem(itemIndex.value , $item.value)
        else await createItem()
        close()
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const deleteItem = async (id: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return
    
    try {
        await deleteAppointmentMine(id)
        dialog.value = false
        itemIndex.value = null
        items.value = items.value.filter(a => a.id !== id)
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getAppointmentsMine({...params, perPage: 1000})
        items.value = (data as any)?.data ?? []
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const setDays = async () => {
    days.value = getNextThreeDays(filterdate.value)
    await getItems({startDate: days.value[0][1], endDate: days.value[3][1]})
}

const handleFileUpload = async (e: any) => {
    const data = await excelToJson(e)
    console.log(data)
}

const init = async () => {
    try {
        const data: any = await getServices({})    
        services.value = data as any
    
        await setDays()
    } catch (error) {
        console.log(error)
    }
}

const close = () => {
    $item.value = {
        endDate: '',
        startDate: '',
        description: '',
        patientId: null as any,
        serviceId: null as any,
    }
    dates.value = {
        date: today,
        endTime: '',
        startTime: '',
    }
    dialog.value = false
    itemIndex.value = null
    patientName.value = ''
}

init()
</script>