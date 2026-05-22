<template>
    <div class="bg-white w-full mt-2 overflow-hidden rounded border">
        <div class="p-2">
            <app-input @inputed="setSearch" :attributes="{placeholder: 'Поиск'}" />
        </div>
        <template v-for="service,i in _services" :key="service.id">
            <div class="w-full" v-if="service.procedures.length>0">

                <div class="bg-gray-100 cursor-pointer px-4 py-2" @click="serviceOpen==i?serviceOpen=null:serviceOpen=i">
                    {{ service.title }}: {{ service.procedures?.length }} процедуры
                </div>

                <div v-show="serviceOpen===i">
                    <div v-for="procedure in service?.procedures||[]" :key="procedure.id" class="px-4 py-1 border-y cursor-pointer hover:bg-gray-100 flex justify-between items-center gap-2">
                        <div>
                            <h2 class="text-sm">
                                <b class="font-medium" v-show="procedure.code?.trim()">{{ procedure.code }}: </b>
                                {{ procedure.title_ru }}
                            </h2>
                            <p class="text-sm"><b class="font-medium">Цена</b>: <app-price :value="procedure.price" /> </p>
                        </div>

                        <slot name="actions" :procedure="procedure" />
                    </div>
                </div>

            </div>
        </template>

    </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
const { services, getServices } = useServices()

const search = ref('')
const serviceOpen = ref<number|null>(0)

const setSearch = debounce((text: any) => {
    search.value = text.target.value || ''
}, 500)

const _services = computed(() => {
    if(!search.value?.trim()) return services.value
    else return services.value.map(service => {
        const procedures = service.procedures.filter(p =>
            p.title_en.toLowerCase().includes(search.value.toLowerCase()) ||
            p?.title_ru?.toLowerCase()?.includes(search.value.toLowerCase()) ||
            p?.title_uz?.toLowerCase()?.includes(search.value.toLowerCase()) ||
            p?.description_ru?.toLowerCase()?.includes(search.value.toLowerCase())
        )
        if(procedures.length > 0) return { ...service, procedures }

        return null
    }).filter(s => s !== null)
})

const init = async  () => {
    if(services.value.length > 0) return

    const data: any = await getServices({})
    services.value = data
}

init()
</script>