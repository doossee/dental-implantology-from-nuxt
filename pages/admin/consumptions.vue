<template>
    <div class="w-full p-2">
        <div class="p-2 rounded border flex flex-col lg:flex-row justify-between items-center gap-2 bg-white">

            <div class="flex gap-2 items-center justify-between w-full md:w-fit">
                <app-select :items="dates" model-value="TODAY" placeholder="Выберите период времени" @update:model-value="getItemsByDate" :nullvalue="undefined">
                    <template #item="{item}">
                        {{ item.name.replace('Скачать ', '').replace(/^./, (c: string) => c.toUpperCase()) }}
                    </template>
                </app-select>
                <app-btn @click="dialog1=true" size="small">
                    <AkDownload class="size-5" />
                </app-btn>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-center h-full w-full md:w-fit">
                <app-price class="text-nowrap text-sm rounded border bg-white px-4 py-2 text-blue-700" :value="totalProfits">
                    <template #prepend>Общая прибыль:</template>
                </app-price>
                <app-price class="text-nowrap text-sm rounded border bg-white px-4 py-2 text-red-600" :value="totalConsumptions">
                    <template #prepend>Общая расход:</template>
                </app-price>
                <app-price class="text-nowrap text-sm rounded border bg-white px-4 py-2 text-green-700" :value="totalProfits - totalConsumptions">
                    <template #prepend>Чистая прибыль:</template>
                </app-price>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[auto_400px] gap-2 w-full">

            <div class="grid grid-cols-1 w-full gap-2 h-fit">
                <app-data-table
                    :headers="PROFIT_TABLE_HEADERS"
                    :count="payments.length"
                    :loading="loading"
                    :items="payments"
                    custom-class="h-fit"
                    hide-bottom
                    hide-top>
    
                    <template #table-item-doctor="{tableItem}">
                        <span class="text-sm text-balance">
                            {{ tableItem?.examination?.doctor?.firstName }}
                            {{ tableItem?.examination?.doctor?.lastName }}
                        </span>
                    </template>
                    <template #table-item-service="{tableItem}">
                        <!-- <span class="text-xs text-balance">{{ tableItem?.appointment?.service?.name_ru }}</span> -->
                    </template>
                
                    <template #table-item-price="{tableItem}">
                        <app-price :value="tableItem.amount" class="text-sm text-balance" />
                    </template>
                    <template #table-item-type="{tableItem}">
                        <span class="text-sm text-primary-600">{{ PAYMENT_TYPES[tableItem.type as keyof typeof PAYMENT_TYPES] }}</span>
                    </template>
    
                    <template #table-item-createdAt="{tableItem}">
                        <span class="text-sm text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
                    </template>
                </app-data-table>
                
                <app-data-table
                    :headers="CONSUMPTION_TABLE_HEADERS"
                    :count="consumptions.length"
                    :items="consumptions"
                    :loading="loading"
                    hide-bottom
                    custom-class="h-fit"
                    hide-top>
                    <template #table-item-amount="{tableItem}">
                        <app-price :value="tableItem.amount" class="text-sm" />
                    </template>
                    <template #table-item-createdAt="{tableItem}">
                        <span class="text-sm text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
                    </template>
                    
                    <template #table-item-doctor="{tableItem}">
                        <span class="text-sm text-balance">{{ tableItem?.doctor?.firstName || '-' }} {{ tableItem?.doctor?.lastName }}</span>
                    </template>
                </app-data-table>

                <div class="mt-2">
                    <app-btn class="w-full md:w-fit" @click="dialog=true" size="small">Добавить расход</app-btn>
                </div>
            </div>
            
            <app-data-table
                :headers="CONSUMPTION_TABLE_HEADERS_1"
                :count="balances.length"
                :loading="loading"
                :items="balances"
                hide-bottom
                hide-top>
                <template #table-item-doctor="{tableItem}">
                    <div class="flex items-center gap-2">
                        <app-image :src="tableItem?.doctor?.avatar" class="rounded-full w-[30px] h-[30px] object-cover" />
                        <span class="text-sm text-balance">
                            {{ tableItem?.doctor?.firstName }}
                            {{ tableItem?.doctor?.lastName }}
                        </span>
                    </div>
                </template>
                <template #table-item-balance="{tableItem}">
                    <app-price :value="tableItem.balance" />
                </template>
            </app-data-table>
        </div>
    </div>

    <app-dialog rounded title="Добавить расход" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="saveConsumption" class="mt-4 flex flex-col gap-4">
            <app-input v-model="consumption.title" label="Название расхода" :attributes="{ required: true, placeholder: 'Название расхода' }" />
            <app-input v-model="consumption.amount" label="Выплаченная сумма" :attributes="{ type: 'number', required: true, placeholder: 'Выплаченная сумма' }" />
            <app-select v-model="consumption.isSalary" label="Тип" :items="[{name: 'Расход',value:false},{name: 'Зарплата',value: true}]" />
            <app-select v-if="consumption.isSalary" v-model="consumption.doctorId" required label="Доктор" placeholder="Доктор" :nullvalue="null" :items="doctors" name="firstName" value="id" />
            <app-textarea v-model="consumption.description" label="Описание расхода" placeholder="Описание расхода" />
            
            <app-btn :disabled="createLoading" type="submit" size="medium">
                {{ createLoading?'Загружается':'Сохранить' }}
            </app-btn>
        </form>
    </app-dialog>
    
    <app-dialog rounded title="Скачать отчет" v-model="dialog1" @close-dialog="dialog1=false">
        <form @submit.prevent="downloadInformation" class="border rounded px-3 py-2 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <h1 class="col-span-1 sm:col-span-2 text-gray-700">Выберите период времени</h1>
            <app-input v-model="downloadFilter.startDate" label="От" :attributes="{ type: 'date', required: true }" />
            <app-input v-model="downloadFilter.endDate" label="До" :attributes="{ type: 'date', required: true }" />

            <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" class="col-span-1 sm:col-span-2" :disabled="downloadLoading" type="submit" size="medium">
                <template v-if="downloadLoading">
                    <McLoadingFill class="size-5 animate-spin" />
                    <span>Загружается</span>
                </template>
                <template v-else>
                    <LuHardDriveDownload class="size-5" />
                    <span>Скачать</span>
                </template>
            </app-btn>
        </form>
        <div class="border rounded px-3 py-2 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <h1 class="col-span-1 sm:col-span-2 text-gray-700">Выберите из шаблона</h1>

            <app-btn v-for="d,i in dates" :key="i"
                @click="handleDownload(d.value as any)" :disabled="downloadLoading" type="button" size="medium">
                {{ d.name }}
            </app-btn>

        </div>
    </app-dialog>
</template>

<script setup lang="ts">
import type { Consumption, Payment, DownloadDateTypes, User } from '@/types'
import { AkDownload, LuHardDriveDownload, McLoadingFill } from '@kalimahapps/vue-icons'
import { todayDate, formatDate, getDateRange, CONSUMPTION_TABLE_HEADERS, PROFIT_TABLE_HEADERS, PAYMENT_TYPES, exportToExcel, CONSUMPTIONS_DOWNLOAD_DATES, CONSUMPTION_TABLE_HEADERS_1 } from '@/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { getUsers } = useUsers()
const { getPayments } = usePayments()
const { getConsumptions, createConsumption } = useConsumptions()

const dialog = ref(false)
const dialog1 = ref(false)
const loading = ref(false)
const filterdate = ref('')
const todaydate = todayDate()
const doctors = ref<User[]>([])
const payments = ref<Payment[]>([])
const createLoading = ref<boolean>(false)
const downloadLoading = ref<boolean>(false)
const consumptions = ref<Consumption[]>([])
const downloadFilter = ref({
    endDate: '',
    startDate: '',
    // doctorId: null as number | null,
})
const consumption = ref<Partial<Consumption>>({
    amount: 0,
    title: '',
    description: '',
    isSalary: false,
    doctorId: null as any,
})

const totalProfits = computed(() => payments.value.reduce((a,b) => a + b.amount, 0))
const totalConsumptions = computed(() => consumptions.value.reduce((a,b) => a + b.amount, 0))
const dates = computed(() => Object.keys(CONSUMPTIONS_DOWNLOAD_DATES).map(key => ({ name: CONSUMPTIONS_DOWNLOAD_DATES[key as DownloadDateTypes],  value: key})))
const balances = computed(() => doctors.value.map((doctor) => {
    return {
        doctor,
        balance: payments.value
            .filter(p => p.examination?.doctorId === doctor.id)
            .reduce((a,b) => a + b.amount,0)
    }
}))

const getItems = async (params: any) => {
    try {
        loading.value = true
        const [P, C]: any = await Promise.all([
            getPayments({...params, page: 1, perPage: 1000}),
            getConsumptions({...params, page: 1, perPage: 1000})
        ])
        payments.value = P.data
        consumptions.value = C.data
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const saveConsumption = async () => {
    if(!consumption.value.isSalary) delete consumption.value.doctorId
    try {
        const data = await createConsumption(consumption.value)
        consumptions.value.push({...data, doctor: doctors.value.find(d => d.id === data.doctorId)} as any)
        close()
    } catch (error) {
        console.log(error)
    }
}

const handleDownload = (range: DownloadDateTypes) => {
    downloadFilter.value = getDateRange(range)
    downloadInformation()
}

const downloadInformation = async () => {
    try {
        downloadLoading.value = true
        const data: any = await Promise.all([
            getPayments({ startDate: `"${downloadFilter.value.startDate}"`, endDate: `"${downloadFilter.value.endDate}"`, page: 1, perPage: 10000}),
            getConsumptions({ startDate: `"${downloadFilter.value.startDate}"`, endDate: `"${downloadFilter.value.endDate}"`, page: 1, perPage: 10000})
        ])
        const P = data[0].data
        const C = data[1].data
    
        const groupedData: Record<string, any> = {};
    
        for (const payment of P) {
            const date = formatDate(new Date(payment.createdAt));
            if (!groupedData[date]) {
                groupedData[date] = {
                    date,
                    totalProfit: 0,
                    totalConsumption: 0,
                    payments: [],
                    consumptions: [],
                };
            }
            groupedData[date].totalProfit += payment.amount;
            groupedData[date].payments.push(payment);
        }
    
        // Process consumptions
        for (const consumption of C) {
            const date = formatDate(new Date(consumption.createdAt));
            if (!groupedData[date]) {
                groupedData[date] = {
                    date,
                    totalProfit: 0,
                    totalConsumption: 0,
                    payments: [],
                    consumptions: [],
                };
            }
            groupedData[date].totalConsumption += consumption.amount;
            groupedData[date].consumptions.push(consumption);
        }
        
        console.log(Object.values(groupedData));
        
        exportToExcel(Object.values(groupedData), totalProfits.value, totalConsumptions.value);
    } catch (error) {
        console.log(error)
    } finally {
        downloadLoading.value = false
    }
}

const close = () => {
    dialog.value = false
    consumption.value = {
        amount: 0,
        title: '',
        description: '',
        isSalary: false,
        doctorId: null as any,
    }
}

const init = async () => {
    try {
        filterdate.value = todaydate
        await getItems({createdDate: `"${todaydate}"`, byCreatedDate: 'desc'})
        const data: any = await getUsers({})
        doctors.value = data.filter((d: any) => d.role === "DOCTOR")
    } catch (error) {
        console.log(error)
    }
}

const getItemsByDate = async (range: DownloadDateTypes) => {
    try {
        const { endDate, startDate } = getDateRange(range)
        downloadFilter.value = { endDate, startDate }
    
        await getItems({ startDate: `"${startDate}"`, endDate: `"${endDate}"`, page: 1, perPage: 10000, byCreatedDate: 'desc'})
    } catch (error) {
        console.log(error)
    }
} 

await init()
</script>