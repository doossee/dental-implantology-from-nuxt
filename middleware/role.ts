import { ALERT_MESSAGES } from '@/constants'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUserData()
    
    if(user.value?.userRole === 'ADMIN' || user.value?.isSuperUser) return
    
    if(import.meta.client) {
        const { pushAlert } = useAlert()
        pushAlert(ALERT_MESSAGES.ACCESS_DENIED, 'WARNING')
    }
    
    navigateTo('/admin/patients', { external: true, replace: true })
})