<template>
    <div class="absolute z-0 w-full h-full">
        <client-only>
            <transition-group name="slider-animation" appear>
                <template v-for="img,index in images" :key="index">
                    <nuxt-img v-if="currentIndex === index"
                        class="w-full h-full object-cover opacity-15 absolute" :src="img" width="100%" alt="image" />
                </template>
            </transition-group>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const images = [
    '/images/landing-1_13_11zon.webp',
    '/images/DSCF1007_4_11zon_4_11zon.webp',
    '/images/DSCF1082_8_11zon_8_11zon.webp',
]
let interval: any = null;
const currentIndex = ref(0);

const startSlider = () => {
    interval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length;
    }, 5000);
};

const stopSlider = () => {
    clearInterval(interval)
};

// onMounted(() => {
//     startSlider();
// })

// onBeforeUnmount(() => {
//     stopSlider();
// })
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