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
                <form @submit.prevent="handleRecord(quickRecord, quickDetails)" class="relative w-full rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(27,91,143,0.12)] backdrop-blur md:p-7">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <app-input
                            v-model="quickRecord.firstName"
                            :icon="BxUser"
                            :label="$t('form.full-name')"
                            :attributes="{ required: true, placeholder: $t('form.full-name-placeholder') }" />
                        <app-input
                            v-model="quickRecord.phone"
                            v-mask="'+998 ## ### ## ##'"
                            :icon="FePhone"
                            :label="$t('form.phone')"
                            :attributes="{ required: true, placeholder: '+998 XX XXX XX XX' }" />
                        <app-select
                            v-model="quickDetails.service"
                            :label="$t('form.service')"
                            :items="serviceOptions"
                            :placeholder="$t('form.service-placeholder')" />
                        <div class="pt-0 md:pt-0 xl:pt-0">
                            <span class="hidden md:block xl:hidden opacity-0 mb-2">*</span>
                            <app-btn :disabled="isSubmitting" type="submit" class="w-full rounded-full py-2! xl:mt-7">
                                {{ isSubmitting ? $t('form.submitting') : $t('form.submit') }}
                            </app-btn>
                        </div>
                    </div>
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
            <div class="overflow-hidden rounded-[2rem] bg-[#1297cc] shadow-[0_30px_80px_rgba(11,76,116,0.24)]">
                <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(480px,520px)]">

                    <!-- Left info panel -->
                    <div class="relative overflow-hidden bg-[linear-gradient(180deg,#4e8fc6_0%,#437daf_100%)] px-8 py-10 md:px-12 md:py-14">
                        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_42%)]"></div>
                        <div class="absolute inset-y-0 right-0 hidden w-px bg-white/20 lg:block"></div>
                        <div class="relative z-10 flex h-full flex-col justify-center gap-8 text-white">
                            <nuxt-img src="/logo.svg" alt="Dental Implantology" class="w-full max-w-[280px] object-contain brightness-0 invert" />
                            <div class="space-y-4">
                                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{{ $t('form.contact-kicker') }}</p>
                                <h2 class="text-2xl font-bold leading-snug md:text-3xl">{{ $t('form.contact-side-title') }}</h2>
                                <p class="text-sm leading-7 text-white/80">{{ $t('form.contact-side-description') }}</p>
                            </div>
                            <ul class="space-y-3 text-sm text-white/90">
                                <li class="flex items-center gap-3">
                                    <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                                        <FeMapPin class="w-4 h-4 text-white" />
                                    </span>
                                    <span>{{ $t('footer.address') }}</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <a href="tel:+998915233344" class="flex items-center gap-3">
                                        <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                                            <FePhone class="w-4 h-4 text-white" />
                                        </span>
                                        <span>{{ $t('form.contact-phone') }}</span>
                                    </a>
                                </li>
                                <li class="flex items-center gap-3">
                                    <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                                        <FeClock class="w-4 h-4 text-white" />
                                    </span>
                                    <span>{{ $t('form.contact-hours') }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Right form panel -->
                    <div class="bg-white px-6 py-8 md:px-10 md:py-12">
                        <div class="mb-6 space-y-2">
                            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{{ $t('form.contact-kicker') }}</p>
                            <h3 class="text-2xl font-semibold text-slate-800">{{ $t('form.contact-title') }}</h3>
                            <p class="text-sm leading-6 text-slate-500">{{ $t('form.contact-description') }}</p>
                        </div>
                        <form @submit.prevent="handleRecord(contactRecord, contactDetails)" class="grid gap-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <app-input
                                    v-model="contactRecord.firstName"
                                    :label="$t('form.full-name')"
                                    :attributes="{ required: true, placeholder: $t('form.full-name-placeholder') }" />
                                <app-input
                                    v-model="contactRecord.phone"
                                    v-mask="'+998 ## ### ## ##'"
                                    :label="$t('form.phone')"
                                    :attributes="{ required: true, placeholder: '+998 XX XXX XX XX' }" />
                            </div>
                            <app-select
                                v-model="contactDetails.service"
                                :label="$t('form.service')"
                                :items="serviceOptions"
                                :placeholder="$t('form.service-placeholder')" />
                            <app-textarea
                                v-model="contactDetails.comment"
                                :label="$t('form.comment')"
                                :placeholder="$t('form.comment-placeholder')"
                                :rows="4" />
                            <app-btn :disabled="isSubmitting" type="submit" class="mt-2 w-full rounded-full !py-3.5">
                                {{ isSubmitting ? $t('form.submitting') : $t('form.submit') }}
                            </app-btn>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import type { InitialRecord } from '@/types'
import { INDEX_CARDS, INDEX_STATISTICS, SLIDER_IMAGES, SERVICES } from '@/constants'
import { BxSolidBadgeCheck, BxUser, FePhone, FeMapPin, FeClock, AkChevronRightSmall, } from '@kalimahapps/vue-icons'

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
const { locale, t } = useI18n()
const { getPublishedDoctors } = useUsers()

type RecordFormState = Partial<InitialRecord>
type ContactDetails = {
    service: string
    comment: string
}

const createRecordState = (): RecordFormState => ({
    notes: "",
    phone: "",
    lastName: "",
    firstName: "",
})

const createContactDetailsState = (): ContactDetails => ({
    service: "",
    comment: "",
})

const doctors = ref<any[]>([])
const isSubmitting = ref(false)
const quickRecord = reactive<RecordFormState>(createRecordState())
const quickDetails = reactive<ContactDetails>(createContactDetailsState())
const contactRecord = reactive<RecordFormState>(createRecordState())
const contactDetails = reactive<ContactDetails>(createContactDetailsState())

const amoCrmConfig = {
    action: 'https://forms.amocrm.ru/queue/add',
    formId: '1708402',
    hash: 'f8ed49cca7d075bac68488605ce95abb',
    fields: {
        name: 'fields[name_1]',
        phone: 'fields[780425_1][1201281]',
        birthDate: 'fields[780475_2]',
        service: 'fields[780477_2]',
        note: 'fields[note_2]',
    },
}

const serviceOptions = computed(() => SERVICES.map((service) => {
    const localizedTitle = service.title[locale.value as keyof typeof service.title] || service.title.uz
    const amoMap: Record<string, string> = {
        'Tish oldirish': '1201315',
        'Pulpa bilan davolash': '1201317',
        'Kariyesni davolash': '1201319',
        'Tish implantatsiyasi': '1201321',
        'Protezlash': '1201323',
        'Braket tizimi': '1201325',
        'Ultratovush yordamida tishlarni tozalash': '1201327',
    }

    return {
        name: localizedTitle,
        value: amoMap[service.title.uz] || '',
    }
}).filter((service) => !!service.value))

const getDefaultService = () => {
    const consultationKeywords = ['konsultatsiya', 'консультац', 'consultation']
    const found = serviceOptions.value.find(s =>
        consultationKeywords.some(kw => s.name.toLowerCase().includes(kw))
    )
    return found?.value || serviceOptions.value[0]?.value || ''
}

const resetRecord = (form: RecordFormState) => {
    Object.assign(form, createRecordState())
}

const resetContactDetails = () => {
    Object.assign(contactDetails, { ...createContactDetailsState(), service: getDefaultService() })
}

const resetQuickDetails = () => {
    Object.assign(quickDetails, { ...createContactDetailsState(), service: getDefaultService() })
}

const buildNotes = (details?: Partial<ContactDetails>) => {
    const parts = [
        details?.comment?.trim() ? `${t('form.note-comment')}: ${details.comment.trim()}` : '',
    ].filter(Boolean)

    return parts.join('\n')
}

const ensureAmoCrmTarget = () => {
    const existing = document.getElementById('amo-crm-submit-frame') as HTMLIFrameElement | null
    if (existing) return existing

    const iframe = document.createElement('iframe')
    iframe.id = 'amo-crm-submit-frame'
    iframe.name = 'amo-crm-submit-frame'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    return iframe
}

const appendHiddenField = (form: HTMLFormElement, name: string, value: string) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
}

const submitToAmoCrm = (payload: { name: string, phone: string, service?: string, note?: string }) => {
    if (!amoCrmConfig.hash || !amoCrmConfig.fields.phone) {
        pushAlert('Не удалось инициализировать amoCRM форму', 'WARNING')
        return false
    }

    ensureAmoCrmTarget()

    const nativeForm = document.createElement('form')
    nativeForm.method = 'POST'
    nativeForm.action = amoCrmConfig.action
    nativeForm.target = 'amo-crm-submit-frame'
    nativeForm.style.display = 'none'

    appendHiddenField(nativeForm, amoCrmConfig.fields.name, payload.name)
    appendHiddenField(nativeForm, amoCrmConfig.fields.phone, payload.phone)
    if (amoCrmConfig.fields.service && payload.service) {
        appendHiddenField(nativeForm, amoCrmConfig.fields.service, payload.service)
    }
    if (amoCrmConfig.fields.note && payload.note) {
        appendHiddenField(nativeForm, amoCrmConfig.fields.note, payload.note)
    }
    appendHiddenField(nativeForm, 'form_id', amoCrmConfig.formId)
    appendHiddenField(nativeForm, 'hash', amoCrmConfig.hash)
    appendHiddenField(nativeForm, 'user_origin', window.location.href)

    document.body.appendChild(nativeForm)
    nativeForm.submit()
    nativeForm.remove()

    return true
}

const handleGetDoctors = async () => {
    try {
        const data = await getPublishedDoctors()
        doctors.value = data as any
    } catch (error) {
        console.log(error)
    }
}

const handleRecord = async (form: RecordFormState = quickRecord, details?: Partial<ContactDetails>) => {
    isSubmitting.value = true
    let isSubmitted = false

    try {
        const fullName = form.firstName?.trim() || ''
        const [firstName = '', ...lastNameParts] = fullName.split(/\s+/).filter(Boolean)
        const preparedNotes = [form.notes?.trim(), buildNotes(details)].filter(Boolean).join('\n')

        isSubmitted = submitToAmoCrm({
            name: [firstName, ...lastNameParts].filter(Boolean).join(' '),
            phone: form.phone?.trim() || '',
            service: details?.service || undefined,
            note: preparedNotes || undefined,
        })
        if (!isSubmitted) return
        pushAlert('Успешно отправлено', 'SUCCESS')
    } catch (error) {
        pushAlert('Ошибка при отправке!', 'WARNING')
    } finally {
        if (isSubmitted) {
            resetRecord(form)
            if (form === contactRecord) {
                resetContactDetails()
            }
            if (form === quickRecord) {
                resetQuickDetails()
            }
        }
        isSubmitting.value = false
    }
}

onMounted(() => {
    handleGetDoctors()
    const def = getDefaultService()
    quickDetails.service = def
    contactDetails.service = def
})
</script>
