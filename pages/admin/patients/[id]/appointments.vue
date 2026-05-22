<template>
    <div class="w-full">
        <app-data-table
            hide-search
            :items="_items"
            :loading="false"
            :count="_items.length"
            :headers="PATIENT_APPOINTMENTS_TABLE_HEADERS">
            <template #table-top>
                <div class="flex items-center gap-2">
                    <app-input v-model="filterdate" clearable @cleared="filterdate=''" :attributes="{type: 'date', placeholder: 'Поиск'}" class="flex-1" />
                </div>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
            </template>
            
            <template #table-item-id="{index}">
                <span class="text-sm">{{ index+1 }}</span>
            </template>

            <template #table-item-doctor="{tableItem}">
                <span class="text-sm text-balance">{{ tableItem?.doctor?.firstName }} {{ tableItem?.doctor?.lastName }}</span>
            </template>
            <template #table-item-procedure="{tableItem}">
                <span class="text-sm text-balance">{{ tableItem.service?.title }}</span>
            </template>
            
            <template #table-item-startDate="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.startDate!).toLocaleString() }}</span>
            </template>
            
            <template #table-item-endDate="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.endDate!).toLocaleString() }}</span>
            </template>

            <template #table-item-createdAt="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
        </app-data-table>
    </div>
</template>

<script setup lang="ts">
import { PATIENT_APPOINTMENTS_TABLE_HEADERS } from '@/constants'

definePageMeta({
  middleware: ['auth', 'role'],
})

const { patient } = usePatients()

const filterdate = ref('')
const _items = computed(() => {
    if(!filterdate.value) return patient.value?.appointments ?? []
    return patient.value?.appointments?.filter(app => String(app.createdAt).split('T')[0] === filterdate.value) ?? []
})
</script>