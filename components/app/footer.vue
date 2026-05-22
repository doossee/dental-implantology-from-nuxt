<template>
    <footer class="bg-slate-900">
        <div class="bg-[#15203B] w-full">
            <div class="container py-4 flex justify-between items-center">
                <a href="#" aria-label="Logo link for redirect home page" class="hidden md:block">
                    <nuxt-img src="/logo.svg" width="160" height="auto" sizes="(max-width: 767px) 140px, 180px" alt="Logo" />
                </a>
    
                <div class="flex items-center gap-2">
                    <p class="text-white">{{ $t('footer.subtitle-2') }}</p>
                    <a class="hidden md:inline-flex py-3 px-4 text-xs items-center justify-center gap-x-2 font-semibold rounded disabled:opacity-50 disabled:pointer-events-none border-2 border-transparent bg-primary-600 hover:bg-primary-500 active:bg-primary-400 text-white" href="tel:+998915233344">
                        {{ $t('nav.call') }}
                    </a>
                </div>
            </div>
        </div>

        <div class="container pt-12 pb-12 md:pb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

            <div class="grid gap-4">
                <div class="text-white font-bold text-xl">
                    Dental Implantology Center
                </div>

                <p class="text-white font-light">{{ $t('footer.subtitle') }}</p>

                <div class="flex flex-col gap-2">
                    <a v-for="link in SITE_LINKS" :key="link.url" class="font-normal hover:underline text-white text-sm flex items-center gap-4" :href="link.url">
                        <component :is="link.icon" class="size-4" />
                        <span>{{ $t(link.title) }}</span>
                    </a>
                    <nuxt-link class="font-normal hover:underline text-white text-sm flex items-center gap-4" href="/admin">
                        <BxLockOpen class="size-4" />
                        <span>Admin</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="grid gap-4">
                <h1 class="font-bold text-white text-xl">{{ $t('footer.concats-title') }}:</h1>

                <div>
                    <h2 class="text-white">{{ $t('form.phone') }}:</h2>

                    <ul class="grid gap-2 text-sm list-disc p-4">
                        <li class="text-white hover:underline text-nowrap">
                            <a href="tel:+998915233344">+998&nbsp;91&nbsp;523&nbsp;33&nbsp;44</a>
                        </li>

                        <li class="text-white hover:underline text-nowrap">
                            <a href="tel:+998662350005">+998&nbsp;66&nbsp;235&nbsp;00&nbsp;05</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-white">{{ $t('form.email') }}:</h2>
                    <ul class="grid gap-2 text-sm list-disc p-4">
                        <li class="text-gray-300 transition hover:opacity-75 text-nowrap">
                            <a href="mailto:dr.ikramov@gmail.com">dr.ikramov@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="grid gap-4">
                <h1 class="font-bold text-white text-xl">{{ $t('footer.social-links') }}</h1>
                
                <p class="text-white font-light">{{ $t('footer.social-text') }}</p>

                <div class="flex items-center gap-4">
                    <a v-for="sc,i in SOCIAL_LINKS" class="p-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white" :key="i" target="_blank" :href="sc.link">
                        <component :is="sc.icon" />
                    </a>
                </div>
            </div>

            <div class="grid gap-4">
                <iframe width="100%" height="200px" class="rounded mb-4" id="gmap_canvas"
                    src="https://maps.google.com/maps?q=39.653550,66.97005&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                </iframe>

                <a class="text-white underline text-sm flex items-center gap-2" href="https://maps.app.goo.gl/jvA5nAwTy3jL4oe2A" target="_blank">
                    <BxSolidMap class="size-4" />
                    <span>{{ $t('footer.address') }}</span>
                </a>
            </div>
        
        </div>
    </footer>
</template>

<script setup lang="ts">
import { SITE_LINKS, SOCIAL_LINKS } from '@/constants'
import { BxSolidMap, BxLockOpen } from '@kalimahapps/vue-icons'
</script>