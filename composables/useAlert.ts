import type { AlertMessageStatuses, AlertMessage } from '~/types'

export default function useAlert() {
    const alerts = useState<AlertMessage[]>('alert-box', () => [])

    const pushAlert = (message: string, type: AlertMessageStatuses) => {
        const id = Date.now()

        alerts.value.push({ id, message, type })

        setTimeout(() => {
            removeAlert(id)
        }, 8000); // ALERT TIME LIFE
    }

    const removeAlert = (id: number) => {
        const index = alerts.value.findIndex(alert => alert.id === id)
        if(index > -1) alerts.value.splice(index, 1)
    }

    return {
        alerts,
        pushAlert,
        removeAlert
    }
}