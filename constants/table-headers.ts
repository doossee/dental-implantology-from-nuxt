import type { TableHeaders } from '@/types'

export const PATIENT_TABLE_HEADERS: TableHeaders[] = [
    { name: "Фото", value: "image", sortingField: 'byId', custom: true },
    { name: "Имя", value: "name", custom: true },
    { name: "Пол", value: "gender", sortingField: 'byGender', custom: true },
    { name: "Дата рождения", value: "birthDate", balancedText: true, sortingField: 'byAge', custom: true },
    { name: "Адрес", value: "address", balancedText: true, },
    { name: "Добавлен", value: "createdAt", sortingField: 'byCreatedDate', custom: true },
    { name: "Последний визит", value: "lastVisit", custom: true },
    { name: "Управление", value: "actions", custom: true },
]

export const KPI_PERCENT_TABLE_HEADERS: TableHeaders[] = [
    { name: "Процент", value: "percent" },
    { name: "Доктор", value: "doctor", custom: true },
    { name: "Процедура", value: "procedure", custom: true },
    { name: "Управление", value: "actions", custom: true },
]

export const PATIENT_TABLE_HEADERS_2: TableHeaders[] = [
    // { name: "Фото", value: "image", sortingField: 'byId', custom: true },
    { name: "Имя", value: "only-name", custom: true },
    { name: "Управление", value: "actions", custom: true },
]

export const DOCTOR_TABLE_HEADERS: TableHeaders[] = [
    { name: "Фото", value: "image", sortingField: 'byId', custom: true },
    { name: "Имя и фамилия", value: "name", custom: true },
    { name: "Опыт", value: "experience", sortingField: 'byExperience' },
    { name: "Специализация", value: "spec", custom: true },
    { name: "Баланс", value: "balance" },
    // { name: "Пол", value: "gender", sortingField: 'byGender', custom: true },
    { name: "Дата рождения", value: "birthDate", sortingField: 'byAge', custom: true },
    { name: "Дата", value: "createdAt", custom: true },
    { name: "Управление", value: "actions", custom: true },
]

export const SERVICE_TABLE_HEADERS: TableHeaders[] = [
    { name: "Услуги", value: "id", custom: true, customClass: 'text-primary-600' },
    { name: "Название", value: "title", balancedText: true },
    { name: "Описание", value: "description", balancedText: true },
    { name: "Управление", value: "actions", custom: true },
]

export const PROCEDURE_TABLE_HEADERS: TableHeaders[] = [
    { name: "Процедуры", value: "id", custom: true, customClass: 'text-primary-600', sortingField: 'byId' },
    { name: "Название", value: "title_ru", balancedText: true },
    { name: "Цена", value: "price", sortingField: 'byPrice' },
    { name: "Категория", value: "service", custom: true },
    { name: "Управление", value: "actions", custom: true },
]

export const INITIAL_RECORD_TABLE_HEADERS: TableHeaders[] = [
    { name: "No", value: "id", custom: true, sortingField: 'byId' },
    { name: "Имя", value: "firstName", sortingField: 'byFirstName' },
    { name: "Фамилия", value: "lastName", sortingField: 'byLastName' },
    { name: "Телефон", value: "phone" },
    { name: "Комментарий", value: "notes", balancedText: true },
    { name: "Дата", value: "createdAt", custom: true },
    { name: "Управление", value: "actions", custom: true },
]

export const EXAMINATION_TABLE_HEADERS: TableHeaders[] = [
    { name: "Номер зуба", value: "toothNum", custom: true, sortingField: 'byId' },
    { name: "Зуб", value: "tooth", custom: true, customClass: 'text-center', hideTitleInMobile: true },
    { name: "Доктор / Время", value: "info", custom: true, sortingField: 'byCreatedDate', hideTitleInMobile: true },
    { name: "Лечение", value: "treatments", custom: true, hideTitleInMobile: true },
    { name: "Статус", value: "status", custom: true },
    { name: "Управление", value: "actions", custom: true },
]

export const PROFIT_TABLE_HEADERS: TableHeaders[] = [
    { name: "Доктор", value: "doctor", custom: true },
    // { name: "Пациент", value: "patient", custom: true },
    { name: "Цена", value: "price", custom: true },
    // { name: "Оплачено", value: "amount", },
    { name: "Тип платежа", value: "type", custom: true },
    { name: "Дата создания", value: "createdAt", custom: true },
]

export const CONSUMPTION_TABLE_HEADERS: TableHeaders[] = [
    { name: "Названия", value: "title" },
    { name: "Описания", value: "description", balancedText: true },
    { name: "Доктор", value: "doctor", custom: true },
    { name: "Оплачено", value: "amount", custom: true },
    { name: "Дата создания", value: "createdAt", custom: true },
]


export const CONSUMPTION_TABLE_HEADERS_1: TableHeaders[] = [
    { name: "Доктор", value: "doctor", custom: true },
    { name: "Оплачено", value: "balance", custom: true },
]

export const CONSUMPTION_TABLE_HEADERS_2: TableHeaders[] = [
    { name: "Названия", value: "title" },
    { name: "Описания", value: "description", balancedText: true },
    { name: "Оплачено", value: "amount", custom: true },
    { name: "Дата создания", value: "createdAt", custom: true, sortingField: 'byCreatedDate' },
]

export const PATIENT_APPOINTMENTS_TABLE_HEADERS: TableHeaders[] = [
    { name: "ID", value: "id", custom: true },
    { name: "Доктор", value: "doctor", custom: true },
    { name: "Услуга", value: "procedure", custom: true },
    // { name: "Цена", value: "price", custom: true },
    { name: "Дата начала", value: "startDate", custom: true },
    { name: "Дата окончания", value: "endDate", custom: true },
    { name: "Дата создания", value: "createdAt", custom: true },
]

export const PATIENT_PAYMENT_TABLE_HEADERS: TableHeaders[] = [
    { name: "ID", value: "id", sortingField: 'byId', custom: true },
    { name: "Доктор", value: "doctor", custom: true },
    { name: "Цена", value: "amount", custom: true },
    { name: "Тип платежа", value: "type", custom: true },
    { name: "Дата создания", value: "createdAt", sortingField: 'byCreatedDate', custom: true },
]

export const PATIENT_PAYMENT_TABLE_HEADERS_1: TableHeaders[] = [
    { name: "ID", value: "id", sortingField: 'byId', custom: true },
    { name: "Цена", value: "amount", custom: true },
    { name: "Тип платежа", value: "type", custom: true },
    { name: "Дата создания", value: "createdAt", sortingField: 'byCreatedDate', custom: true },
]

export const X_RAY_TABLE_HEADERS: TableHeaders[] = [
    { name: "Зуб #", value: "toothId", sortingField: 'byToothId' },
    { name: "Количество", value: "amount" },
    { name: "Доза (мкЗв)", value: "dose" },
    { name: "Заключение", value: "conclusion", balancedText: true },
    { name: "Тип", value: "type", custom: true },
    { name: "Дата", value: "date", custom: true },
    { name: "Управление", value: "actions", custom: true },
]