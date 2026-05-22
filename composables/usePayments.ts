export default function usePayments() {
    const { $api } = useNuxtApp()

    const getPayments = (params: any) => $api('/payments', { params })

    const createPayment = (body: any) => $api('/payments', { method: 'POST', body })

    return {
        getPayments,
        createPayment,
    }
}