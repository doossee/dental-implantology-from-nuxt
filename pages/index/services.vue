<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 mx-auto">
            <div class="flex flex-col text-center w-full">
                <div class="mb-2 flex items-center flex-col gap-2">
                    <svg-subtitle-tooth />
                    <span class="text-primary-500 text-sm font-semibold">{{ $t('services.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('services.list-of-services') }}</h1>
            </div>
        </div>
    </section>

    <div class="relative container py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <card-service v-for="item,i in items" :item="item" :key="i" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Procedure } from '~/types'

definePageMeta({
    middleware: 'pwa',
    layout: 'home-layout',
})

useHead({
    title: "Наши услуги - Стоматология \"Dental Implantology\"",
    meta: [
        { name: "description", content: "Предлагаем широкий спектр стоматологических услуг: лечение кариеса, имплантация, отбеливание зубов и многое другое. Узнайте больше о наших услугах." },
        { name: "keywords", content: "стоматологические услуги, лечение зубов, имплантация, отбеливание зубов" },
    ]
})

useSeoMeta({
  title: 'Наши услуги - Стоматология "Dental Implantology"',
  ogTitle: 'Наши услуги - Стоматология "Dental Implantology"',
  description: 'Предлагаем широкий спектр стоматологических услуг: лечение кариеса, имплантация, отбеливание зубов и многое другое. Узнайте больше о наших услугах.',
  ogDescription: 'Предлагаем широкий спектр стоматологических услуг: лечение кариеса, имплантация, отбеливание зубов и многое другое. Узнайте больше о наших услугах.',
})

const { getProcedures } = useProcedures()
const items = ref<Procedure[]>([])

const init = async () => {
    const { data } = await getProcedures({page: 1, perPage: 100, isPublic: 'true'})
    items.value = data as any 
}

await init()
</script>