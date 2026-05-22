<template>
    <div class="w-full">
        <app-data-table
            hide-search
            :count="count"
            :items="items"
            :loading="loading"
            :headers="X_RAY_TABLE_HEADERS"
            
            @fetching="getItems">
            <template #table-top>
                <!-- <div class="flex items-center gap-2">
                    <app-input v-model="filterdate" class="flex-1" clearable @cleared="filterdate='';handleFetch()" :attributes="{type: 'date', placeholder: 'Поиск'}" @changed="handleFetch({createdDate:$event.target.value})" />
                </div> -->
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </template>

            <template #table-item-tooth="{tableItem}">
                <span class="text-sm text-balance">{{ tableItem?.tooth?.num }}</span>
            </template>
            
            <template #table-item-date="{tableItem}">
                <span class="text-sm text-balance">{{ new Date(tableItem.examinationDate!).toLocaleString() }}</span>
            </template>
            
            <template #table-item-type="{tableItem}">
                <span class="text-sm text-balance">{{ X_RAY_TYPES[tableItem.type as XRayType] }}</span>
            </template>

            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</app-btn>
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>

        <app-dialog rounded :title="itemIndex==null?'Добавление рентгена':'Редактирование рентгена'" v-model="dialog" @close-dialog="close">
            <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <app-input v-model="$item.examinationDate" label="Дата" :attributes="{type:'date', required: true}" />
                    <app-select required v-model="$item.type" label="Тип" :items="Object.keys(X_RAY_TYPES).map((key) => ({name: X_RAY_TYPES[key as XRayType], value: key}))" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <app-select required v-model="$item.toothId" :items="teeth" label="Зуб #" placeholder="Зуб #" :nullvalue="null" />
                    <app-input v-model="$item.amount" label="Количество" :attributes="{type:'number', required: true, min: 0, placeholder: 'Количество'}" />
                    <app-input v-model="$item.dose" label="Доза (мкЗв)" :attributes="{type:'number', step: 0.1, required: true, min: 0, placeholder: 'Доза (мкЗв)'}" />
                </div>
                <app-textarea v-model="$item.conclusion" label="Заключение" placeholder="Заключение" type="text" />

                <div class="grid gap-2" v-show="files.length>0">
                    <app-file-image v-for="file,i in files" :key="i" :file="file" @remove-item="removeImage(i)" />
                </div>
    
                <app-file-uploader @files-changed="onFilesChange" :disabled="files.length >= 5" />

                <template v-if="$item.id">
                    <div class="grid grid-cols-2 gap-2">
                        <div v-for="image,i in $item.images||[]" :key="i" class="relative">
                            <app-btn @click="deleteImage($item.id, itemIndex!, image, i)" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300 absolute top-2 right-2" size="square">
                                <ClCloseMd />
                            </app-btn>
                            <app-image :src="image" class="w-full h-full rounded min-h-[200px]" />
                        </div>
                    </div>
                </template>

                <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
            </form>
        </app-dialog>
    </div>
</template>

<script setup lang="ts">
import type { XRayData, XRayType } from '@/types'
import { ClCloseMd } from '@kalimahapps/vue-icons'
import { todayDate, X_RAY_TYPES, X_RAY_TABLE_HEADERS, ALERT_MESSAGES } from '@/constants'

definePageMeta({
  middleware: ['auth'],
})

const { pushAlert } = useAlert()
const { patient } = usePatients()
const { getXRayData, createXRayData, deleteXRayData, updteXRayData } = useXRay()

const route = useRoute()
const today = todayDate()
const dialog = ref(false)
const loading = ref(false)
const files = ref<any[]>([])
const count = ref<number>(0)
const createLoading = ref(false)
const items = ref<XRayData[]>([])
const itemIndex = ref<number|null>(null)
const $item = ref<Partial<XRayData>>({
    amount: 1,
    dose: 2.5,
    type: "CT",
    conclusion: "",
    toothId: null as any,
    examinationDate: today,
})

const teeth: any = computed(() => {
    return patient.value?.teeth?.map(t => ({ name: t.num, value: t.id }))?.sort((a, b) => a.name - b.name) ?? []
})

const onFilesChange = (_files: any[]) => {
    if(files.value.length > 5) return
    files.value = _files
}

const removeImage = (index: number) => {
    files.value.splice(index, 1)
    if(files.value.length === 0) files.value = []
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const {data, meta}: any = await getXRayData({...params, patientId: route.params.id })
        items.value = data as any
        count.value = meta.total
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: Partial<XRayData>, index: number) => {
    $item.value = Object.assign({}, {...item, examinationDate: String(item.examinationDate)?.split('T')[0] })
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {   
        await deleteXRayData(id)
        items.value.splice(index, 1)
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const deleteImage = async (id: number, itemIndex: number, name: string, imageIndex: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {   
        await updteXRayData(id, { removeImages: [name] })
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
        items.value[itemIndex].images.splice(imageIndex, 1)
    } catch (error) {
        console.log(error)
    }
}

const create = async (body: any) => {
    try {   
        const data = await createXRayData(body)
        items.value.push(data as any)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const update = async (index: number, id: number, body: any) => {
    try {   
        const data = await updteXRayData(id, body)
        Object.assign(items.value[index], data)
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const save = async () => {
    try {
        createLoading.value = true
        const formdata = new FormData()
        Object.keys($item.value).map(key => {
            formdata.append(key, $item.value[key as keyof typeof $item.value]?.toString()!)
        })
        formdata.delete('id')
        formdata.delete('images')
        files.value.map(file => {
            formdata.append('images', file)
        })
        if(itemIndex.value !== null) await update(itemIndex.value, $item.value.id!, formdata)        
        else await create(formdata)
        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    $item.value = Object.assign({}, {
        amount: 1,
        dose: 2.5,
        type: "CT",
        conclusion: "",
        toothId: null as any,
        examinationDate: today,
    }) as any
    files.value = []
    dialog.value = false
    itemIndex.value = null
}
</script>