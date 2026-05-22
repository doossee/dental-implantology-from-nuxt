export function useKPIs() {
    const { $api } = useNuxtApp()
    
    const getKPIs = (params: any) => $api('/kpi-percents', { params })

    const createKPI = (body: any) => $api('/kpi-percents', { method: 'POST', body })

    const deleteKPI = (id: any) => $api('/kpi-percents/{id}', { method: 'DELETE', path: { id } })

    const updateKPI = (id: number, body: any) => $api('/kpi-percents/{id}', { method: 'PATCH', body, path: { id } })


    return {
        getKPIs,
        createKPI,
        deleteKPI,
        updateKPI,
    }
}