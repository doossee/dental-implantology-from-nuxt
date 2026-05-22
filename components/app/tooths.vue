<template>
    <div class="w-full bg-white py-4 rounded border my-2 relative" id="tooth-items">
        <div class="w-full flex justify-center items-center overflow-x-auto" ref="toothBlock">

            <div class="w-full pl-6 grid gap-y-6">
        
                <div class="flex items-center justify-between gap-4 w-full" v-for="nums,i in toothNums" :key="i">
        
                    <div v-for="num,j in nums" :key="j" class="cursor-pointer flex items-center flex-col gap-2 relative group yellow-svg-hover"
                        @click="handleOpenCondition($event, num)">
                        <div class="w-[60px] h-[70px]">
                            <img :src="`/teeth/tooth-${num}.svg`" class="w-full h-full" :class="{'red-svg': tooth(num)?.condition.length! > 0}">
                        </div>
                        <span :class="tooth(num)?.condition.length!>0 ? 'text-[#f50000]' : 'text-[#b6c5da]'">
                            {{ num }}
                        </span>
                    </div>
        
                </div>
        
            </div>

        </div>

        <div v-on-click-outside="handleCloseCondition" v-if="opened&&tooth(opened)?.id" v-show="opened" class="absolute bg-white shadow-md p-2 rounded z-10 max-w-[200px] flex flex-col gap-2" :style="{ top: cPosition.y + 'px', left: cPosition.x + 'px' }">
            <app-btn @click="emits('openTooth', opened)" class="w-full" size="small">Смотреть осмотры</app-btn>
            <app-btn @click="emits('conditionTooth', tooth(opened)?.id, tooth(opened)?.condition||[]),handleCloseCondition()" class="w-full" size="small">Добавить осмотр</app-btn>
            <app-switch small v-for="m,i in THERAPY_MAP" :key="i" :label="m.title" :value="m.value" v-model="tooth(opened)!.condition" />
        </div>
    </div>
</template>

<script setup lang="ts">
import isEqual from 'lodash/isEqual'
import type { Tooth } from '@/types'
import { vOnClickOutside } from '@vueuse/components'
import { TOOTH_NUMBERS, KIDS_TOOTH_NUMBERS, THERAPY_MAP, ALERT_MESSAGES } from '@/constants'

const { pushAlert } = useAlert()
const { updateTeeth } = useTeeth()
const emits = defineEmits(['openTooth', 'conditionTooth'])
const { teeth, kid } = defineProps<{ teeth: Tooth[], kid: boolean }>()

const cPosition = ref({ x: 0, y: 0 })
const cConditions = ref<string[]>([])
const opened = ref<number|null>(null)
const toothBlock = ref<HTMLDivElement|null>()

const toothNums = computed(() => {
    const t = kid ? KIDS_TOOTH_NUMBERS : TOOTH_NUMBERS
    return [
        [...t[0], ...t[1]],
        [...t[2], ...t[3]],
    ]
})

const tooth = (num: number) => {
    return teeth.find(te => te.num === num)
}

const handleOpenCondition = (event: MouseEvent, num: number) => {
    if(opened.value === num) return handleClose()

    opened.value = num
    cConditions.value = [...(tooth(num)?.condition || [])]

    const parentRect = (event.target as any)?.closest('#tooth-items')?.getBoundingClientRect();

    const d = Math.floor((event.clientX - parentRect.left)*100/window.innerWidth)
    const f = window.innerWidth > 736 ? 77 : 45

    cPosition.value = { x: event.clientX - parentRect.left - (d < f ? 0 : 180), y: event.clientY - parentRect.top + 20 }
}

const handleCloseCondition = async () => {
    try {
        if(opened.value && !isEqual(tooth(opened.value)?.condition, cConditions.value)) {
            await updateTeeth(tooth(opened.value)?.id!, { condition: tooth(opened.value)?.condition} )
            pushAlert(ALERT_MESSAGES.DATA_UPDATED, 'SUCCESS')
        }
    
        handleClose()
    } catch(error) {
        console.log(error)
    }
}

const handleClose = () => {
    opened.value = null
    cConditions.value = []
    cPosition.value = { x: 0, y: 0 }
}

onMounted(() => {
    if(toothBlock.value) {
        toothBlock.value.scrollLeft = (toothBlock.value.scrollWidth - toothBlock.value.clientWidth) / 2
    }
})
</script>