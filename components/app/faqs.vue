<template>
    <div class="grid gap-4">
        <div v-for="faq,i in FAQS" :key="i" class="w-full">
            <div @click="f==i?f=-1:f=i" class="p-4 md:text-lg font-medium cursor-pointer hover:bg-gray-100 rounded flex justify-between items-center">
                <h1 :class="{'text-primary-600': f==i}">{{ faq.question[$i18n.locale as "uz"] }}</h1>
                <AkChevronDown v-show="f!==i" />
                <AkChevronUp v-show="f==i" />
            </div>
            <div v-show="f === i" class="p-4">
                <p class="text-gray-600">{{ faq.answer[$i18n.locale as "uz"] }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FAQS } from '~/constants'
import { AkChevronDown, AkChevronUp } from '@kalimahapps/vue-icons';

const f = ref(-1)

</script>