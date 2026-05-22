<template>
    <div class="z-50 fixed bottom-2 right-2 px-0 flex flex-col items-end gap-2 container pointer-events-none">
        <transition-group name="alert">
            <div v-for="alert in alerts" :key="alert.id"
                :class="ALERT_COLORS[alert.type]"
                class="pointer-events-auto hover:pointer-events-none hover:opacity-40 max-w-[350px] border-l-4 bg-white flex items-center justify-between gap-3 rounded px-4 py-2 min-w-[200px] shadow-xl">
                <div class="flex items-center gap-2 hover:pointer-events-none">
                    <span class="text-balance text-base" v-html="alert.message"></span>
                </div>
                <button class="mt-0.5 pointer-events-auto" @click="removeAlert(alert.id)">
                    <AnFilledCloseCircle class="size-5" />
                </button>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { ALERT_COLORS } from '@/constants'
import { AnFilledCloseCircle } from '@kalimahapps/vue-icons'

const { removeAlert, alerts } = useAlert()
</script>

<style>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.2s ease;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>