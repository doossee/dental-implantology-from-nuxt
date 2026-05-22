<template>
    <nuxt-layout name="home-layout">
        <div class="container text-center h-screen flex justify-center items-center flex-col gap-3">
            <h1 class="text-8xl text-primary-700 font-extrabold flex">
                <span>4</span>
                <span><HeFilledTooth/></span>
                <span>4</span>
            </h1>
            <h2 class="text-2xl">{{ $t('404.title') }}</h2>
            <p class="max-w-[500px]">{{ $t('404.description') }}</p>
            <nuxt-link to="/">
                <app-btn size="medium">{{ $t('404.go-home') }}</app-btn>
            </nuxt-link>
        </div>
    </nuxt-layout>
</template>

<script setup lang="ts">
import { HeFilledTooth } from '@kalimahapps/vue-icons'
</script>