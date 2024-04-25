import './calendar.css'
import dayjs from 'dayjs'
import {calendar, currentDate} from "./utils.ts";
import {ICalendarPicker, TVisibleCalendar} from "./interfaces.ts";
import calendarSvg from '../assets/calendar.svg'
import { useMemo, useRef, useState } from 'react'
import { useOnClickOutside} from "./hooks/useClickOutside.ts";
import { useTranslation} from "./hooks/useTranslation.ts";
import { Years} from "./components/years.tsx";
import { Days} from "./components/days.tsx";
import { Months} from "./components/months.tsx";

const CalendarPicker = (props: ICalendarPicker) => {
  const {
    value,
    onChange,
    locale = 'en',
    type = 'date',
    returnedFormat = type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM',
    mainColor = '#2F8DB3',
    calendarStyles,
    placeholder = returnedFormat,
    globalStyles,
    min,
    max
  } = props

  const calendarRef = useRef<HTMLDivElement>(null)
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.month)
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.year)
  const [visibleCalendar, setVisibleCalendar] = useState<TVisibleCalendar>(false)
  const { t } = useTranslation(locale)
  dayjs.locale(locale)
  const defaultLabel = useMemo(() => {
    return value ? value : placeholder
  }, [value])

  const displayData = useMemo(() => {
    return calendar(selectedMonth, selectedYear)
  }, [selectedMonth, selectedYear])

  const changeVisible = () => setVisibleCalendar((prevState) => {
    if (!prevState) {
      return type === "month" ? "months" : "days"
    } else {
      return false
    }
  })
  const closeCalendar = () => setVisibleCalendar(false)

  useOnClickOutside(calendarRef, closeCalendar)

  const selectDay = (day: number, year: number = selectedYear, month: number = selectedMonth - 1) => {
    const selected = new Date(year, month, day)
    onChange && onChange(dayjs(selected).format(returnedFormat))
    setVisibleCalendar(false)
  }

  const toLeft = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12)
      setSelectedYear((prevState) => prevState - 1)
    } else {
      setSelectedMonth((prevState) => prevState - 1)
    }
  }

  const toRight = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1)
      setSelectedYear((prevState) => Number(prevState) + 1)
    } else {
      setSelectedMonth((prevState) => Number(prevState) + 1)
    }
  }

  const resetData = () => {
    setSelectedYear(Number(currentDate.year))
    setSelectedMonth(Number(currentDate.month))
    onChange && onChange()
    setVisibleCalendar(false)
  }
  const selectToday = () => {
    selectDay(Number(currentDate.day), currentDate.year, currentDate.month - 1)
    setSelectedYear(Number(currentDate.year))
    setSelectedMonth(Number(currentDate.month))
    setVisibleCalendar(false)
  }
  const showYears = () => setVisibleCalendar("years")
  const showMonths = () => setVisibleCalendar("months")
  const CurrentShow = () => {

    switch (visibleCalendar) {
      case "years":
        return <Years
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            setVisibleCalendar={setVisibleCalendar}
            mainColor={mainColor}
        />
      case "months":
        return  <Months
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            returnedFormat={returnedFormat}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            setVisibleCalendar={setVisibleCalendar}
            onChange={onChange}
            mainColor={mainColor}
            lang={locale}
            type={type}
        />
      case "days":
       return  <Days
           locale={locale}
           mainColor={mainColor}
           selectDay={selectDay}
           toLeft={toLeft}
           toRight={toRight}
           selectedMonth={selectedMonth}
           showYears={showYears}
           showMonths={showMonths}
           selectedYear={selectedYear}
           displayData={displayData}
           value={value}
           returnedFormat={returnedFormat}
           min={min}
           max={max}
       />
    }

  }
  return (
    <div className={'calendar-container'} ref={calendarRef} style={{ ...globalStyles }}>
      <div onClick={changeVisible} className={'panel-container'}>
        <label style={{color: value ? '#2E2E36' : '#7E7E7E'}}>{String(defaultLabel)}</label>
        <img src={calendarSvg} alt={'calendar'}/>
      </div>
      {visibleCalendar && (
          <div
              className={'data-container'}
              style={{...calendarStyles}}
          >
          <CurrentShow />
          <div className={'action-buttons'}>
            <button onClick={resetData} type={'button'} style={{ color: mainColor }}>
              {t('reset')}
            </button>
            <button onClick={selectToday} type={'button'} style={{ color: mainColor }}>
              {t('today')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarPicker
