<template>
    <div class="bg-white rounded border p-4 w-full h-fit">
        <div class="flex justify-between items-start">
            <div class="flex gap-2 items-center">
                <app-btn @click="isOpen=!isOpen" size="square" class="!px-1 !py-1 !text-xl">
                    <AkChevronRightSmall :class="{'rotate-90': isOpen}" />
                </app-btn>
                <span>Рентген</span>
            </div>
            <app-btn :disabled="!toothId" @click="dialog=true" size="square" class="!px-1 !py-1 !text-xl">
                <BsPlus />
            </app-btn>
        </div>

        <div v-show="isOpen" class="mt-2 grid gap-2">
            <div class="border rounded px-2 py-1 flex gap-2 items-center" v-for="item,i in items" :key="item.id">
                <div class="flex-1">
                    <h2 class="font-medium">Доза: {{ item.dose }} мкЗв, Количество: {{ item.amount }}</h2>
                    <p class="text-sm text-gray-700">Тип: {{ X_RAY_TYPES[item.type] }}</p>
                </div>
                <div>
                    <app-btn size="small" @click="editItem(item, i)">Посмотреть</app-btn>
                </div>
            </div>
            <div class="text-center" v-show="items.length === 0">
                <span class="text-sm text-gray-600">Пусто</span>
            </div>
        </div>

        <template v-if="toothId">
            <app-dialog rounded title="Добавление рентгена" v-model="dialog" @close-dialog="close">
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
    
                    <div class="grid grid-cols-2 gap-2" v-if="$item.id">
                        <div v-for="image,i in $item.images||[]" :key="i" class="relative">
                            <app-btn @click="deleteImage($item.id, itemIndex!, image, i)" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300 absolute top-2 right-2" size="square">
                                <McDeleteFill />
                            </app-btn>
                            <app-image :src="image" class="w-full h-full rounded" />
                        </div>
                    </div>
    
                    <div class="flex items-center gap-2 justify-end">
                        <app-btn v-if="$item.id" @click="deleteItem($item.id, itemIndex!)" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" type="button" size="small">Удалить</app-btn>
                        <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
                    </div>
                </form>
            </app-dialog>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { XRayData, XRayType } from '@/types'
import { todayDate, X_RAY_TYPES, ALERT_MESSAGES } from '@/constants'
import { McDeleteFill, AkChevronRightSmall, BsPlus } from '@kalimahapps/vue-icons'

const { toothId } = defineProps<{toothId?: number | null }>()

const { pushAlert } = useAlert()
const { patient } = usePatients()
const { getXRayData, createXRayData, updteXRayData, deleteXRayData } = useXRay()

const isOpen = ref(false)
const today = todayDate()
const dialog = ref(false)
const loading = ref(false)
const files = ref<any[]>([])
const createLoading = ref(false)
const items = ref<XRayData[]>([])
const itemIndex = ref<number|null>(null)
const $item = reactive<Partial<XRayData>>({
    toothId: toothId!,
    amount: 1,
    dose: 2.5,
    type: "CT",
    conclusion: "",
    examinationDate: today,
})

const teeth = computed(() => {
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
        const { data }: any = await getXRayData(params)
        items.value = data as any
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: XRayData, index: number) => {
    Object.assign($item, {...item, examinationDate: String(item.examinationDate).split('T')[0] })
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {
        await deleteXRayData(id)
        items.value.splice(index, 1)
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
    } catch(error) {
        console.log(error)
    }
}

const deleteImage = async (id: number, itemIndex: number, name: string, imageIndex: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {
        await updteXRayData(id, { removeImages: [name] })
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
        items.value[itemIndex].images.splice(imageIndex, 1)
    } catch(error) {
        console.log(error)
    }
}

const update = async (index: number, id: number, body: any) => {
    try {
        const data = await updteXRayData(id, body)
        Object.assign(items.value[index], data)
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch(error) {
        console.log(error)
    }
}

const create = async (body: any) => {
    try {
        const data = await createXRayData(body)
        items.value.push(data as any)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
    } catch(error) {
        console.log(error)
    }
}

const save = async () => {
    try {
        createLoading.value = true
        const formdata = new FormData()
        Object.keys($item).map(key => {
            formdata.append(key, $item[key as keyof typeof $item]?.toString()!)
        })
        formdata.delete('id')
        formdata.delete('images')
        files.value.map(file => {
            formdata.append('images', file)
        })
        if(itemIndex.value !== null) await update(itemIndex.value , $item.id!, formdata)
        else await create(formdata)
        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    delete $item.id
    Object.assign($item, {
        amount: 1,
        dose: 2.5,
        type: "CT",
        conclusion: "",
        toothId: null as any,
        examinationDate: today,
    })
    files.value = []
    dialog.value = false
    itemIndex.value = null
}

if(toothId) getItems({ toothId, page: 1, perPage: 100, byId: 'desc' })
</script>