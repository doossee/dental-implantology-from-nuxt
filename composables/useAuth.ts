export const useAuth = () => {
    const { $api } = useNuxtApp()
    const setAuthData = useSetAuthData()
    
    const handleLogin = async (body: any) => {
        const data = await $api('/auth/login', { method: 'POST', body })
        
        const { accessToken, refreshToken, ...user } = data
        
        setAuthData(accessToken, refreshToken, user)
        setTimeout(() => {
            navigateTo(user.userRole === 'ADMIN' ? '/admin/patients' : '/admin/patients', { external: true })
        }, 100);
    }

    return {
        handleLogin
    }
}