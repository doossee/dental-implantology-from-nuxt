<template>
    <nav class="fixed z-50 w-full transition-all" :class="isScrolled?'bg-white':'bg-white/0'">
        <div class="container mx-auto py-4">
            <div class="flex items-center justify-between">
                <a href="#" aria-label="Logo link for redirect home page">
                    <nuxt-img src="/logo.svg" width="140" height="auto" sizes="(max-width: 767px) 140px, 180px" alt="Logo" />
                </a>

                <div class="hidden md:flex gap-8">
                    <template v-for="link in SITE_LINKS" :key="link.url">
                        <template v-if="route.path === '/'">
                            <a class="hover:text-primary-500 font-semibold text-gray-500 text-sm" :href="link.url">
                                {{ $t(link.title) }}
                            </a>
                        </template>
                        <template v-else>
                            <nuxt-link class="hover:text-primary-500 font-semibold text-gray-500 text-sm" :to="'/'+link.url">
                                {{ $t(link.title) }}
                            </nuxt-link>
                        </template>
                    </template>
                </div>
                
                <div class="flex items-center gap-2">
                    <a class="hidden md:inline-flex py-2 px-3 text-xs items-center justify-center gap-x-2 font-semibold rounded disabled:opacity-50 disabled:pointer-events-none border-2 border-transparent bg-primary-600 hover:bg-primary-500 active:bg-primary-400 text-white" href="tel:+998915233344">
                        {{ $t('nav.call') }}
                    </a>
                    <app-language />
                </div>
            </div>
        </div>

        <div class="bottom-0 left-0 fixed w-full border-t bg-white z-10 md:hidden">
            <div class="container py-4">
                <div class="relative flex justify-end">
                    <a href="tel:+998915233344" aria-label="Phone link" class="shadow-lg absolute -top-20 animate-bounce inline-flex p-2 text-sm items-center justify-center gap-x-2 font-semibold rounded disabled:opacity-50 disabled:pointer-events-none border-2 border-transparent bg-primary-600 hover:bg-primary-500 active:bg-primary-400 text-white">
                        <CaPhoneFilled class="size-8" />
                    </a>
                </div>
                <div class="grid grid-cols-5 gap-4">
                    <a v-for="link in SITE_LINKS" :key="link.url" :class="{'text-primary-600':link.url===route.path}" class="hover:text-primary-500 font-normal text-xs flex flex-col text-nowrap text-ellipsis gap-1 items-center" :href="link.url">
                        <component :is="link.icon" class="size-6" />
                        {{ $t(link.title) }}
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { SITE_LINKS } from '~/constants'
import { CaPhoneFilled } from '@kalimahapps/vue-icons'

const route = useRoute()
const isScrolled = ref(false)

onMounted(() => {
    window.scrollY > 0 && (isScrolled.value = true)

    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 0
    })
})
</script>

<style>
html {
    scroll-behavior: smooth
}
</style>