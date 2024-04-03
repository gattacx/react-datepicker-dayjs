import './calendar.css'
import dayjs from 'dayjs'
import { calendar} from "./utils.ts";
import { ICalendarPicker} from "./interfaces.ts";
import calendarSvg from '../assets/calendar.svg'
import { useMemo, useRef, useState } from 'react'
import { useOnClickOutside} from "./hooks/useClickOutside.ts";
import { useTranslation} from "./hooks/useTranslation.ts";
import { Years} from "./components/years.tsx";
import { Days} from "./components/days.tsx";
import { Months} from "./components/months.tsx";

const CalendarPicker = (props: ICalendarPicker) => {
  const {
    type = 'full',
    onChange,
    mainColor = '#2F8DB3',
    lang = 'en',
    selectedDate,
    setSelectedDate,
    toRightPosition = false,
    toBottomPosition = false,
    returnedFormat = 'DD.MM.YYYY',
    placeholder = returnedFormat,
    customStyles
  } = props
  const currentMonth = Number(dayjs(new Date()).format('M'))
  const currentYear = Number(dayjs(new Date()).format('YYYY'))
  const currentDay = Number(dayjs(new Date()).format('D'))
  const calendarRef = useRef<HTMLDivElement>(null)
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth)
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [visibleCalendar, setVisibleCalendar] = useState(false)
  const [visibleYears, setVisibleYears] = useState(false)
  const [visibleMonths, setVisibleMonths] = useState(false)
  const { t } = useTranslation(lang)
  dayjs.locale('en')
  const defaultLabel = useMemo(() => {
    switch (type) {
      case 'full':
        return selectedDate ? selectedDate : placeholder
      case 'month':
        return selectedDate ? selectedDate : placeholder
    }
  }, [selectedDate])

  const displayData = useMemo(() => {
    return calendar(selectedMonth, selectedYear)
  }, [selectedMonth, selectedYear])

  const positionStyles = useMemo(() => {
    if (toBottomPosition) {
      return { bottom: '48px' }
    } else {
      return { top: '48px' }
    }
  }, [toBottomPosition])
  const changeVisible = () => setVisibleCalendar((prevState) => !prevState)
  const closeCalendar = () => setVisibleCalendar(false)

  useOnClickOutside(calendarRef, closeCalendar)

  const selectDay = (day: number, year: number = selectedYear, month: number = selectedMonth) => {
    const selected = new Date(year, month, day)
    onChange && onChange(dayjs(selected).format(returnedFormat))
    setSelectedDate(dayjs(selected).format(returnedFormat))
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
    setSelectedYear(Number(currentYear))
    setSelectedMonth(Number(currentMonth))
    setSelectedDate(null)
    onChange && onChange(null)
    setVisibleMonths(false)
    setVisibleYears(false)
    setVisibleCalendar(false)
  }
  const selectToday = () => {
    selectDay(Number(currentDay), currentYear, currentMonth)
    setSelectedYear(Number(currentYear))
    setSelectedMonth(Number(currentMonth))
    setVisibleMonths(false)
    setVisibleYears(false)
    setVisibleCalendar(false)
  }
  const showYears = () => setVisibleYears(true)
  const showMonths = () => setVisibleMonths(true)
  const CurrentShow = () => {
    if (visibleYears) {
      return (
        <Years
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          setVisibleYears={setVisibleYears}
          mainColor={mainColor}
        />
      )
    } else if (visibleMonths) {
      return (
        <Months
          selectedYear={selectedYear}
          lang={lang}
          selectedMonth={selectedMonth}
          returnedFormat={returnedFormat}
          setSelectedMonth={setSelectedMonth}
          mainColor={mainColor}
          setSelectedYear={setSelectedYear}
          currentYear={currentYear}
          setVisibleMonths={setVisibleMonths}
          setVisibleCalendar={setVisibleCalendar}
          setSelectedDate={setSelectedDate}
        />
      )
    } else {
      if (type === 'month') {
        return (
          <Months
            selectedYear={selectedYear}
            returnedFormat={returnedFormat}
            lang={lang}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            mainColor={mainColor}
            setSelectedYear={setSelectedYear}
            currentYear={currentYear}
            setVisibleMonths={setVisibleMonths}
            type={'month'}
            setVisibleCalendar={setVisibleCalendar}
            action={onChange}
            setSelectedDate={setSelectedDate}
          />
        )
      } else {
        return (
          <Days
            lang={lang}
            mainColor={mainColor}
            currentDay={currentDay}
            selectDay={selectDay}
            currentMonth={currentMonth}
            currentYear={currentYear}
            toLeft={toLeft}
            toRight={toRight}
            selectedMonth={selectedMonth}
            showYears={showYears}
            showMonths={showMonths}
            selectedYear={selectedYear}
            displayData={displayData}
            selectedDate={selectedDate}
            returnedFormat={returnedFormat}
          />
        )
      }
    }
  }
  return (
    <div className={'calendar-container'} ref={calendarRef} style={{ ...customStyles }}>
      <label style={{ color: selectedDate ? '#2E2E36' : '#7E7E7E' }}>{String(defaultLabel)}</label>
      <img src={calendarSvg} alt={'calendar'} onClick={changeVisible} />
      {visibleCalendar && (
        <div
          className={'data-container'}
          style={{
            right: toRightPosition ? 0 : 'auto',
            left: toRightPosition ? 'auto' : 0,
            ...positionStyles
          }}
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
