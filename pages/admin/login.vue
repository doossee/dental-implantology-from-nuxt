<template>
    <div class="h-[100vh] flex items-center justify-center px-2">
        <div class="max-w-[420px] w-full p-4 border rounded overflow-hidden">
            <form @submit.prevent="login()" class="w-full">
                <h1 class="text-2xl text-center font-medium text-primary-600">Войти в систему</h1>
                <p v-show="err" class="text-center text-sm text-red-600">Логин или пароль неправилный!</p>
                <div class="grid gap-4 pt-4">
                    <app-input v-model="form_data.phone" :attributes="{required: true, type: 'text', placeholder: 'Логин', name: 'login', autocomplete: 'off'}" label="Логин" />
                    <app-input v-model="form_data.password" :attributes="{required: true, type: show?'text':'password', placeholder: 'Пароль', name: 'password', autocomplete: 'off'}" label="Пароль">
                        <template #append>
                            <component :is="show?AnFilledEyeInvisible:AnFilledEye" @click="show=!show" class="cursor-pointer size-6 text-primary-600" />
                        </template>
                    </app-input>
                    <app-btn size="medium" type="submit" :disabled="loading" class="w-full">Отправить</app-btn>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ALERT_MESSAGES } from '@/constants'
import { AnFilledEye, AnFilledEyeInvisible } from '@kalimahapps/vue-icons'

const { pushAlert } = useAlert()
const { handleLogin } = useAuth()

const err = ref(false)
const show = ref(false)
const loading = ref(false)
const form_data = reactive({
    phone: '',
    password: '',
})

const login = async () => {
    loading.value = true
    try {
        await handleLogin(Object.assign({}, form_data))
        Object.assign(form_data, { login: '', password: '' })
        pushAlert(ALERT_MESSAGES.LOGIN_SUCCESS, 'SUCCESS')
    } catch (error) {
        pushAlert(ALERT_MESSAGES.LOGIN_FAILED, 'ERROR')
    } finally {
        loading.value = false
    }
}
</script>