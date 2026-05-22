<template>
    <div class="grid gap-4">
        <div v-for="tooth in teeth" :key="tooth.id">
            <h1>#Зуб: {{ tooth.num }}</h1>
            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="image,i in tooth.images" :key="i" class="h-[250px] rounded bg-white p-2 border overflow-hidden relative">
                    <app-btn @click="removeFile(image, tooth.id, i)" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300 absolute top-4 right-4" size="square">
                        <McDeleteFill />
                    </app-btn>
                    <app-image :src="image" class="w-full h-full object-cover rounded-sm" />
                </div>
            </div>
        </div>

        <div class="text-center" v-show="teeth.length===0">
            <span class="text-gray-600">Галарея пуста</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ALERT_MESSAGES } from '@/constants'
import { McDeleteFill } from '@kalimahapps/vue-icons'

const { pushAlert } = useAlert()
const { patient } = usePatients()
const { updateTeeth } = useTeeth()

const teeth = computed(() => patient.value?.teeth.filter(t => t.images.length > 0)||[])

const removeFile = async (name: string, toothId: number, index: number) => {
    if(!confirm(ALERT_MESSAGES.DELETE_CONFIRMATION)) return

    try {   
        await updateTeeth(toothId!, { removeImages: [name] })
        pushAlert(ALERT_MESSAGES.DATA_DELETED, 'SUCCESS')
        patient.value?.teeth.find(t => t.id === toothId)?.images?.splice(index, 1)
    } catch (error) {
        console.log(error)
    }
}
</script>