<template>
  <transition name="fade">
    <div v-if="model" @click="model=false,$emit('close-dialog')" class="fixed p-4 flex items-center z-50 justify-center w-full h-full top-0 left-0 bottom-0 right-0 bg-black/20 backdrop-blur-sm transition">
      <div :class="props.rounded?'rounded':'rounded-3xl'" :style="{'max-width': (maxWidth ? maxWidth : 600) + 'px'}" class="bg-white border p-4 overflow-auto max-h-[95vh] w-full scrollbar-hide" @click.stop>
        <div class="flex justify-between items-center">
          <h1 class="text-primary-600 font-normal text-xl">{{ props.title || 'App Dialog' }}</h1>
          <button @click="model=false,$emit('close-dialog')" aria-label="close" aria-labelledby="close-dialog">
            <GlClose class="w-6 h-6 text-red-500" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { GlClose } from '@kalimahapps/vue-icons'
import { onBeforeUnmount, onMounted, defineEmits } from 'vue'

const model = defineModel()
const emits = defineEmits(['close-dialog'])
const props = defineProps<{title?: string, rounded?: boolean, maxWidth?: string}>()

onMounted(() => {
  window.addEventListener('keydown', e => {
    if(e.keyCode === 27) emits('close-dialog')
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keypress', () => {})
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>