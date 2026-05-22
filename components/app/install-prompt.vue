<template>
    <div v-if="shown" class="z-50 max-w-[320px] fixed bottom-2 right-2 px-4 py-3 shadow-md shadow-black/5 bg-white rounded-lg">
        <div>
            <h3 class="font-medium">Установить приложение</h3>
            <p class="text-gray-600 text-sm">Скачайте наше PWA-приложение для удобного управления клиникой прямо с вашего устройства</p>
            <div class="flex items-center justify-between gap-2 mt-2">
                <app-btn @click="installPWA()" size="small" class="flex-1">
                    <span>Скачать приложение</span>
                    <LuDownload class="size-4" />
                </app-btn>
                <app-btn @click="dismissPrompt()" class="!px-2" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="small">
                    <ClCloseMd class="size-4" />
                </app-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ClCloseMd, LuDownload } from '@kalimahapps/vue-icons'

const shown = ref(false)
const installEvent: any = ref()

onBeforeMount(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        installEvent.value = e;
        shown.value = true;
    })

    window.addEventListener('afterinstallprompt', (e) => {
        e.preventDefault();
        shown.value = false;
    })
});

const installPWA = () => {
    installEvent.value?.prompt();
    installEvent.value?.userChoice.then((choice: any) => {
        dismissPrompt();

        if (choice.outcome === 'accepted') {
            console.log('installllllllll');
        } else {
            console.log('declineeeeeeeeeed');
        }
    })
}

const dismissPrompt = () => {
    shown.value = false;
}
</script>