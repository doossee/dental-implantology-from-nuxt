import type { User } from "@/types"

export default function useUsers() {
    const { $api } = useNuxtApp()
    
    const doctors = useState<User[]>('global-doctos', () => [])
    
    const getMe = () => useApi('/users/me')

    const createUser = (body: any) => $api('/users', { method: 'POST', body })

    const getUser = (id: number) => $api('/users/{id}', { path: { id }, method: "GET" })

    const getUsers = (params: any) => $api('/users', { method: "GET", params })

    const getPublishedDoctors = () => $api('/users/published-doctors', { method: "GET" })

    const deleteUser = (id: any) => $api('/users/{id}', { method: 'DELETE', path: { id } })
    
    const changeAvatar = (body: any) => $api(`/users/me/change-avatar`, { method: 'PATCH', body })

    const changePassword = (body: any) => $api('/users/me/change-password', { method: "PATCH", body })

    const updateUser = (id: number, body: any) => $api('/users/{id}', { method: 'PATCH', body, path: { id } })

    const updateUserMe = (body: any) => $api('/users/me', { method: 'PATCH', body })

    return {
        doctors,

        getMe,
        getUser,
        getUsers,
        createUser,
        deleteUser,
        updateUser,
        changeAvatar,
        updateUserMe,
        changePassword,
        getPublishedDoctors,
    }
}