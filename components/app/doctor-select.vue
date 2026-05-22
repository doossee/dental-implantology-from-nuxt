<template>
    <app-select v-model="model" :items="doctors" value="id" placeholder="Доктор" :label="label?'Доктор':''" :nullvalue="null">
        <template #item="{item}">
            <span>{{ item.firstName }} {{ item.lastName }}</span>
        </template>
    </app-select>
</template>

<script setup lang="ts">
defineProps<{label?: boolean}>()
const model = defineModel()
const { doctors, getUsers } = useUsers()

const init = async () => {
    if(doctors.value.length > 0) return

    const data: any = await getUsers({})
    doctors.value = data.filter((d: any) => d.role === 'DOCTOR')
}

init()
</script>