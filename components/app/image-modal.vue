<template>
    <div v-if="currentImage!==null" class="fixed top-0 left-0 w-full h-full z-[60] bg-black/50 flex justify-center items-center" @click="setImage(null)">
        <div class="absolute top-0 right-0 pr-1 pt-2">
            <app-btn @click="setImage(null)" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" class="mr-1" size="square">
                <ClCloseMd class="size-4" />
            </app-btn>
        </div>
        <app-image @click.stop :src="currentImage" no-modal class="!object-contain" />
    </div>
</template>

<script setup lang="ts">
import { ClCloseMd } from '@kalimahapps/vue-icons'

const { currentImage, setImage } = useImageModal()

onMounted(() => {
  window.addEventListener('keydown', e => {
    if(e.keyCode === 27) setImage(null)
  }, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('keypress', () => {})
})
</script>