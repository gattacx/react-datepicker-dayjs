import { Dispatch, SetStateAction } from 'react'
import { CSSProperties } from "react";

type Nullable<T> = null | T
export interface ICalendarPicker {
  placeholder?: string
  type?: 'month' | 'full'
  onChange: (value: Nullable<string>) => void
  mainColor?: string
  locale?: 'en' | 'ru'
  value: Nullable<string>
  returnedFormat?: string
  globalStyles?: CSSProperties
  calendarStyles?: CSSProperties
}

export interface IYears {
  selectedYear: number
  setSelectedYear: Dispatch<SetStateAction<number>>
  setVisibleYears: Dispatch<SetStateAction<boolean>>
  mainColor: string
}

export interface IDays {
  returnedFormat: string
  lang: 'en' | 'ru'
  mainColor: string
  currentDay: number
  selectDay: (day: number) => void
  toLeft(): void
  toRight(): void
  selectedMonth: number
  currentMonth: number
  currentYear: number
  showYears(): void
  selectedYear: number
  showMonths(): void
  value: Nullable<string>
  displayData: Array<number>
}

export interface IMonths {
  action?: (date: string) => void
  onChange: (value: Nullable<string>) => void
  type?: 'month' | 'full'
  returnedFormat: string
  selectedMonth: number
  setVisibleCalendar: Dispatch<SetStateAction<boolean>>
  selectedYear: number
  lang: 'en' | 'ru'
  setSelectedMonth: Dispatch<SetStateAction<number>>
  mainColor: string
  setSelectedYear: Dispatch<SetStateAction<number>>
  currentYear: number
  setVisibleMonths: Dispatch<SetStateAction<boolean>>
}

export type LangJSON = Record<string, string>
