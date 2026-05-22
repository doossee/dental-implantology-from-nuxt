export default function useConsumptions() {
    const { $api } = useNuxtApp()

    const getConsumptions = (params: any) => $api(`/consumptions`, { method: 'GET', params })

    const createConsumption = (body: any) => $api(`/consumptions`, { method: 'POST', body })

    return {
        getConsumptions,
        createConsumption,
    }
}