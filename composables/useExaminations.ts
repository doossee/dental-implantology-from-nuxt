import type { PlanExaminations } from '@/types'

export default function useExaminations() {
    const { $api } = useNuxtApp()

    const planExaminations = useState<PlanExaminations[]>('plan-examinations', () => [])

    const getExamination = (id: number) => $api(`/examinations/{id}`, { path: { id } })

    const getExaminations = (params: any) => $api(`/examinations`, { method: "GET", params })

    const createExamination = (body: any) => $api(`/examinations`, { method: 'POST', body })

    const deleteExamination = (id: number) => $api(`/examinations/{id}`, { path: { id }, method: 'DELETE' })

    const updateExamination = (id: number, body: any) => $api(`/examinations/{id}`, { path: { id }, method: "PATCH", body })

    return {
        planExaminations,
        getExamination,
        getExaminations,
        createExamination,
        deleteExamination,
        updateExamination,
    }
}