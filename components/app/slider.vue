<template>
    <div class="w-full h-full relative rounded overflow-hidden">
        <client-only>
            <transition-group name="slider-animation" appear>
                <template v-for="img,index in images" :key="index">
                    <nuxt-img v-if="currentIndex === index"
                        class="w-full h-full object-cover absolute" :src="img" width="100%" alt="image" />
                </template>
            </transition-group>
            <div class="p-2 absolute bottom-0 right-0 flex items-center gap-2">
                <app-btn size="square" @click="prevSlide">
                    <AkChevronLeft class="size-6" />
                </app-btn>
                <app-btn size="square" @click="nextSlide">
                    <AkChevronRight class="size-6" />
                </app-btn>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
import {
    AkChevronLeft,
    AkChevronRight,
} from '@kalimahapps/vue-icons'

const props = defineProps<{
    images: string[]
}>()

let interval: any = null
const currentIndex = ref(0)

const startSlider = () => {
    interval = setInterval(() => nextSlide(), 5000)
}

const stopSlider = () => {
    clearInterval(interval)
}

const nextSlide = () => {
    currentIndex.value++
    if(currentIndex.value > props.images.length - 1)
        currentIndex.value = 0
}

const prevSlide = () => {
    currentIndex.value--
    if(currentIndex.value < 0)
        currentIndex.value = props.images.length - 1
}

onMounted(() => {
    startSlider()
})

onBeforeUnmount(() => {
    stopSlider()
})
</script>

<style>
.slider-animation-enter-active,
.slider-animation-leave-active {
    transition: opacity 1s;
}

.slider-animation-enter-from,
.slider-animation-leave-to {
    opacity: 0;
}
</style>