<template>
    <div class="w-full p-2">
        <app-data-table
            hide-top
            :count="count"
            :items="items"
            :loading="loading"
            :headers="INITIAL_RECORD_TABLE_HEADERS"
            
            @fetching="getItems">
            <template #table-item-id="{index}">
                <span class="text-sm">{{ index+1 }}</span>
            </template>
            <template #table-item-createdAt="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
</template>

<script setup lang="ts">
import type { InitialRecord } from '@/types'
import { INITIAL_RECORD_TABLE_HEADERS, ALERT_MESSAGES } from '@/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { pushAlert } = useAlert()
const { getRecords, deleteRecord } = useInitialRecords()

const loading = ref(false)
const count = ref<number>(0)
const items = ref<InitialRecord[]>([])

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getRecords({ ...params })
        items.value = data.data as any
        count.value = data.meta.total
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {
        await deleteRecord(id)
        items.value.splice(index, 1)
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}
</script>