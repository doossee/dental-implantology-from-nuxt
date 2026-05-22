<template>
    <template v-if="!!token">
        <div class="flex">
            <app-bottom-nav v-if="showNav" />
            <app-nav-drawer v-else />
            <main class="flex-1 min-h-[100vh] bg-gray-100 overflow-auto"
                :class="showNav?'pb-20':'pl-[57px] md:pl-0'">
                <slot />
            </main>
        </div>
        <AppImageModal />
        <AppInstallPrompt />
    </template>
</template>

<script setup lang="ts">
const user = useUserData()
const { width } = useWindowSize()
const token = useAuthAccessToken()

const showNav = computed(() => {
    return width.value < 600 && user.value?.userRole === 'DOCTOR'
})
</script>