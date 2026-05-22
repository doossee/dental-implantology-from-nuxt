<template>
    <div class="bg-white rounded border p-4 h-fit w-full">
        <div class="flex justify-between items-start">
            <div class="flex gap-2 items-center">
                <app-btn @click="isOpen=!isOpen" size="square" class="!px-1 !py-1 !text-xl">
                    <AkChevronRightSmall :class="{'rotate-90': isOpen}" />
                </app-btn>
                <span>Фото</span>
            </div>
        </div>

        <div v-show="isOpen" class="mt-2 grid gap-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div v-for="image,i in images" :key="i" class="relative h-[150px]">
                    <app-btn @click="removeFile(image, i)" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300 absolute top-2 right-2" size="square">
                        <ClCloseMd />
                    </app-btn>
                    <app-image :src="image" class="w-full h-full rounded object-cover" />
                </div>
            </div>
            <app-file-uploader :disabled="!toothId" @files-changed="onFilesChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ALERT_MESSAGES } from '@/constants'
import { ClCloseMd, AkChevronRightSmall } from '@kalimahapps/vue-icons'

const { pushAlert } = useAlert()
const { patient } = usePatients()
const { updateTeeth } = useTeeth()

const isOpen = ref(false)

const { toothId } = defineProps<{ toothId?: number | null }>()
const images = ref(patient.value?.teeth.find(t => t.id === toothId)?.images ?? [])

const onFilesChange = async (_files: any[]) => {
    const formdata = new FormData()
    
    for(let i=0; i<_files.length; i++)
        formdata.append('images', _files[i])
    
    try {
        const data = await updateTeeth(toothId!, formdata)
        pushAlert(ALERT_MESSAGES.DATA_CREATED, 'SUCCESS')
        images.value = data.images
        patient.value!.teeth.find(t => t.id === toothId)!.images = data.images
    } catch(error) {
        console.log(error)
    }
}

const removeFile = async (name: string, index: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {
        await updateTeeth(toothId!, { removeImages: [name] })
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
        images.value.splice(index, 1)
        patient.value?.teeth.find(t => t.id === toothId)?.images?.splice(index, 1)
    } catch(error) {
        console.log(error)
    }
}
</script>