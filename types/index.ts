export interface TableHeaders {
  name: string
  value: string
  custom?: boolean
  customClass?: string
  sortingField?: string
  balancedText?: boolean
  hideTitleInMobile?: boolean
}

export interface TableProps<TableItemType> {
  count: number
  loading?: boolean
  hideTop?: boolean
  expanded?: boolean
  totalPages?: number
  hideBottom?: boolean
  hideSearch?: boolean
  customClass?: string
  cursoredRow?: boolean
  customFilters?: any[]
  searchClient?: boolean
  items: TableItemType[]
  headers: TableHeaders[]
  sortingClient?: boolean
}

export type AlertMessageStatuses = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR'

export type AlertMessage = {
  id: number
  message: string
  type: AlertMessageStatuses
}

export type PlanExaminations = {
  toothId: number
  condition?: string[]
  treatments: Treatment[]
  patientId: number
  examinationId: number | null 
}

export type ToothConditionLocale = {
  id?: number
  isEdit?: boolean
  toothNum: number
  toothCondition: ToothCondition[]
}

export interface IUser {
  userId: number
  isSuperUser?: boolean
  userRole: string | UserRole
}

export type DownloadDateTypes = "TODAY" | "YESTERDAY" | "THISWEEK" | "LASTWEEK" | "LAST15DAYS" | "LASTMONTH" | "LAST6MONTHS" | "LASTYEAR"

export type UserRole = "ADMIN" | "DOCTOR";

export type Specialty = "THERAPIST" | "ORTHOPEDIST" | "ORTHODONTIST" | "SURGEON" | "IMPLANTOLOGIST" | "PERIODONTIST" | "PEDIATRIC_DENTIST" | "DOCTORS_ASSISTANT";

export type Gender = "MALE" | "FEMALE";

export type ToothCondition = "CARIES" | "FILLING" | "DEPULPED" | "PULPITIS" | "PERIODONTITIS" | "CROWN" | "ARTIFICIAL" | "IMPLANT" | "ROOT" | "MOBILITY" | "DEPOSITS" | "REMOVED";

export type XRayType = "INTRAORAL" | "ORTHOPANTOMOGRAM" | "CT" | "UPPER_LOWER_JAW_CT" | "UPPER_LOWER_JAW_AND_TMJ_JOINTS_CT" | "UPPER_JAW_AND_MAXILLARY_SINUSES_CT" | "LATERAL_PROJECTION_TRG" | "DIRECT_PROJECTION_TRG" | "SMV_PROJECTION_TRG" | "FOUR_SECTION_TMJ" | "SIX_SECTION_TMJ" | "OTHER";

export type ExaminationStatus = "PENDING" | "FULLY_PAID" | "PARTIALLY_PAID" | "UNPAID";

export type PaymentType = "CASH" | "CARD" | "TRANSFER";

export interface Service {
  id: number;
  title: string;
  description?: string | null;
  appointments: Appointment[];
  procedures: Procedure[];
}

export interface Procedure {
  id: number;
  code?: string | null;
  title_en: string;
  title_ru?: string | null;
  title_uz?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  description_uz?: string | null;
  serviceId: number;
  service: Service;
  price: number;
  isPublic: boolean;
  treatments: Treatment[];
  kpis: KpiPercent[];
}

export interface KpiPercent {
  id: number;
  percent: number;
  doctorId: number;
  doctor: User;
  procedureId: number;
  procedure: Procedure;
}

export interface InitialRecord {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  notes?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  phone: string;
  additionalPhone?: string | null;
  avatar?: string | null;
  email?: string | null;
  birthDate?: Date | string | null;
  gender: Gender;
  age?: number | null;
  address?: string | null;
  additionalInformation?: any | null;
  doctorId?: number | null;
  doctor?: User | null;
  lastVisit?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  appointments: Appointment[];
  teeth: Tooth[];
}

export interface Appointment {
  id: number;
  patientId: number;
  patient: Patient;
  doctorId: number;
  doctor: User;
  serviceId?: number | null;
  service?: Service | null;
  startDate: Date | string;
  endDate?: Date | string | null;
  description?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Tooth {
  id: number;
  num: number;
  condition: ToothCondition[];
  patientId: number;
  patient: Patient;
  images: string[];
  xRayData: XRayData[];
  examinations: Examination[];
}

export interface XRayData {
  id: number;
  examinationDate: Date | string;
  type: XRayType;
  toothId: number;
  tooth: Tooth;
  amount: number;
  dose: number;
  conclusion?: string | null;
  images: string[];
}

export interface Examination {
  id: number;
  toothId: number;
  tooth: Tooth;
  toothCondition: ToothCondition[];
  doctorId?: number | null;
  doctor?: User | null;
  status: ExaminationStatus;
  sum: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  treatments: Treatment[];
  payments: Payment[];
}

export interface Treatment {
  id: number;
  procedureId?: number | null;
  procedure?: Procedure | null;
  examinationId?: number | null;
  examination?: Examination | null;
  isCompleted: boolean;
  completedAt?: Date | string | null;
  price: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Payment {
  id: number;
  examinationId?: number | null;
  examination?: Examination | null;
  amount: number;
  type: PaymentType;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Consumption {
  id: number;
  title: string;
  description?: string | null;
  isSalary: boolean;
  doctorId?: number | null;
  doctor?: User | null;
  amount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface User {
  id: number;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  avatar?: string | null;
  email?: string | null;
  address?: string | null;
  birthDate?: Date | string | null;
  balance: number;
  specialties: Specialty[];
  experience?: number | null;
  content?: string | null;
  rating: number;
  isPublished: boolean;
  isSuperUser: boolean;
  role: UserRole;
  createdAt: Date | string;
  updatedAt: Date | string;
  appointments: Appointment[];
  patients: Patient[];
  examinations: Examination[];
  salaries: Consumption[];
  kpis: KpiPercent[];
}