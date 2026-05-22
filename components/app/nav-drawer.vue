<template>
    <div class="border z-30 bg-white fixed md:sticky top-0 h-[100vh] transition-all flex flex-col" :class="isOpen ? 'w-[250px]' : 'w-[57px]'">
        <div class="p-2 flex flex-col gap-1">
            <template v-for="link, i in ADMIN_LINKS[userData?.userRole as 'ADMIN']" :key="i">
                <div v-if="link.group" class="bg-gray-300 w-full h-[1px] my-2" />
                <nuxt-link v-else :to="link.url" class="px-2 py-2 rounded w-full overflow-hidden flex whitespace-nowrap items-center gap-6 transition-all text-gray-500 hover:bg-gray-400/20" exact-active-class="bg-primary-600 hover:bg-primary-700 text-white">
                    <div>
                        <component :is="link.icon" class="text-2xl" />
                    </div>
                    <span class="text-sm">{{ link.title }}</span>
                </nuxt-link>
            </template>
        </div>

        <button @click="isOpen = !isOpen" class="bg-white rounded-full w-[30px] h-[30px] text-gray-500 border cursor-pointer absolute top-[40%] right-[-15px] flex items-center justify-center">
            <BxSolidChevronRight class="transition-all relative flex items-center justify-center" :class="!isOpen ? 'transform rotate-0' : 'transform rotate-180'" />
        </button>
    </div>
</template>
    
<script setup lang="ts">
import { ADMIN_LINKS } from '@/constants'
import { BxSolidChevronRight } from "@kalimahapps/vue-icons"

const userData = useUserData()

const isOpen = ref(false)
</script>