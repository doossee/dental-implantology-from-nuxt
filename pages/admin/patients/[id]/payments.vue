<template>
    <div class="w-full">
        <app-data-table
            hide-search
            :count="count"
            :items="items"
            :loading="loading"
            :headers="PATIENT_PAYMENT_TABLE_HEADERS"
            
            @fetching="getItems">
            <template #table-top="{handleFetch}">
                <div class="flex items-center gap-2">
                    <app-input v-model="filterdate" class="flex-1" @cleared="filterdate='';handleFetch()" clearable :attributes="{type: 'date', placeholder: 'Поиск'}" @changed="handleFetch({createdDate:$event.target.value})" />
                </div>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
            </template>

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
</template>

<script setup lang="ts">
import type { Payment } from '@/types'
import { PAYMENT_TYPES, PATIENT_PAYMENT_TABLE_HEADERS } from '@/constants'

definePageMeta({
  middleware: ['auth', 'role'],
})

const { getPayments } = usePayments()

const route = useRoute()
const loading = ref(false)
const filterdate = ref('')
const count = ref<number>(0)
const items = ref<Payment[]>([])

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getPayments({...params, patientId: route.params.id})
        items.value = data.data as any
        count.value = data.meta.total
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
</script>