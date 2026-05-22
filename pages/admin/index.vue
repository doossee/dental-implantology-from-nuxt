<template>
    <div class="w-full p-2"></div>
</template>

<script setup lang="ts">
const user = useUserData()
const router = useRouter()

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

if(!user.value?.userRole) router.push('/admin/login')
if(user.value?.userRole === 'DOCTOR') router.push('/admin/appointments-mine')
if(user.value?.userRole === 'ADMIN') router.push('/admin/appointments')
</script>