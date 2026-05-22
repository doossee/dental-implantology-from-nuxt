import type { Tooth } from "~/types"

export default function useTeeth() {
    const { $api } = useNuxtApp()

    const teeth = useState<Tooth[][]>('teeth', () => [])

    const getTeeth = (id: number) => $api('/teeth/{id}', { path: { id } })

    const updateTeeth = (id: number, body: any) => $api('/teeth/{id}', { path: { id }, method: "PATCH", body })

    return {
        teeth,
        getTeeth,
        updateTeeth,
    }
}