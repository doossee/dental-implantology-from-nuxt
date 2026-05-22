<template>
    <div class="flex items-center gap-4 bg-white rounded w-fit">
        <nuxt-link
            v-for="link in links" :key="link.url"
            :to="`/admin/patients/${$route.params.id}/${link.url}`"
            class="text-sm text-gray-400 font-medium"
            exact-active-class="!text-black">
            {{ link.title }}
        </nuxt-link>
    </div>
</template>

<script setup lang="ts">
import { PATIENT_LINKS } from '~/constants'

const user = useUserData()
const links = computed(() => (user.value?.userRole === 'ADMIN' || user.value?.isSuperUser) ? PATIENT_LINKS :
PATIENT_LINKS.filter(l => ['initial-examinations', 'xray', 'photos'].includes(l.url)))
</script>