import type { IUser } from "~/types"

export const useAuthAccessToken = () => {
    return useCookie<string|null>('access-token', {
        default: () => null
        // httpOnly: true
    })
}

export const useAuthRefreshToken = () => {
    return useCookie<string|null>('refresh-token', {
        default: () => null,
        // httpOnly: true
    })
}

export const useUserData = () => {
    return useCookie<IUser|null>('user-data', {
        default: () => null
    })
}

export const useRemoveAuthData = () => {
    return () => {
        const userData = useUserData();
        const accessToken = useAuthAccessToken();
        const refreshToken = useAuthRefreshToken();
    
        userData.value = null
        accessToken.value = null
        refreshToken.value = null
    
        navigateTo('/admin/login')
    }
}

export const useSetAuthData = () => {
    return (access: string, refresh: string, user?: IUser) => {
        const userData = useUserData();
        const accessToken = useAuthAccessToken();
        const refreshToken = useAuthRefreshToken();
    
        if(user) userData.value = user
        accessToken.value = access
        refreshToken.value = refresh
    }
}