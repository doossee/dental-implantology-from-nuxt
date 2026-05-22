export const useInitialRecords = () => {
    const { $api } = useNuxtApp()

    const getRecords = (params: any) => $api(`/initial-records`, { params })

    const createRecord = (data: any) => $api(`/initial-records`, { method: 'post', body: data })

    const updateRecord = (id: number, body: any) => $api(`/initial-records/{id}`, { path: { id }, method: 'PATCH', body })

    const deleteRecord = (id: any) => $api(`/initial-records/{id}`, { path: { id },  method: 'DELETE' })

    return {
        getRecords,
        createRecord,
        deleteRecord,
        updateRecord,
    }
}