import type { Service } from "@/types"

export default function useServices() {
    const { $api } = useNuxtApp()

    const services = useState<Service[]>('services', () => [])

    const getServices = (params: any) => $api(`/services`, { params })

    const createService = (body: any) => $api(`/services`, { method: 'POST', body })

    const deleteService = (id: number) => $api(`/services/{id}`, { path: { id }, method: 'DELETE' })

    const updateService = (id: number, body: any) => $api(`/services/{id}`, { path: { id }, method: "PATCH", body })

    return {
        services,
        getServices,
        createService,
        updateService,
        deleteService
    }
}