import { Dispatch, SetStateAction } from 'react'
import { CSSProperties } from "react";

export interface ICalendarPicker {
  placeholder?: string
  type?: 'month' | 'date'
  onChange: (value?: string) => void
  mainColor?: string
  locale?: 'en' | 'ru'
  value?: string
  returnedFormat?: string
  globalStyles?: CSSProperties
  calendarStyles?: CSSProperties
  min?: string
  max?: string
}

export interface IYears {
  selectedYear: number
  setSelectedYear: Dispatch<SetStateAction<number>>
  setVisibleYears: Dispatch<SetStateAction<boolean>>
  mainColor: string
}

export interface IDays {
  returnedFormat: string
  locale: 'en' | 'ru'
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
  value?: string
  displayData: Array<number>
  min?: string
  max?: string
}

export interface IMonths {
  action?: (date: string) => void
  onChange: (value?: string) => void
  type?: 'month' | 'date'
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

export interface IDay {
  selectDay: (day: number) => void
  item: number
  value?: string
  selectedYear: number
  selectedMonth: number
  returnedFormat: string
  mainColor: string
  currentMonth: number
  currentYear: number
  currentDay: number
  min?: string
  max?: string
}