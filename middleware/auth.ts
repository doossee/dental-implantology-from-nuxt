export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUserData()
    const token = useAuthAccessToken()
    
    if(!token.value || (user.value == null)) navigateTo('/admin/login', { external: true })
})