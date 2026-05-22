export default function useTeeth() {
    const { $api } = useNuxtApp()

    const getXRayData = (params: any) => $api('/x-ray-data', { method: 'GET', params } as any)

    const createXRayData = (body: any) => $api('/x-ray-data', { method: 'POST', body })

    const updteXRayData = (id: number, body: any) => $api('/x-ray-data/{id}', { path: { id }, method: 'PATCH', body })

    const deleteXRayData = (id: number) => $api('/x-ray-data/{id}', { path: { id }, method: 'DELETE' })

    return {
        getXRayData,
        createXRayData,
        updteXRayData,
        deleteXRayData,
    }
}