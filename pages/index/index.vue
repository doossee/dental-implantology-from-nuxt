<template>
    <header class="bg-[#F1F8FF] flex items-center min-h-screen">
        
        <div class="container relative pt-24 pb-10">
            <svg-tooth class="absolute" />
            <svg-tools class="absolute bottom-80 md:bottom-44 right-0" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative mb-4 md:mb-0">

                <div class="hidden md:flex px-0 lg:px-20 items-end relative">
                    <div class="flex justify-center items-end">
                        <svg-doctor-back class="absolute scale-[75%] object-bottom translate-y-20 z-0" />
                        <nuxt-img src="/images/dr-ikramov.png" class="w-[360px] h-[460px] relative object-contain object-bottom" alt="Dr. Ikramov" />
                    </div>
                    <div class="absolute top-10 right-10 rounded-xl w-[240px] h-[130px] p-6 pr-2 flex justify-start items-center shadow-lg shadow-primary-600/10 bg-white/45 backdrop-blur-sm">
                        <p class="font-semibold text-lg relative text-left" v-html="$t('home.header-every-day-work', {br: '<br>', tag: '<span class=\'text-primary-600\'>', tagclose: '</span>'})">
                        </p>
                        <svg-24-7 class="absolute z-0 right-4" />
                    </div>
                </div> 

                <div class="text-center sm:text-left relative z-20">
                    <app-content :subtitle="$t('home.header-subtitle')" />
                    <h1 style="line-height: 1.2;" class="text-2xl md:text-4xl font-extrabold font-manarope mt-4 relative" v-html="$t('home.header-title', { tag: '<br>', svg: '<span draw-line></span>' })"></h1>
                    <p class="text-gray-700 text-sm md:text-base mt-4" v-html="$t('home.header-description')"></p>
                </div>

            </div>

            <div class="relative">
                <form @submit.prevent="handleRecord" class="relative rounded-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end bg-white w-full">
                    <app-input v-model="record.firstName" :icon="BxUser" :label="$t('form.name')" :attributes="{ required: true, placeholder: $t('form.placeholder-name')}" />
                    <app-input v-model="record.phone" v-mask="'+############'" :icon="FePhone" :label="$t('form.phone')" :attributes="{ required: true, placeholder: $t('form.placeholder-phone')}" />
                    <app-btn type="submit">{{ $t('form.order-call') }}</app-btn>
                </form>
            </div>
        </div>
        
    </header>

    <main>
        <section class="py-10 container">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                <div class="p-4 flex flex-col text-center items-center"  v-for="card,i in INDEX_CARDS" :key="i">
                    <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                        <component class="text-blue-600 w-10 h-10 group-hover:text-white" :is="card.icon"></component>
                    </div>
                    <div class="flex-grow">
                        <h1 class="text-gray-900 text-lg title-font font-medium mb-3">{{ $t(card.title) }}</h1>
                        <p class="leading-relaxed text-sm">{{ $t(card.description) }}</p>
                    </div>
                </div>

            </div>
        </section>

        <section class="pt-24 pb-20 container" id="about">
            <div class="h-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                <app-slider :images="SLIDER_IMAGES" />
                <div class="w-full text-center sm:text-left">
                    <app-content
                        :subtitle="$t('about.subtitle')"
                        :title="$t('home.home-about-us-title')">
                        <p>{{ $t('about.description-2') }}</p>
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="text-left flex items-center gap-2" v-for="i in 4" :key="i">
                                <div>
                                    <BxSolidBadgeCheck class="text-blue-500 w-6 h-6" />
                                </div>
                                <span class="font-medium">{{ $t('home.home-about-us-item-'+i) }}</span>
                            </div>
                        </div>
                    </app-content>
                </div>
            </div>
        </section>

        <section class="py-0 container">
            <div class=" bg-blue-50 p-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div class="flex items-center gap-4" v-for="c,i in INDEX_STATISTICS" :key="i">
                    <div class="bg-primary-400 rounded p-4">
                        <component class="text-white w-9 h-9" :is="c.icon"></component>
                    </div>
                    <div>
                        <h1 class="font-bold text-2xl md:text-3xl">{{ (c.count).toLocaleString('en-US') }}<span class="text-blue-500">+</span></h1>
                        <p class="text-gray-600">{{ $t(c.title) }}</p>
                    </div>
                </div>

            </div>
        </section>

        <section class="pt-24 pb-12 container" id="services">
            <div class="flex flex-col text-center w-full mb-16">
                <div class="mb-2 flex items-center flex-col gap-2">
                    <svg-subtitle-tooth />
                    <span class="text-primary-500 text-sm font-semibold">{{ $t('services.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('services.popular-title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-sm">{{ $t('services.description') }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <card-service2 v-for="service,i in SERVICES" :item="service" :key="i" />
            </div>
            <div class="flex justify-center pt-12">
                <nuxt-link to="/services" class="text-primary-600 bg-primary-100 hover:bg-primary-200 px-6 py-2.5 rounded-md text-sm font-bold flex items-center gap-2">
                    {{ $t('services.all-services') }}
                    <AkChevronRightSmall class="size-5" />
                </nuxt-link>
            </div>
        </section>

        <section class="py-24 container" id="doctors">
            <div class="flex flex-col text-center w-full mb-10">
                <div class="mb-2 flex items-center flex-col gap-2">
                    <svg-subtitle-tooth />
                    <span class="text-primary-500 text-sm font-semibold">{{ $t('doctors.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('doctors.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-sm">{{ $t('doctors.description') }}</p>
            </div>

            <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            
                <card-doctor v-for="doctor,i in doctors" :doctor="doctor" :key="i" />
                
            </div>
        </section>

        <section class="pb-12 container">
            <div class="bg-blue-50 rounded-lg p-8">

                <div class="w-full">
                    <app-content
                        :subtitle="''"
                        :title="$t('home.home-jumbotron-title')"
                        :description="$t('home.home-jumbotron-description')">
                    </app-content>
                    
                </div>

            </div>
        </section>

        <section class="pt-12 container">
            <div class="flex flex-col text-center w-full mb-8">
                <div class="mb-2 flex items-center flex-col gap-2">
                    <svg-subtitle-tooth />
                    <span class="text-primary-500 text-sm font-semibold">{{ $t('home.home-faqs-subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('home.home-faqs-title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-sm">{{ $t('home.home-faqs-description') }}</p>
            </div>
            
            <app-faqs />
        </section>

        <section class="py-24 container" id="contacts">           

            <div class="bg-[#f1f8ff] md:mt-16 rounded-2xl p-6 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                <svg-tooth class="absolute z-0 bottom-5 left-[25%] -rotate-45 scale-90" />
                <svg-tools class="absolute bottom-32 left-[44%]" />
                <app-content
                    :subtitle="$t('contacts.form-title')"
                    :title="$t('contacts.title')"
                    :description="$t('contacts.description')">
                    <form @submit.prevent="handleRecord" class="md:w-[60%] mt-2 relative grid gap-4">
                        <app-input v-model="record.firstName" :attributes="{ required: true, placeholder: $t('form.placeholder-name') }" />
                        <app-input v-model="record.phone" v-mask="'+############'" :attributes="{ required: true, placeholder: $t('form.placeholder-phone'), 'v-mask': '#############' }" />
                        <app-btn type="submit">{{ $t('form.order-call') }}</app-btn>
                    </form>
                </app-content>
                <div class="relative w-full hidden md:block">
                    <nuxt-img class="relative md:absolute -bottom-10 h-[135%] w-[135%] object-contain" src="/images/DSCF0029.webp" />
                </div>

            </div>

        </section>
    </main>
</template>

<script setup lang="ts">
import type { InitialRecord } from '@/types'
import { INDEX_CARDS, INDEX_STATISTICS, SLIDER_IMAGES, SERVICES } from '@/constants'
import { BxSolidBadgeCheck, BxUser, FePhone, AkChevronRightSmall, } from '@kalimahapps/vue-icons'

useHead({
    title: "Стоматология Dental Implantology - Ваш путь к здоровой улыбке",
    meta: [
        { name: "description", content: "Добро пожаловать в стоматологическую клинику \"Dental Implantology\". Мы предлагаем широкий спектр стоматологических услуг для всей семьи в Самарканд." },
        { name: "keywords", content: "стоматология, стоматологическая клиника, зубной врач, лечение зубов, Samarkand" },
    ]
})

definePageMeta({
    middleware: 'pwa',
    layout: 'home-layout',
})

const { pushAlert } = useAlert()
const { getPublishedDoctors } = useUsers()
const { createRecord } = useInitialRecords()

const doctors = ref<any[]>([])
const record = reactive<Partial<InitialRecord>>({
    notes: "",
    phone: "",
    lastName: "",
    firstName: "",
})

const handleGetDoctors = async () => {
    try {
        const data = await getPublishedDoctors()
        doctors.value = data as any
    } catch (error) {
        console.log(error)
    }
}

const handleRecord = async () => {
    try {
        const name = record.firstName?.split(' ')

        await createRecord({...record, firstName: name![0], lastName: name![0] || 'Patient' })
        pushAlert('Успешно отправлено', 'SUCCESS')
    } catch (error) {
        pushAlert('Ошибка при отправке!', 'WARNING')
    } finally {
        Object.assign(record, {
            notes: "",
            phone: "",
            lastName: "",
            firstName: "",
        })
    }
}

onMounted(() => {
    handleGetDoctors()
})
</script>