<template>
    <div :class="customClass">
        <div v-show="!hideTop" class="p-2 rounded border grid gap-2 bg-white md:grid-cols-4" :class="hideSearch?'grid-cols-1':'grid-cols-2'">
            <app-input v-show="!hideSearch" @inputed="search_items" :attributes="{placeholder: 'Поиск' }" />
            <slot name="table-top" :handleFetch="handleFetching" />
        </div>
        <slot name="table-top-extra" :handleFetch="handleFetching" />
    
        <div class="w-full mt-2 overflow-hidden">
            <div v-if="md" class="relative overflow-x-auto border rounded">
                <table class="w-full text-[13px] text-left rtl:text-right text-gray-500">
                    <thead class="text-gray-700 bg-gray-50">
                        <tr>
                            <template v-for="header in headers" :key="header.value">
                                <th v-if="header.sortingField?.trim()" scope="col" class="px-6 py-3 font-medium" :class="header.customClass||''">
                                    <div class="select-none flex gap-1 items-center cursor-pointer" @click="set_sorting(header.sortingField)">
                                        {{ header.name }}
                                        <div>
                                            <CaArrowDown v-show="sorting[header.sortingField] !== undefined" class="w-4 h-4" :class="{'rotate-180': sorting[header.sortingField] === 'desc'}"/>
                                        </div>
                                    </div>
                                </th>
                                <th v-else scope="col" class="px-6 py-3 font-medium" :class="header.customClass||''">
                                    {{ header.name }}
                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-show="items.length===0||loading" class="bg-white" :class="{'border-b':loading&&items.length>0}">
                            <td scope="row" :colspan="headers.length" class="py-2 text-center text-base">
                                <div class="flex items-center justify-center gap-1">
                                    <span v-show="!loading">Пусто</span>
                                    <McLoading2Line class="w-6 h-6 animate-spin" v-show="loading" />
                                    <span v-show="loading" class="mb-0.5">Загрузка...</span>
                                </div>
                            </td>
                        </tr>
                        <template v-for="item,i in items" :key="i">
                            <tr @click="emits('row-click', i, item)" class="bg-white hover:bg-gray-50 border-b" :class="{'cursor-pointer active:bg-gray-200':cursoredRow}">
                                <template v-for="h in headers" :key="h.value">
                                    <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                        <slot v-if="!!h?.custom" :name="`table-item-${h.value}`" :table-item="item"  :table-value="h.value" :index="i" /> 
                                        <div v-else class="text-sm" :class="{'text-balance line-clamp-3':!!h?.balancedText}">{{ ![null,undefined,''].includes((item as any)[h.value])?(item as any)[h.value]:'Нет' }}</div>
                                    </th>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div v-show="items.length===0||loading" class="py-2 col-span-1 sm:col-span-2">
                    <div class="flex items-center justify-center gap-1">
                        <span v-show="!loading">Пусто</span>
                        <McLoading2Line class="w-6 h-6 animate-spin" v-show="loading" />
                        <span v-show="loading" class="mb-0.5">Загрузка...</span>
                    </div>
                </div>

                <div v-for="item,i in items" :key="i" @click="emits('row-click', i, item)" class="bg-white hover:bg-gray-50 border rounded p-4 grid gap-3 cursor-pointer" :class="{'cursor-pointer active:bg-gray-200':cursoredRow}">
                    <div v-for="h in headers" :key="h.value" class="font-medium text-gray-900 whitespace-nowrap">
                        <div class="flex items-center justify-between w-full gap-2">
                            <span v-show="!h.hideTitleInMobile" class="text-sm">{{ h.name }}</span>
                            <slot v-if="!!h?.custom" :name="`table-item-${h.value}`" :table-item="item"  :table-value="h.value" :index="i" /> 
                            <div v-else class="text-sm" :class="{'text-balance line-clamp-3 text-right':!!h?.balancedText}">{{ ![null,undefined,''].includes((item as any)[h.value])?(item as any)[h.value]:'Нет' }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="!hideBottom" class="py-2 flex items-center justify-between">
            <div class="border rounded overflow-hidden w-full max-w-[100px]">
                <select v-model="perPage" @change="handleFetching()" class="bg-white px-3 py-2 w-full text-sm outline-none" placeholder="Поиск">
                    <option :value="20" selected>20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
            <div class="border rounded flex items-center justify-between gap-4 bg-white p-2">
                <span class="text-sm">{{ perPage*(page-1)+1 }}-{{ perPage*(page-1)+items.length }} / {{ count }}</span>
                <div class="flex items-center gap-2">
                    <app-btn size="small" :disabled="page===1" @click="page--,handleFetching()">
                        <AkChevronLeft />
                    </app-btn>
    
                    <app-btn size="small" :disabled="page >= Math.ceil(count / perPage)" @click="page++,handleFetching()">
                        <AkChevronRight />
                    </app-btn>
                    <!-- v-if="totalPages===undefined" -->
                    <!-- <app-btn  v-else size="small" :disabled="page >= totalPages" @click="page++,handleFetching()">
                        <AkChevronRight />
                    </app-btn> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import debounce from 'lodash/debounce'
import type { TableProps } from '@/types'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { CaArrowDown, AkChevronRight, AkChevronLeft, McLoading2Line } from '@kalimahapps/vue-icons'

const { md } = useBreakpoints(breakpointsTailwind)

const { count, items, loading, customClass, sortingClient, searchClient } = defineProps<TableProps<T>>()
const emits = defineEmits(['fetching','searched','row-click'])

const page = ref(1)
const search = ref('')
const perPage = ref(20)
const sorting: any = reactive({})

const queryfilter = computed(() => {
    const qry: any = {}

    if(page.value) qry.page = page.value
    if(perPage.value) qry.perPage = perPage.value
    if(search.value?.trim()) qry.search = search.value

    return { ...qry, ...sorting }
})

const set_sorting = debounce((key: string) => {
    if (sorting[key] === 'asc') sorting[key] = 'desc'
    else if (sorting[key] === 'desc') delete sorting[key]
    else if(Object.keys(sorting).length == 1) {
        Object.keys(sorting).map(d => delete sorting[d])
        set_sorting(key)
    }
    else sorting[key] = 'asc'

    if(!sortingClient) handleFetching()
}, 500)

const search_items = debounce((e: any) => {
    emits('searched', e.target.value)
    search.value = e.target.value
    page.value = 1
    if(!searchClient) handleFetching()
}, 500)

const handleFetching = (cq?: any) => emits('fetching', cq?{...queryfilter.value,...cq}:queryfilter.value)

handleFetching()
</script>