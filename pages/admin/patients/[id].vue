<template>
    <div class="w-full p-2">
        <div class="bg-white border px-4 py-2.5 rounded mb-2" v-if="showTopBar">
            <div class="mb-4 flex gap-4 items-center justify-between">
                <div class="flex gap-4 items-center">
    
                    <label for="file-input" class="group cursor-pointer flex items-center justify-center flex-col gap-4 relative">
    
                        <div class="rounded-full p-1 border-2 border-primary-600 w-[70px] h-[70px]">
                            <div v-if="patient?.avatar" class="w-full h-full hover:bg-primary-100 overflow-hidden rounded-full">
                                <app-image no-modal :src="patient?.avatar" class="w-full rounded-full h-full object-cover" alt="" />
                            </div>
    
                            <div v-else class="w-full h-full overflow-hidden rounded-full bg-primary-600 p-2 text-white font-medium text-xl flex justify-center items-center">
                                <span>{{ patient?.firstName?.[0] }}{{ patient?.lastName?.[0] }}</span>
                            </div>
                        </div>
    
                        <div class="absolute flex items-center justify-center w-full h-full top-0 left-0 transition-opacity opacity-0 group-hover:opacity-100 bg-black/40 rounded-full">
                            <BsCameraFill class="size-8 absolute text-white" />
                        </div>
    
                    </label>
                    <input hidden @change="onFileChange" id="file-input" accept="image/jpeg,image/jpg,image/png,image/bmp;capture=camera" type="file">
    
                    <div v-if="patient">
                        <p class="font-medium text-sm">{{ patient.firstName }} {{ patient.lastName }}</p>
                        <span v-if="(user?.userRole === 'ADMIN' || user?.isSuperUser)" class="text-gray-500 text-sm">{{ patient.phone }}</span>
                        <div v-else class="mt-2"></div>
                        <div class="px-2 py-0.5 rounded bg-primary-600 text-white w-fit text-xs">
                            {{ {'MALE': 'Мужской', 'FEMALE': 'Женский'}[(patient.gender as 'MALE')] }}
                        </div>
                    </div>
                </div>

            </div>
            <div class="overflow-auto">
                <app-patient-nav />
            </div>
        </div>
        <nuxt-page />
    </div>
</template>

<script setup lang="ts">
import { ALERT_MESSAGES } from '@/constants'
import { BsCameraFill } from '@kalimahapps/vue-icons'

definePageMeta({
    layout: 'admin-layout',
    middleware: ['auth'],
})

const route = useRoute()

const user = useUserData()
const { pushAlert } = useAlert()
const { planExaminations } = useExaminations()
const { patient, getPatient, changePatientAvatar } = usePatients()

const showTopBar = computed(() => {
    return !route.path.split('/').includes('tooth')
})

const init = async () => {
    try {   
        const data: any = await getPatient(+route.params.id!, { expand: "teeth,appointments" })
        
        patient.value = data
    
        if(planExaminations.value?.[0] && planExaminations.value[0].patientId !== data.id) planExaminations.value = []
    } catch (error) {
        console.log(error)
    }
}

const onFileChange = async (e: any) => {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return

    const formData = new FormData()
    formData.append('avatar', files[0])
    pushAlert(ALERT_MESSAGES.SAVING, 'SUCCESS')

    try {   
        const data = await changePatientAvatar(+route.params.id, formData)
        patient.value!.avatar = data.avatar
        pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

await init()
</script>