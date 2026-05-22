<template>
    <div class="pt-4">
        <h1 class="text-gray-500">Истопия платежей</h1>
        <app-data-table
            hide-top
            hide-bottom
            :loading="false"
            :items="examination.payments??[]"
            :count="examination.payments.length??0"
            :headers="PATIENT_PAYMENT_TABLE_HEADERS_1">

            <template #table-item-id="{index}">
                <span class="text-sm">{{ index+1 }}</span>
            </template>

            <template #table-item-amount="{tableItem}">
                <app-price :value="tableItem.amount" class="text-sm text-balance" />
            </template>

            <template #table-item-type="{tableItem}">
                <span class="text-sm text-primary-600">{{ PAYMENT_TYPES[tableItem.type as keyof typeof PAYMENT_TYPES] }}</span>
            </template>
            
            <template #table-item-doctor="{tableItem}">
                <span class="text-sm text-balance">{{ tableItem?.examination?.doctor?.firstName }} {{ tableItem?.examination?.doctor?.lastName }}</span>
            </template>
            
            <template #table-item-createdAt="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
        </app-data-table>
    </div>
    <div class="my-2 border rounded p-2 flex items-center justify-between text-sm gap-4">
        <app-price :value="examination.sum" class="text-blue-600">
            <template #prepend>Общая:</template>
        </app-price>
        <app-price :value="totalPrice" class="text-green-600">
            <template #prepend>Оплаченная:</template>
        </app-price>
        <app-price :value="examination.sum-totalPrice" class="text-red-600">
            <template #prepend>Осталось:</template>
        </app-price>
    </div>
    <form v-if="examination.sum >= totalPrice" @submit.prevent="handleCreatePayment" class="mt-4 flex flex-col gap-4">
        <app-input v-model="payment.amount" label="Сумма" :attributes="{required: true, type: 'number', placeholder: 'Сумма', min: 0, max: examination.sum - totalPrice }" />
        <app-select required v-model="payment.type" :items="Object.keys(PAYMENT_TYPES).map(key => ({ name: PAYMENT_TYPES[key as PaymentType], value: key }))" label="Тип платежа" />
        
        <app-btn :disabled="loading" type="submit" size="small">{{ loading?'Загружается':'Сохранить' }}</app-btn>
    </form>
</template>

<script setup lang="ts">
import type { Examination, Payment, PaymentType } from '@/types'
import { PAYMENT_TYPES, PATIENT_PAYMENT_TABLE_HEADERS_1, ALERT_MESSAGES } from '@/constants'

const { pushAlert } = useAlert()
const { createPayment } = usePayments()

const emits = defineEmits(['create-payment'])
const { examination } = defineProps<{
    examination: Examination
}>()

const loading = ref(false)
const payment = ref<Partial<Payment>>({
    amount: 0,
    type: "CASH",
    examinationId: examination.id,
})

const totalPrice = computed(() => examination.payments.reduce((a, b) => a + b.amount, 0))

payment.value.amount = examination.sum - totalPrice.value

const handleCreatePayment = async () => {
    try {
        loading.value = true
        const data = await createPayment(payment.value)
        examination.payments.push(data as any)
        const status = totalPrice.value >= examination.sum ? 'FULLY_PAID' : 'PARTIALLY_PAID'
        emits('create-payment', examination.id, status)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    
        payment.value = {
            amount: 0,
            type: "CASH",
            examinationId: examination.id,
        }
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}
</script>