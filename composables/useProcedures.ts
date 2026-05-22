export default function useProcedures() {
    const { $api } = useNuxtApp()

    const getProcedures = (params: any) => $api('/procedures', { params })

    const createProcedure = (body: any) => $api('/procedures', { method: 'POST', body })

    const deleteProcedure = (id: number) => $api('/procedures/{id}', { path: { id }, method: 'DELETE' })

    const updateProcedure = (id: number, body: any) => $api('/procedures/{id}', { path: { id }, method: "PATCH", body })

    return {
        getProcedures,
        createProcedure,
        updateProcedure,
        deleteProcedure,
    }
}