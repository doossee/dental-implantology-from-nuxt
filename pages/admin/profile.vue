<template>
  <div class="w-full p-2">
    <div class="grid gap-2">

      <div class="flex gap-2 items-center flex-wrap">
        <div class="cursor-pointer rounded border px-3 py-1.5 text-sm bg-white"
          :class="{'!bg-primary-600 !text-white': i === tab}"
          v-for="t,i in PROFILE_TABS" :key="i" @click="tab=i">
          {{ t }}
        </div>

        <div v-if="user?.userRole === 'DOCTOR'" class="cursor-pointer rounded border px-3 py-1.5 text-sm bg-white"
          :class="{'!bg-primary-600 !text-white': 3 === tab}"
          @click="tab=3">
          Мой заработок
        </div>
      </div>

      <div v-show="tab==0">

        <div class="bg-white p-4 border rounded">

          <form @submit.prevent="handleUpdateUser" class="flex flex-col">
            <h1 class="text-lg">Изменить Данные</h1>
        
            <div class="flex items-start flex-col md:flex-row gap-6 mt-6">
              <div class="flex flex-col gap-2">
                <p class="text-gray-500 text-sm font-medium">Изменить фото</p>
                <label for="file-input" class="cursor-pointer">
                  <div class="w-[120px] h-[130px] border-2 hover:bg-primary-100 border-primary-600 p-1 overflow-hidden rounded">
                    <app-image no-modal :src="profile.avatar!" class="w-full rounded h-full object-cover" />
                  </div>
                </label>
              </div>
  
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 w-full">
                <app-input v-model="profile.firstName" label="Имя" :attributes="{required: true, placeholder: 'Имя'}" />
                <app-input v-model="profile.lastName" label="Фамилия" :attributes="{required: true, placeholder: 'Фамилия'}" />
                <app-input v-model="profile.middleName" label="Отчество" :attributes="{placeholder: 'Отчество'}" />
                
                <app-input v-model="profile.phone" label="Телефон" :attributes="{required: true, placeholder: 'Телефон'}" />
                <app-input v-model="profile.birthDate" label="Дата рождения" :attributes="{type: 'date'}" />
    
                <app-input v-model="profile.email" label="Email" :attributes="{placeholder: 'example@mail.com'}" />
                <app-input v-model="profile.address" label="Адрес" :attributes="{placeholder: 'Адрес'}" />
                
                <template v-if="profile.role === 'DOCTOR'">
                  <app-input v-model="profile.experience" label="Опыт" :attributes="{type: 'number', placeholder: 'Опыт'}" />
                </template>
              </div>
            </div>

            <input hidden @change="handleFileChange" id="file-input" accept="image/jpg,image/jpeg,image/png,image/bmp;capture=camera" type="file">

            <div class="flex justify-end">
              <app-btn :disabled="createLoading" type="submit" class="w-fit" size="medium">
                  {{ createLoading?'Загружается':'Сохранить' }}
              </app-btn>
            </div>
          </form>
        </div>
        
        <div class="flex justify-end mt-4 pr-4">
          <app-btn @click="logout" size="medium" customColor="bg-gray-500 hover:bg-gray-400 active:bg-gray-300 disabled:bg-gray-200">
            <div>
              <BxLogOut class="size-5" />
            </div>
            <span class="text-xs">Выйти</span>
          </app-btn>
        </div>
      </div>
      
      <div v-show="tab==1">
        
        <div class="bg-white p-4 border rounded max-w-[500px]">
          <form @submit.prevent="handleUpdatePassword" class="h-min flex flex-col gap-4">
            <h1 class="text-lg">Изменить Пароль</h1>
            <app-input v-model="password.oldPassword" label="Старый пароль" :attributes="{required: true, placeholder: 'Старый пароль'}" />
            <app-input v-model="password.newPassword" label="Новый пароль" :attributes="{required: true, placeholder: 'Новый пароль'}" />
            <app-input v-model="password.confirmPassword" label="Повторите новый пароль" :attributes="{required: true, placeholder: 'Повторите новый пароль'}" />
            <app-btn :disabled="isDisabledPassword" type="submit" size="medium">Изменить пароля</app-btn>
          </form>
        </div>

      </div>

      <div v-show="tab==2">
        Push Notification
      </div>
      
      <div v-show="tab==3" v-if="user?.userRole === 'DOCTOR'">
        
        <app-data-table
          hide-search
          :count="count"
          :items="payments"
          :loading="loading"
          :headers="CONSUMPTION_TABLE_HEADERS_1"
            
            @fetching="handleGetPayments">
            <template #table-top>
                <app-input v-model="filterdate" :attributes="{type: 'date'}" @changed="handleGetPayments({createdDate:$event.target.value})" />
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <div class="h-full flex items-center justify-end">
                  <app-price :value="data?.balance||0" :class="data?.balance>0?'text-green-600':data?.balance!<0?'text-red-600':''">
                    <template #prepend>Баланс: </template>
                  </app-price>
                </div>
            </template>

            <template #table-item-amount="{tableItem}">
              <app-price :value="tableItem.amount" class="text-sm" />
            </template>
            <template #table-item-createdAt="{tableItem}">
              <span class="text-sm text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
        </app-data-table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Payment } from '@/types'
import { BxLogOut } from '@kalimahapps/vue-icons'
import { pickNeededUserFields, PROFILE_TABS, CONSUMPTION_TABLE_HEADERS_1 } from '@/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const user = useUserData()
const { pushAlert } = useAlert()
const removeAuthData = useRemoveAuthData()
const { getConsumptions } = useConsumptions()
const { changeAvatar, changePassword, updateUserMe, getMe } = useUsers()

const { data } = await getMe()

const loading = ref(false)
const filterdate = ref('')
const count = ref<number>(0)
const payments = ref<Payment[]>([])

const tab = ref(0)
const file = ref<any>(null)
const profile = ref(pickNeededUserFields(data.value as any))
const createLoading = ref<boolean>(false)

const password = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
})

const logout = async () => {
  if(!confirm('Хотите выйти из аккоунта?')) return
  removeAuthData()
}

const isDisabledPassword = computed(() => {
  return !password.oldPassword.trim() ||
         !password.newPassword.trim() || 
         !password.confirmPassword.trim() || 
         password.confirmPassword !== password.newPassword ||
         password.oldPassword === password.newPassword
})

const handleUpdateUser = async () => {
  try {
    const { avatar, role, ...body } = pickNeededUserFields(profile.value)
    const response = await updateUserMe(body)
    Object.assign(profile.value, response)
    
    pushAlert('Данные успешно изменено✅', 'SUCCESS')
  } catch (error) {
    console.log(error)
  }
}

const handleFileChange = async (e: any) => {
  const fileValue = e.target?.files?.[0]

  if(!fileValue) return
  file.value = fileValue

  const formData = new FormData()
  formData.append('avatar', fileValue)

  try {  
    const { avatar } = await changeAvatar(formData)
    profile.value.avatar = avatar
  
    pushAlert('Аватар успешно изменено✅', 'SUCCESS')
  } catch (error) {
    console.log(error)
  }
}

const handleUpdatePassword = async () => {
  try {
    await changePassword(password)
    Object.assign(password, {
      password: "",
      new_password: "",
      confirm_password: ""
    })
    pushAlert('Пароль успешно изменено✅', 'SUCCESS')
  } catch (error) {
    console.log(error)
    alert('Ошыбка с измененем паролья❗')
  }
}

const handleGetPayments = async (params: any) => {
  try {
    const {data, meta}: any = await getConsumptions({...params, doctorId: user.value?.userId})
    payments.value = data
    count.value = meta.total
  } catch (error) {
    console.log(error)
  }
}
</script>