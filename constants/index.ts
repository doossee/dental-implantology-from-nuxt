export * from './table-headers'

import * as XLSX from 'xlsx'
import {
    LaToothSolid,
    HeOutlineDoctorMale,
    BsHospital,
    BsCalendar2Week,
    HeFilledDoctorMale,
    MaDoctor,
    GlStatusHealth,
    CaPhone,
    CaReportData,
    AnOutlinedMessage,
    PhTooth,
    TaReport,
    ReStarSmileLine,
    BxHomeAlt2,
    FlDataUsage,
    ReMoneyDollarCircleLine,
    LuUserCog,
    CoBrandTelegramPlane,
    AnFilledInstagram,
    LaFacebookF,
    AkYoutubeFill,
    LuUser,
    AkCalendar,
    LuClipboardList,
    McInjectionLine,
    BsBarChartLine,
    IcMoneySquare,
} from '@kalimahapps/vue-icons'
import type { ExaminationStatus, Payment, Consumption, Patient, PaymentType, Specialty, ToothCondition, User, XRayType, DownloadDateTypes, Tooth } from '~/types'

// CMS
export const FAQS = [
    {
        "question": {
            "uz": "Klinikaning qaysi xizmatlari taklif qilinadi?",
            "en": "What services does your clinic offer?",
            "ru": "Какие услуги предоставляет ваша клиника?"
        },
        "answer": {
            "uz": "Biz terapevtik stomatologiya, ortodontiya, jarrohlik stomatologiyasi, parodontologiya, estetik stomatologiya va bolalar stomatologiyasi kabi keng doiradagi stomatologik xizmatlarni taklif etamiz.",
            "en": "We offer a wide range of dental services, including therapeutic dentistry, orthodontics, surgical dentistry, periodontics, aesthetic dentistry, and pediatric dentistry.",
            "ru": "Мы предлагаем широкий спектр стоматологических услуг, включая терапевтическую стоматологию, ортодонтию, хирургическую стоматологию, пародонтологию, эстетическую стоматологию и детскую стоматологию."
        }
    },
    {
        "question": {
            "uz": "Klinikada qanday shifokorlar ishlaydi?",
            "en": "What kind of doctors work at the clinic?",
            "ru": "Какие врачи работают в клинике?"
        },
        "answer": {
            "uz": "Bizning klinikamizda tajribali terapevtlar, ortodontlar, jarrohlar, parodontologlar va bolalar stomatologlari ishlaydi.",
            "en": "Our clinic employs experienced therapists, orthodontists, surgeons, periodontists, and pediatric dentists.",
            "ru": "В нашей клинике работают опытные терапевты, ортодонты, хирурги, пародонтологи и детские стоматологи."
        }
    },
    {
        "question": {
            "uz": "Klinikada qanday jihozlar mavjud?",
            "en": "What kind of equipment does the clinic have?",
            "ru": "Какое оборудование есть в клинике?"
        },
        "answer": {
            "uz": "Bizning klinikamizda zamonaviy diagnostika va davolash uskunalari mavjud. Biz har doim yangi texnologiyalarni qo'llab-quvvatlaymiz.",
            "en": "Our clinic is equipped with modern diagnostic and treatment equipment. We always support the latest technologies.",
            "ru": "Наша клиника оснащена современным диагностическим и лечебным оборудованием. Мы всегда поддерживаем новейшие технологии."
        }
    },
    {
        "question": {
            "uz": "Klinikada qanday sharoitlar mavjud?",
            "en": "What kind of facilities does the clinic have?",
            "ru": "Какие условия есть в клинике?"
        },
        "answer": {
            "uz": "Bizning klinikamizda qulay va zamonaviy sharoitlar mavjud. Biz bemorlarning qulayligini ta'minlaymiz.",
            "en": "Our clinic offers comfortable and modern facilities. We ensure the comfort of our patients.",
            "ru": "Наша клиника предлагает комфортные и современные условия. Мы обеспечиваем комфорт наших пациентов."
        }
    },
    {
        "question": {
            "uz": "Klinikada qanday qabul tizimi mavjud?",
            "en": "What kind of appointment system does the clinic have?",
            "ru": "Какая система записи на прием есть в клинике?"
        },
        "answer": {
            "uz": "Bizning klinikamizda onlayn va telefon orqali qabul tizimi mavjud. Bemorlar osonlikcha qabulga yozilishlari mumkin.",
            "en": "Our clinic offers an online and telephone appointment system. Patients can easily schedule their appointments.",
            "ru": "Наша клиника предлагает систему записи на прием онлайн и по телефону. Пациенты могут легко записаться на прием."
        }
    }
]

export const SLIDER_IMAGES = [
    '/images/slider/image-1.webp',
    '/images/slider/image-2.webp',
    '/images/slider/image-3.webp',
    '/images/slider/image-4.webp',
    '/images/slider/image-5.webp',
    '/images/slider/image-6.webp',
]

export const SERVICES = [
    {
        icon: '/services/service1.svg',
        title: {
            uz: 'Tish oldirish',
            en: 'Tooth extraction',
            ru: 'Удаление зубов',
        },
        description: {
            uz: 'Biz tishlarni behushlik ostida olib tashlaymiz - shifokor har bir bemor va muayyan protsedura uchun anestezikani tanlaydi.',
            en: 'We remove teeth under anesthesia - the doctor selects an anesthetic for each patient and specific procedure.',
            ru: 'Удаляем зубы под анастезией - врач подбирает анестетик для каждого пациента и конкретной процедуры.',
        }
    },
    {
        icon: '/services/service2.svg',
        title: {
            uz: 'Pulpa bilan davolash',
            en: 'Pulp treatment',
            ru: 'Лечение пульпида',
        },
        description: {
            uz: 'Biz keng qamrovli tashxisni amalga oshiramiz va shundan keyingina sizni bezovta qilayotgan tishni davolashni boshlaymiz.',
            en: 'We carry out a comprehensive diagnosis and only after that we begin treatment of the tooth that is bothering you.',
            ru: 'Проводим комплексную диагностику и только после этого приступаем к лечению беспокоящего вас зуба.',
        }
    },
    {
        icon: '/services/service3.svg',
        title: {
            uz: 'Kariyesni davolash',
            en: 'Treatment of caries',
            ru: 'Лечение кариеса',
        },
        description: {
            uz: 'Biz muammoni aniqlaymiz, davolanish uchun tashriflar jadvalini tuzamiz, shuningdek, to\'g\'ri uyda parvarish qilishni tanlaymiz.',
            en: 'We will identify the problem, draw up a schedule of visits for treatment, and also select the right home care.',
            ru: 'Определим проблему, составим гравик визитов для лечения, а так же подберем правильный домашний уход.',
        }
    },
    {
        icon: '/services/service4.svg',
        title: {
            uz: 'Ultratovush yordamida tishlarni tozalash',
            en: 'Ultrasound teeth cleaning',
            ru: 'УЗ чистка зубов',
        },
        description: {
            uz: 'Ultrasonik skaler bilan professional gigiena eski tish toshlarini tez va xavfsiz olib tashlash imkonini beradi.',
            en: 'Professional hygiene with an ultrasonic scaler allows you to quickly and safely remove old tartar.',
            ru: 'Профессиональная гигиена УЗ-скалером позволяет быстро и безопасно удалить застарелый зубной камень.',
        }
    },
    {
        icon: '/services/service5.svg',
        title: {
            uz: 'Protezlash',
            en: 'Prosthetics',
            ru: 'Протезирование',
        },
        description: {
            uz: 'Shifokorlar guruhi sizning holatingizni tahlil qiladi va vaqt va narx bo\'yicha siz uchun eng yaxshi variantni tanlaydi.',
            en: 'A team of doctors analyzes your case and selects the best option for you in terms of time and cost.',
            ru: 'Команда врачей анализируют ваш случай и подбирает оптимальный для вас вариант по срокам и стоимости.',
        }
    },
    {
        icon: '/services/service6.svg',
        title: {
            uz: 'Tish implantatsiyasi',
            en: 'Dental implantation',
            ru: 'Имплантация зубов',
        },
        description: {
            uz: 'Bizning mutaxassislarimiz sizning holatingizga mos keladigan protezlarni og\'riqsiz o\'rnatadilar.',
            en: 'Our specialists painlessly install prostheses that suit your case.',
            ru: 'Наши специалисты и безболезненно устанавливают протезы, которые подходят в вашем случае.',
        }
    },
    {
        icon: '/services/service7.svg',
        title: {
            uz: 'Periodontal kasalliklarni davolash',
            en: 'Treatment of periodontal disease',
            ru: 'Лечение пародонтоза',
        },
        description: {
            uz: 'Tish shifokori blyashka va toshni olib tashlaydi, shuningdek, uyda parvarish qilish bo\'yicha individual tavsiyalar beradi.',
            en: 'The dentist will remove plaque and tartar, as well as individual recommendations for home care.',
            ru: 'Стоматолог удалит налет и зубной камень, а так же индивидуальные рекомендации по домашнему уходу.',
        }
    },
    {
        icon: '/services/service8.svg',
        title: {
            uz: 'Braket tizimi',
            en: 'Bracket system',
            ru: 'Брекет системы',
        },
        description: {
            uz: 'Tishlarning noto\'g\'ri joylashishi tufayli yuzaga keladigan kasalliklarning oldini olamiz.',
            en: 'We will prevent diseases that arise due to incorrect position of teeth.',
            ru: 'Предотвратим заболевания, которые возникают из за неправильного положения зубов.',
        }
    }
]

export const INDEX_CARDS = [
    { icon: PhTooth, title: 'home.home-card-1-title', description: 'home.home-card-1-description' },
    { icon: MaDoctor, title: 'home.home-card-2-title', description: 'home.home-card-2-description' },
    { icon: ReStarSmileLine, title: 'home.home-card-3-title', description: 'home.home-card-3-description' },
]

export const INDEX_STATISTICS = [
    { icon: LaToothSolid, title: "home.home-counst-info-1", count: 5000 },
    { icon: BsHospital, title: "home.home-counst-info-2", count: 15 },
    { icon: HeOutlineDoctorMale, title: "home.home-counst-info-3", count: 70 },
    { icon: BsCalendar2Week, title: "home.home-counst-info-4", count: 40 },
]

export const LANGUAGES = [
    { l: 'UZ',lang: 'uz', title: "O'zbek" },
    { l: 'РУ',lang: 'ru', title: 'Русский' },
    { l: 'EN',lang: 'en', title: "English" },
]

// LINKS
export const ALERT_COLORS = {
    'ERROR': 'border-l-red-600 text-red-600',
    'INFO': 'border-l-blue-600 text-blue-600',
    'SUCCESS': 'border-l-green-600 text-green-600',
    'WARNING': 'border-l-orange-500 text-orange-500',
}

export const ALERT_MESSAGES = {
    DATA_CREATED: "Данные успешно созданы.",
    PROCEDURE_ADDED: "Процедура добавлено.",
    DATA_UPDATED: "Данные успешно обновлены.",
    DATA_DELETED: "Данные успешно удалены.",
    DATA_NOT_FOUND: "Данные не найдены.",
    INVALID_INPUT: "Неверный ввод данных.",
    PERMISSION_DENIED: "Доступ запрещён.",
    ACTION_SUCCESS: "Действие выполнено успешно.",
    ACTION_FAILED: "Не удалось выполнить действие.",
    SERVER_ERROR: "Ошибка сервера. Пожалуйста, попробуйте позже.",
    LOGIN_SUCCESS: "Вы успешно вошли в систему.",
    LOGIN_FAILED: "Ошибка входа. Проверьте свои данные.",
    LOGOUT_SUCCESS: "Вы успешно вышли из системы.",
    ACCESS_DENIED: "У вас нет доступа к этому ресурсу.",
    LOADING: "Загрузка данных...",
    SAVING: "Сохранение данных...",
    UPLOADING: "Загрузка файла...",
    DOWNLOAD_SUCCESS: "Файл успешно загружен.",
    DOWNLOAD_FAILED: "Ошибка загрузки файла.",
    DELETE_CONFIRMATION: "Вы уверены, что хотите удалить?",
    PRICE_REQUIRED_AND_NUMBER: "Цена обязательна и должна быть числом.",
    NOT_MORE_5_FILES: "Нельзя загрузить больше 5 файлов.",
}

export const ADMIN_SETTING_LINKS = [
    { title: 'Докторы', icon: HeFilledDoctorMale, url: '/admin/doctors', description: "Управление и просмотр информации о всех врачах в стоматологической клинике. Это включает добавление новых врачей, обновление существующих профилей врачей и удаление врачей из системы." },
    { title: 'Услуги', icon: MaDoctor, url: '/admin/services', description: "Управление списком услуг, предлагаемых стоматологической клиникой. В этом разделе можно добавлять новые услуги, обновлять информацию о существующих услугах и удалять услуги, которые больше не предлагаются." },
    { title: 'Процедуры', icon: McInjectionLine, url: '/admin/procedures', description: "Управление списком процедур, предлагаемых стоматологической клиникой. В этом разделе можно добавлять новые процедуры, обновлять информацию о существующих процедурах и удалять процедуры, которые больше не предлагаются." },
    { title: 'Первоначальные записи', icon: AnOutlinedMessage, url: '/admin/initial-records', description: "Управление первоначальными записями пациентов. Это включает добавление новых записей, обновление существующих записей и удаление записей, которые больше не актуальны." },
    { title: 'Зарплата', icon: ReMoneyDollarCircleLine, url: '/admin/salaries', description: "Управление информацией о зарплатах сотрудников клиники. В этом разделе можно просматривать и обновлять данные о зарплатах, а также управлять выплатами." },
    { title: 'Приходы/Расходы', icon: CaReportData, url: '/admin/consumptions', description: "Управление финансовыми отчетами, включая приходы и расходы клиники. В этом разделе можно просматривать и анализировать финансовые данные, а также создавать отчеты." },
    { title: 'Отчет', icon: TaReport, url: '/admin/report', description: "Создание и просмотр различных отчетов, связанных с работой клиники. Это включает отчеты о пациентах, услугах, финансах и других аспектах деятельности клиники." },
    { title: 'Профиль', icon: LuUserCog, url: '/admin/profile', description: 'Управление профилем пользователя и настройками аккаунта. В этом разделе вы можете обновить личную информацию, изменить пароль, настроить уведомления и управлять другими параметрами, связанными с вашим аккаунтом.' },
]

export const ADMIN_LINKS = {
    "ADMIN": [
        { title: 'Пациенты', icon: LuUser, url: '/admin/patients' },
        { title: 'Записи на прием', icon: AkCalendar, url: '/admin/appointments' },
        { title: 'Приходы/Расходы', icon: BsBarChartLine, url: '/admin/consumptions' },
        { title: 'Первоначальные записи', icon: LuClipboardList, url: '/admin/initial-records' },
        { group: 'Управление', customClass: 'mt-2' },
        // { title: 'КПИ', icon: IcMoneySquare, url: '/admin/kpis' },
        { title: 'Докторы', icon: HeFilledDoctorMale, url: '/admin/doctors' },
        { title: 'Услуги/Процедуры', icon: McInjectionLine, url: '/admin/procedures' },
        { title: 'Профиль', icon: LuUserCog, url: '/admin/profile' },
    ],
    "DOCTOR": [
        { title: 'Пациенты', icon: LuUser, url: '/admin/patients' },
        { title: 'Записи на прием', icon: AkCalendar, url: '/admin/appointments-mine' },
        { title: 'Профиль', icon: LuUserCog, url: '/admin/profile' },
    ]
}

export const SITE_LINKS = [
    { icon: BxHomeAlt2, title: 'nav.home', url: '#' },
    { icon: FlDataUsage, title: 'nav.about', url: '#about' },
    { icon: GlStatusHealth, title: 'nav.services', url: '#services' },
    { icon: MaDoctor, title: 'nav.doctors', url: '#doctors' },
    { icon: CaPhone, title: 'nav.contacts', url: '#contacts' },
]

export const SOCIAL_LINKS = [
    { icon: CoBrandTelegramPlane, link: 'https://t.me/drikramov' },
    { icon: AnFilledInstagram, link: 'https://www.instagram.com/drikramov.uz/' },
    { icon: LaFacebookF, link: 'https://www.facebook.com/people/DrIkramov/100067140900797/' },
    { icon: AkYoutubeFill, link: 'https://www.youtube.com/channel/UC4snULI68gU11HVJEA_316Q' },
]

export const PATIENT_LINKS = [
    { url: '', title: 'Данные' },
    { url: 'appointments', title: 'Записи' },
    { url: 'initial-examinations', title: 'Лечение' },
    { url: 'xray', title: 'Рентген' },
    { url: 'photos', title: 'Фотографии' },
    { url: 'payments', title: 'Оплаты' },
]

export const PROFILE_TABS = [
    "Профиль", "Безопасность", 
    // "Push-уведомление"
]

// OTHERS

export const WORKING_HOURS = [
    // "09:00", "09:30",
    // "10:00", "10:30",
    // "11:00", "11:30",
    // "12:00", "12:30",
    // "Обед",
    // "14:00", "14:30",
    // "15:00", "15:30",
    // "16:00", "16:30",
    // "17:00", "17:30",
    // "18:00", "18:30",
    // "19:00", "19:30",
    // "20:00", "20:30",
    
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "13:00", "13:30",
    "14:00", "14:30", 
    "15:00", "15:30", 
    "16:00", "16:30", 
    "17:00", "17:30", 
    "18:00", "18:30", 
    "19:00", "19:30", 
    "20:00", "20:30", 
    "21:00"
]

export const WORKING_HOURS_TIMES = [
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "13:00", "14:00",
    "14:30", "15:00",
    "15:30", "16:00",
    "16:30", "17:00",
    "17:30", "18:00",
    "18:30", "19:00",
    "19:30", "20:00",
    "20:30", "21:00"
]

export const TOOTH_NUMBERS = [
    [18,17,16,15,14,13,12,11],
    [21,22,23,24,25,26,27,28],
    [48,47,46,45,44,43,42,41],
    [31,32,33,34,35,36,37,38],
]

export const KIDS_TOOTH_NUMBERS = [
    [55,54,53,52,51],
    [65,64,63,62,61],
    [85,84,83,82,81],
    [75,74,73,72,71],
]

export const TOOTH_HEALTH_CONDITION = [
    "CARIES", "FILLING", "DEPULPED", "PULPITIS", "PERIODONTITIS", "CROWN", "ARTIFICIAL", "ROOT", "MOBILITY", "DEPOSITS"
]

export const THERAPY_MAP = [
    { value: "ROOT", code: "R", title: "Корень" },
    { value: "CARIES", code: "C", title: "Кариес" },
    { value: "CROWN", code: "K", title: "Коронка" },
    { value: "FILLING", code: "Pl", title: "Пломба" },
    { value: "IMPLANT", code: "I", title: "Имплант" },
    { value: "PULPITIS", code: "P", title: "Пульпит" },
    { value: "MOBILITY", code: "П", title: "Подвижность" },
    { value: "REMOVED", code: "O", title: "Зуб отсутствует" },
    { value: "DEPOSITS", code: "H", title: "Зубные отложения" },
    { value: "DEPULPED", code: "Д", title: "Депульпированный" },
    { value: "PERIODONTITIS", code: "Pt", title: "Периодонтит" },
    { value: "ARTIFICIAL", code: "A", title: "Искусственный зуб" },
]

export const CONSUMPTIONS_DOWNLOAD_DATES: Record<DownloadDateTypes, string> = {
    TODAY: 'Сегодня',
    YESTERDAY: 'Вчера',
    THISWEEK: 'На этой неделе',
    LASTWEEK: 'Прошедшая неделя',
    LAST15DAYS: 'Скачать отчет за 15 дней',
    LASTMONTH: 'Скачать отчет за 1 месяц',
    LAST6MONTHS: 'Скачать отчет за 6 месяцев',
    LASTYEAR: 'Скачать отчет за 1 год',
}

export const TOOTH_CONDITIONS: Record<ToothCondition, string> = {
    ROOT: "Корень",
    CROWN: "Коронка",
    CARIES: "Кариес",
    IMPLANT: "Имплант",
    FILLING: "Пломба",
    REMOVED: "Зуб отсутствует",
    PULPITIS: "Пульпит",
    MOBILITY: "Подвижность",
    DEPOSITS: "Зубные отложения",
    DEPULPED: "Депульпированный",
    PERIODONTITIS: "Периодонтит",
    ARTIFICIAL: "Искусственный зуб",
}

export const SPECIALITIES: Record<Specialty, string> = {
    SURGEON: "Хирург",
    THERAPIST: "Терапевт",
    ORTHOPEDIST: "Ортопед",
    ORTHODONTIST: "Ортодонт",
    PERIODONTIST: "Пародонтолог",
    IMPLANTOLOGIST: "Имплантолог",
    DOCTORS_ASSISTANT: "Помощник Врача",
    PEDIATRIC_DENTIST: "Детский Стоматолог",
}

export const X_RAY_TYPES: Record<XRayType, string> = {
    "CT": "КТ",
    "OTHER": "Другое",
    "INTRAORAL": "Интраоральный",
    "UPPER_LOWER_JAW_CT": "КТ в/н/ч",
    "ORTHOPANTOMOGRAM": "Ортопантомограмма",
    "SMV_PROJECTION_TRG": "ТРГ в проекции SMV",
    "SIX_SECTION_TMJ": "6-ти секционный снимок ВНЧС",
    "FOUR_SECTION_TMJ": "4-х секционный снимок ВНЧС",
    "DIRECT_PROJECTION_TRG": "ТРГ в прямой проекции",
    "LATERAL_PROJECTION_TRG": "ТРГ в боковой проекции",
    "UPPER_LOWER_JAW_AND_TMJ_JOINTS_CT": "КТ в/н/ч и суставов ВНЧС",
    "UPPER_JAW_AND_MAXILLARY_SINUSES_CT": "КТ в/ч и гайморовых пазух",
}

export const PAYMENT_TYPES: Record<PaymentType, string> = {
    "CARD": "Картой",
    "CASH": "Наличные",
    "TRANSFER": "Перечисление",
}

export const EXAMINATION_STATUSES: Record<ExaminationStatus, string> = {
    UNPAID: "Не оплачено",
    PENDING: "Запланировано",
    FULLY_PAID: "Полностью оплачено",
    PARTIALLY_PAID: "Частично оплачено",
}

export const EXAMINATION_FILTER_STATUSES = [
    { name: "Все статусы платежа", value: "" },
    { name: "Неоплаченные", value: "UNPAID" },
    { name: "Запланированные", value: "PENDING" },
    { name: "Полностью оплаченные", value: "FULLY_PAID" },
    { name: "Частично оплаченные", value: "PARTIALLY_PAID" }
]

export const EXAMINATION_PAYMENT_STYLES: Record<ExaminationStatus, string> = {
    UNPAID: "bg-red-100 text-red-500",
    PENDING: "bg-yellow-100/50 text-yellow-500",
    FULLY_PAID: "bg-green-100 text-green-500",
    PARTIALLY_PAID: "bg-blue-100 text-blue-500",
}

export const getTimeDifferenceInMilliseconds = (date1: string, date2: string, id?: any) => {
    const time1 = date1.split('T')[1].slice(0, 5)
    const time2 = date2.split('T')[1].slice(0, 5)
    
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const d1 = new Date();
    d1.setHours(hours1, minutes1, 0, 0);

    const d2 = new Date();
    d2.setHours(hours2, minutes2, 0, 0);

    return Math.abs(d2.getTime() - d1.getTime());
}

export const timeToDecimal = (date: string) => {
    const [_, time] = date.split('T')

    // const time = new Date(date).toLocaleTimeString()
    
    const parts = time.slice(0, 5).split(":")

    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);

    return hours + minutes / 60;
}

export const todayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const getNextThreeDays = (startDate?: string) => {
    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        // return `${year}-${month}-${day}`;
        return [`${day}-${month}-${year}`,`${year}-${month}-${day}`];
    };

    const dates = [];
    const start = startDate ? new Date(startDate) : new Date();

    for (let i = 0; i < 4; i++) {
        const nextDate = new Date(start);
        nextDate.setDate(start.getDate() + i);
        dates.push(formatDate(nextDate));
    }

    return dates;
}

export const pickNeededUserFields = (user: Partial<User>) => {
    return {
        role: user.role,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        address: user.address,
        content: user.content,
        lastName: user.lastName,
        firstName: user.firstName,
        middleName: user.middleName,
        experience: user.experience,
        birthDate: user.birthDate ? String(user.birthDate).split('T')?.[0] : null,
    }
}

export const pickNeededPatientFields = (user: Partial<Patient>): Partial<Patient> => {
    return {
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        address: user.address,
        lastName: user.lastName,
        firstName: user.firstName,
        middleName: user.middleName,
        additionalPhone: user.additionalInformation,
        additionalInformation: user.additionalInformation,
        birthDate: user.birthDate ? String(user.birthDate).split('T')?.[0] : null,
    }
}

export const getDateRange = (range: DownloadDateTypes) => {
    const today = new Date();
    const startDate = new Date();
    let endDate = today;

    switch (range) {
        case 'TODAY':
            startDate.setHours(0, 0, 0, 0); // Сегодня с 00:00
            endDate.setHours(23, 59, 59, 999); // Сегодня до 23:59
            break;

        case 'YESTERDAY':
            startDate.setDate(today.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(startDate); // Вчера до 23:59
            endDate.setHours(23, 59, 59, 999);
            break;

        case 'THISWEEK':
            startDate.setDate(today.getDate() - today.getDay());
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;

        case 'LASTWEEK':
            startDate.setDate(today.getDate() - today.getDay() - 7);
            startDate.setHours(0, 0, 0, 0);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);
            break;

        case 'LAST15DAYS':
            startDate.setDate(today.getDate() - 15);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;

        case 'LASTMONTH':
            startDate.setMonth(today.getMonth() - 1);
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setMonth(today.getMonth());
            endDate.setDate(0);
            endDate.setHours(23, 59, 59, 999);
            break;

        case 'LAST6MONTHS':
            startDate.setMonth(today.getMonth() - 6);
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;

        case 'LASTYEAR':
            startDate.setFullYear(today.getFullYear() - 1);
            startDate.setMonth(0, 1); // Январь, 1
            startDate.setHours(0, 0, 0, 0);
            endDate.setFullYear(today.getFullYear() - 1);
            endDate.setMonth(11, 31); // Декабрь, 31
            endDate.setHours(23, 59, 59, 999);
            break;

        default:
            throw new Error('Invalid range type');
    }

    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
    };
}

 // Форматирование дат в строку 'гггг-мм-дд'
export const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export const getDates = (option: 0 | 1 | 2 | 3) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
    const day = today.getDate();

    switch (option) {
        case 0:
            if (day <= 15) {
                // Сегодня первая половина месяца
                const prevMonth = month === 1 ? 12 : month - 1;
                const prevYear = month === 1 ? year - 1 : year;
                const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
                const secondHalfStart = new Date(prevYear, prevMonth - 1, 16);
                const secondHalfEnd = new Date(prevYear, prevMonth - 1, daysInPrevMonth);
                return { startDate: formatDate(secondHalfStart), endDate: formatDate(secondHalfEnd) };
            } else {
                // Сегодня вторая половина месяца
                const firstHalfStart = new Date(year, month - 1, 1);
                const firstHalfEnd = new Date(year, month - 1, 15);
                return { startDate: formatDate(firstHalfStart), endDate: formatDate(firstHalfEnd) };
            }

        case 1:
            const prevMonthStart = new Date(year, month - 2, 1);
            const prevMonthEnd = new Date(year, month - 1, 0);
            return { startDate: formatDate(prevMonthStart), endDate: formatDate(prevMonthEnd) };

        case 2:
            if (month <= 6) {
                // Текущий месяц в 1-м полугодии
                const secondHalfYearStart = new Date(year - 1, 6, 1);
                const secondHalfYearEnd = new Date(year - 1, 11, 31);
                return { startDate: formatDate(secondHalfYearStart), endDate: formatDate(secondHalfYearEnd) };
            } else {
                // Текущий месяц во 2-м полугодии
                const firstHalfYearStart = new Date(year, 0, 1);
                const firstHalfYearEnd = new Date(year, 5, 30);
                return { startDate: formatDate(firstHalfYearStart), endDate: formatDate(firstHalfYearEnd) };
            }

        case 3:
            const prevYearStart = new Date(year - 1, 0, 1);
            const prevYearEnd = new Date(year - 1, 11, 31);
            return { startDate: formatDate(prevYearStart), endDate: formatDate(prevYearEnd) };
    }
}

export const exportToExcel = (data: {date: string, payments: Payment[], consumptions: Consumption[], totalProfit: number, totalConsumption: number}[], totalProfit: number, totalConsumption: number) => {
    const workbook = XLSX.utils.book_new();

    // Function to calculate the maximum width of the content in each column
    const calculateColumnWidths = (jsonData: any, headers: string[]) => {
        const colWidths = headers.map(header => ({ wch: header.length }));

        jsonData.forEach((row: any) => {
            headers.forEach((header, index) => {
                const cellValue = row[header] ? row[header].toString() : '';
                colWidths[index].wch = Math.max(colWidths[index].wch, cellValue.length);
            });
        });

        return colWidths;
    };

    // Function to fill a column with a specified color
    const fillColumnWithColor = (sheet: any, col: number, startRow: number, endRow: number, color: string) => {
        for (let row = startRow; row <= endRow; row++) {
            const cellAddress = XLSX.utils.encode_cell({ c: col, r: row });
            sheet[cellAddress] = {
                t: 's',
                s: {
                    fill: {
                        patternType: "solid",
                        fgColor: { rgb: color }
                    }
                }
            };
        }
    };

    // Create a sheet for aggregated totals
    const totalsData = [{
        'Общая прибыль': totalProfit,
        'Общая расход': totalConsumption,
        'Чистая прибыль': totalProfit - totalConsumption
    }];
    const aggregatedTotalsSheet = XLSX.utils.json_to_sheet(totalsData, { header: ['Общая прибыль', 'Общая расход', 'Чистая прибыль'] });
    aggregatedTotalsSheet['!cols'] = calculateColumnWidths(totalsData, ['Общая прибыль', 'Общая расход', 'Чистая прибыль']);
    XLSX.utils.book_append_sheet(workbook, aggregatedTotalsSheet, 'Агрегированные итоги');

    let reportIndex = 1;
    // Create sheets for each report
    data.forEach((report) => {
        const sheet = XLSX.utils.aoa_to_sheet([[]]);

        // Preprocess profits data
        const profitsData = report.payments.map((payment, index) => ({
            'No.': index + 1,
            'Доктор': payment?.examination?.doctor?.firstName + ' ' + payment?.examination?.doctor?.lastName,
            'Цена': payment.amount,
            'Тип платежа': PAYMENT_TYPES[payment.type],
            'Дата создания': new Date(payment.createdAt).toLocaleString(),
        }));
        const profitsHeaders = ['No.', 'Доктор', 'Цена', 'Тип платежа', 'Дата создания'];
        XLSX.utils.sheet_add_aoa(sheet, [profitsHeaders], { origin: 'A1' });
        XLSX.utils.sheet_add_json(sheet, profitsData, { origin: 'A2', skipHeader: true });
        sheet['!cols'] = calculateColumnWidths(profitsData, profitsHeaders);

        // Preprocess report data
        const reportData = [{
            'Дата': report.date,
            'Общая прибыль': report.totalProfit,
            'Общая расход': report.totalConsumption,
            'Чистая прибыль': report.totalProfit - report.totalConsumption
        }];
        const reportHeaders = ['Дата', 'Общая прибыль', 'Общая расход', 'Чистая прибыль'];
        const reportStartCol = profitsHeaders.length + 1;
        XLSX.utils.sheet_add_aoa(sheet, [reportHeaders], { origin: XLSX.utils.encode_cell({ c: reportStartCol, r: 0 }) });
        XLSX.utils.sheet_add_json(sheet, reportData, { origin: XLSX.utils.encode_cell({ c: reportStartCol, r: 1 }), skipHeader: true });
        sheet['!cols'] = [
            ...sheet['!cols'],
            ...new Array(reportStartCol - sheet['!cols'].length).fill({ wch: 10 }),  // Fill in empty columns
            ...calculateColumnWidths(reportData, reportHeaders)
        ];

        // Fill the gap column with gray color
        fillColumnWithColor(sheet, profitsHeaders.length, 0, Math.max(profitsData.length, 1), 'D3D3D3');

        // Preprocess consumptions data
        const consumptionsData = report.consumptions.map((consumption, index) => ({
            'No.': index + 1,
            'Название': consumption.title,
            'Описание': consumption.description,
            'Доктор': consumption.doctorId ? consumption?.doctor?.firstName + ' ' + consumption?.doctor?.lastName : '-',
            'Оплачено': consumption.amount,
            'Дата создания': new Date(consumption.createdAt).toLocaleString()
        }));
        const consumptionsHeaders = ['No.', 'Название', 'Описание', 'Доктор', 'Оплачено', 'Дата создания'];
        const consumptionsStartRow = Math.max(profitsData.length, 1) + 3; // 3 rows gap below the profits data
        XLSX.utils.sheet_add_aoa(sheet, [consumptionsHeaders], { origin: `A${consumptionsStartRow}` });
        XLSX.utils.sheet_add_json(sheet, consumptionsData, { origin: `A${consumptionsStartRow + 1}`, skipHeader: true });
        sheet['!cols'] = [
            ...sheet['!cols'],
            ...calculateColumnWidths(consumptionsData, consumptionsHeaders)
        ];

        XLSX.utils.book_append_sheet(workbook, sheet, `${reportIndex}. Отчет: ${report.date}`);
        reportIndex += 1;
    });

    // Write the workbook to a file
    XLSX.writeFile(workbook, 'reports.xlsx');
}

export const excelToJson = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    
    return new Promise((resolve, reject) => {
        if (!file) {
          reject(new Error("No file provided"));
          return;
        }
    
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
    
            // Read the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
    
            // Convert sheet to JSON
            const rawData = XLSX.utils.sheet_to_json(sheet);
    
            // Transform data to match required format
            const result = rawData.map((row: any) => ({
              patient: {
                phone: row["Имя пациента"] || "",
                firstName: row["Фамилия пациента"] || "",
                lastName: row["Телефон пациента"] || "",
              },
              startDate: row["Время начала"] ? new Date(row["Время начала"]).toISOString() : null,
              endDate: row["Время окончания"] ? new Date(row["Время окончания"]).toISOString() : null,
              doctor: {
                firstName: row["Имя доктора"] || "",
                lastName: row["Фамилия доктора"] || "",
              },
            }));
    
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
    
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

export const sortTeeth = (teethArray: Tooth[]) => {
    const ranges = [
      { start: 11, end: 18, desc: true },
      { start: 21, end: 28, desc: false },
      { start: 31, end: 38, desc: false },
      { start: 41, end: 48, desc: true },
      { start: 51, end: 55, desc: true },
      { start: 61, end: 65, desc: false },
      { start: 71, end: 75, desc: false },
      { start: 81, end: 85, desc: true }
    ];
  
    const sortedGroups: Tooth[][] = [];
  
    ranges.forEach(range => {
      const group = teethArray.filter(tooth => tooth.num >= range.start && tooth.num <= range.end)
      
      group.sort((a, b) => range.desc ? b.num - a.num : a.num - b.num)

      sortedGroups.push(group)
    })
  
    return sortedGroups;
}

export const clickFileInput = (id: string) => {
    if(!document) return

    document.getElementById(id)?.click()
}