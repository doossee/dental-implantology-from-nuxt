<template>
    <img :src="image" :class="props.class" alt="" @click="handleShowImage()">
</template>

<script setup lang="ts">
const { $config } = useNuxtApp()
const { setImage } = useImageModal()

const props = defineProps<{src?: string | null | undefined, class?: string, noModal?: boolean}>()

const image = computed(() => {
    if(props.src && props.src.startsWith('blob:')) return props.src
    if(props.src) return `${$config.public.api_url}${props.src}`
    return '/images/nophoto.jpg'
})

const handleShowImage = () => {
    if(!props.src || props.noModal) return

    setImage(props.src)
}
</script>