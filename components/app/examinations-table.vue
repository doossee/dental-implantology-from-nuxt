<template>
    <teleport defer to="#i-e-content" v-if="user?.userRole === 'ADMIN'">
        <app-btn @click="cartDialog=true" size="small" class="relative w-full sm:w-fit">
            <HiShoppingCart class="size-5" />
            <span>Корзина</span>
            <app-count-badge :count="notPaidExaminations.length" />
        </app-btn>
    </teleport>

    <app-data-table
        hide-top
        :count="count"
        :loading="false"
        :headers="headers"
        :items="examinations"
        
        @fetching="handleGetExaminations">
        <template #table-top-extra="{handleFetch}">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                <div class="cursor-pointer rounded border px-3 py-1.5 text-sm bg-white text-center"
                    v-for="t,i in EXAMINATION_FILTER_STATUSES" :key="i" @click="filterStatus=t.value;t.value ? handleFetch({status: t.value}) : handleFetch()"
                    :class="{'!bg-primary-600 !text-white': t.value === filterStatus, 'col-span-1 sm:col-span-2 md:col-span-1': i==0}">
                    {{ t.name }}
                </div>
            </div>
        </template>

        <template #table-item-tooth="{tableItem}">
            <div class="flex flex-col justify-center gap-4 items-center w-full md:max-w-[200px]">
                <app-tooth-image :tooth-num="tableItem?.tooth?.num" :conditions="tableItem?.toothCondition||[]" />
                <app-badges :items="tableItem.toothCondition" :data="TOOTH_CONDITIONS" />
            </div>
        </template>
        
        <template #table-item-toothNum="{tableItem}">
            <span class="text-lg">{{ tableItem?.tooth?.num }}</span>
        </template>

        <template #table-item-info="{tableItem}">
            <p class="text-sm font-medium">{{ tableItem?.doctor?.firstName }} {{ tableItem?.doctor?.lastName }}</p>
            <span class="text-sm text-gray-500">{{ new Date(tableItem?.createdAt).toDateString() }}</span>
        </template>
        
        <template #table-item-treatments="{tableItem}">
            <div class="divide-y rounded-md border md:border-none px-2 md:px-0 w-full">
                <div v-for="treatment in tableItem.treatments" :key="treatment.id" class="py-2">
                    <p class="text-wrap text-sm">{{ treatment?.procedure?.title_ru }}</p>
                    <div class="space-x-2 mt-2">
                        <app-price :value="treatment.price" class="text-gray-600" />
                        <span v-show="treatment.isCompleted" class="px-2 py-1 rounded text-xs bg-green-500 text-white">Сделано</span>
                        <span v-show="!treatment.isCompleted" class="px-2 py-1 rounded text-xs bg-red-500 text-white">Не сделано</span>
                    </div>
                </div>
                <div class="" v-show="tableItem.treatments.length === 0">
                    <span class="text-gray-500">нет процедуры</span>
                </div>
            </div>
        </template>

        <template #table-item-status="{tableItem}">
            <span class="px-3 py-1.5 rounded-2xl text-sm" :class="EXAMINATION_PAYMENT_STYLES[tableItem.status]">{{ EXAMINATION_STATUSES[tableItem.status] }}</span>
        </template>
        
        <template #table-item-actions="{tableItem, index}">
            <div class="flex items-center gap-2">
                <nuxt-link class="hover:underline" :to="`/admin/patients/${route.params.id}/tooth/${tableItem.tooth.num}?examination=${tableItem.id}`">
                    <app-btn size="small">Посмотреть</app-btn>
                </nuxt-link>
                <app-btn :disabled="disablePaymentBtn(index)" v-if="user?.userRole === 'ADMIN'" size="small" @click="itemIndex=index;dialog=true;">Оплатить</app-btn>
            </div>
        </template>
    </app-data-table>
    
    <app-dialog v-if="user?.userRole === 'ADMIN'" title="Корзина" v-model="cartDialog" @close-dialog="cartDialog=false" rounded>
        <div class="w-full mt-2 grid gap-2">
            <div class="text-center" v-show="notPaidExaminations.length===0">
                <span class="text-gray-600">Корзина пуста</span>
            </div>
            <div v-for="item,i in notPaidExaminations" :key="i" class="border rounded grid gap-2">
                <div class="flex justify-between flex-col md:flex-row w-full gap-2 items-center hover:bg-gray-50 cursor-pointer pl-4 pr-2 py-2" :class="{'bg-gray-50':opened===i}">
                    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2 items-center flex-1 w-full" @click="handleOpenPaidEx(i)">
                        <div>
                            <span class="text-sm">{{ item?.doctor?.firstName }} {{ item?.doctor?.lastName }}</span> <br>
                            <span class="text-sm text-gray-500">{{ new Date(item.createdAt).toDateString() }}</span>
                        </div>
                        <span class="px-2.5 py-1 w-fit rounded-2xl text-xs text-nowrap" :class="EXAMINATION_PAYMENT_STYLES[item.status]">{{ EXAMINATION_STATUSES[item.status] }}</span>
                        <app-price :value="item.sum" class="text-sm" />
                    </div>    
                    <app-btn class="w-full md:w-fit" :disabled="disablePaymentBtn(item.index)" v-if="user?.userRole === 'ADMIN'" size="small" @click="itemIndex=item.index;dialog=true;">Оплатить</app-btn>
                </div>

                <div v-show="opened==i" class="pl-4 py-1">
                    <div class="divide-y">
                        <div v-for="treatment in item.treatments" :key="treatment.id" class="py-2">
                            <p>{{ treatment?.procedure?.title_ru }}</p>
                            <div class="space-x-2 mt-1">
                                <app-price :value="treatment.price" class="text-gray-600" />
                                <span v-show="treatment.isCompleted" class="px-2 py-1 rounded text-xs bg-green-500 text-white">Сделано</span>
                                <span v-show="!treatment.isCompleted" class="px-2 py-1 rounded text-xs bg-red-500 text-white">Не сделано</span>
                            </div>
                        </div>
                        <div class="" v-show="item.treatments.length === 0">
                            <span class="text-gray-500">нет процедуры</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-dialog>
    
    <template v-if="user?.userRole === 'ADMIN'">
        <app-dialog v-model="dialog" title="Создать Платеж" rounded max-width="600" @close-dialog="closePaymentDialog">
            <app-payment-form v-if="currentExamination!==null" :examination="currentExamination" @create-payment="handleChangeStatus" />
        </app-dialog>
    </template>
</template>

<script setup lang="ts">
import { HiShoppingCart } from '@kalimahapps/vue-icons'
import type { Examination, ExaminationStatus } from '@/types'
import { TOOTH_CONDITIONS, EXAMINATION_TABLE_HEADERS, EXAMINATION_FILTER_STATUSES, EXAMINATION_STATUSES, EXAMINATION_PAYMENT_STYLES } from '@/constants'

const { headers = EXAMINATION_TABLE_HEADERS } = defineProps<{
    headers?: any[]
}>()

const user = useUserData()
const { getExaminations } = useExaminations()

const count = ref(0)
const route = useRoute()
const dialog = ref(false)
const cartDialog = ref(false)
const opened = ref<number|null>(null)
const itemIndex = ref<null|number>(null)
const filterStatus = toRef(inject<string>('examination-filter', ''))
const examinations = toRef(inject<Examination[]>('examination-items', []))

const currentExamination = computed(() => {
    return itemIndex.value === null ? null : examinations.value[itemIndex.value]
})

const notPaidExaminations = computed(() => {
    return examinations.value.map((e, index) => ({...e, index})).filter(s => s.status === 'PARTIALLY_PAID' || s.status === 'UNPAID')
}) 

const handleOpenPaidEx = (index: number) => {
    if(opened.value === index) opened.value = null
    else opened.value = index    
}

const disablePaymentBtn = (index: number) => {
    return ((examinations.value[index].treatments.every(t => t.isCompleted) && examinations.value[index].status === 'FULLY_PAID') &&
           examinations.value[index].treatments.length > 0) ||
           examinations.value[index].status === 'FULLY_PAID' ||
           (examinations.value[index].treatments.every(t => t.price===0))
}

const closePaymentDialog = () => {
    dialog.value = false
    itemIndex.value = null
}

const handleChangeStatus = (id: number, status: ExaminationStatus) => {
    const index = examinations.value.findIndex(e => e.id === id)
    if(index >= 0) examinations.value[index].status = status
    closePaymentDialog()
}

const handleGetExaminations = async (params: any) => {
    try {
        const { data, meta }: any = await getExaminations({ ...params, patientId: route.params.id, byCreatedDate: 'desc' })
        examinations.value = data
        count.value = meta.total
    } catch (error) {
        console.log(error)
    }
}
</script>