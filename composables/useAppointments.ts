import type { Appointment } from "~/types"

export default function useAppointments() {
    const { $api } = useNuxtApp()

    const getAppointments = (params: any) => $api(`/appointments`, { method: 'GET', query: params })

    const createAppointment = (body: any) => $api(`/appointments`, { method: 'post', body })

    const updateAppointment = (id: number, body: any) => $api(`/appointments/{id}`, { path: { id }, method: 'PATCH', body })

    const deleteAppointment = (id: number) => $api(`/appointments/{id}`, { path: { id }, method: 'delete' })


    const getAppointmentsMine = (params: any) => $api(`/appointments/mine`, { method: 'GET', query: params })

    const createAppointmentMine = (body: any) => $api(`/appointments/mine`, { method: 'post', body })

    const updateAppointmentMine = (id: number, body: any) => $api(`/appointments/mine/{id}`, { path: { id }, method: 'PATCH', body })

    const deleteAppointmentMine = (id: number) => $api(`/appointments/mine/{id}`, { path: { id }, method: 'delete' })

    return {
        getAppointments,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        
        getAppointmentsMine,
        createAppointmentMine,
        updateAppointmentMine,
        deleteAppointmentMine,
    }
}