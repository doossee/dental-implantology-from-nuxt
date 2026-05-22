<template>
    <div class="relative cursor-pointer flex justify-center items-center">
        <client-only>
            <app-select
                select-class="!py-1.5"
                class="border-2 box-border border-primary-600 text-primary-600 font-bold"
                :model-value="locale"
                @changed="handleChange"
                :items="LANGUAGES"
                name="l"
                value="lang" />
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { LANGUAGES } from '@/constants'

const { locale, setLocale } = useI18n()

const handleChange = (e: Event) => {
    const code = (e.target as HTMLSelectElement).value
    if (code) setLocale(code as any)
}
</script>