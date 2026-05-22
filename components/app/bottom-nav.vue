<template>
    <div>
        <div class="bottom-0 left-0 fixed w-full border-t bg-white z-10 md:hidden">
            <div class="container py-4">
                <div class="grid grid-cols-3 gap-4">
                    <nuxt-link v-for="link in ADMIN_LINKS['DOCTOR']" :key="link.url" :exact-active-class="'text-primary-600'" class="hover:text-primary-500 text-gray-500 font-normal text-xs flex flex-col text-nowrap text-ellipsis gap-1 items-center" :to="link.url">
                        <component :is="link.icon" class="size-6" />
                        {{ link.title }}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ADMIN_LINKS } from '@/constants'
</script>