<template>
    <div :style="{height: customStyle.height + 'px', top: customStyle.top + 'px'}" class="absolute w-full group flex items-center">
        <div @click="emits('select-item')" class="absolute w-full h-full group-hover:z-50 border flex items-center text-center p-2 justify-center flex-col cursor-pointer text-primary-700 font-medium bg-primary-100 border-l-[3px] border-l-primary-600"
            :class="customStyle.height > 60?'':'group-hover:h-max'">
            
            <template v-if="customStyle.height > 60">
                <span class="text-sm font-medium">{{ appointment?.patient?.lastName }} {{ appointment?.patient?.firstName }}</span>
                <span class="text-xs" v-if="(user?.userRole === 'ADMIN' || user?.isSuperUser)">{{ appointment?.patient?.phone }}</span>
                <span class="text-xs">{{ appointment?.service?.title }}</span>
            </template>
            <template v-else>
                <span class="text-sm font-medium">{{ appointment?.patient?.lastName }}
                    <template v-if="customStyle.height < 60">
                        <span class="uppercase inline-block group-hover:hidden">{{ appointment?.patient?.firstName[0] }}.</span>
                        <span class="hidden group-hover:inline-block">{{ appointment?.patient?.firstName }}</span>
                    </template>
                    <template v-else>
                        <span class="hidden md:inline-block group-hover:inline-block">{{ appointment?.patient?.firstName }}</span>
                        <span class="inline-block md:hidden uppercase group-hover:hidden">{{ appointment?.patient?.firstName[0] }}.</span>
                    </template>
                </span>
                <span class="text-xs hidden group-hover:block" v-if="(user?.userRole === 'ADMIN' || user?.isSuperUser)">{{ appointment?.patient?.phone }}</span>
                <span class="text-xs hidden group-hover:block">{{ appointment?.service?.title }}</span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Appointment } from '@/types'
import { getTimeDifferenceInMilliseconds, timeToDecimal } from '~/constants';

const user = useUserData()
const emits = defineEmits(['select-item'])
const { appointment } = defineProps<{ appointment: Appointment }>()

const customStyle = computed(() => {
    const hour = timeToDecimal(String(appointment.startDate))
    const top =  (hour - 9) * 60
    // const top = (hour >= 14 ? (hour - 9) * 60 - 30 : (hour - 9) * 60)
    const height = (getTimeDifferenceInMilliseconds(String(appointment.endDate), String(appointment.startDate), appointment.id)/60000)
    
    return { height, top }
})
</script>