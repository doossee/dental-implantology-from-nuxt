export default defineNuxtRouteMiddleware(async (to, from) => {
    if(import.meta.client) {
        const isPWA = window.matchMedia('(display-mode: standalone)').matches
        // console.log(isPWA)
        if(isPWA) navigateTo('/admin', { external: true })
    }
})