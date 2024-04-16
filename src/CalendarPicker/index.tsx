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
    value,
    onChange,
    locale = 'en',
    type = 'full',
    returnedFormat = 'YYYY-MM-DD',
    mainColor = '#2F8DB3',
    calendarStyles,
    placeholder = returnedFormat,
    globalStyles,
    min,
    max
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
  const { t } = useTranslation(locale)
  dayjs.locale(locale)
  const defaultLabel = useMemo(() => {
    return value ? value : placeholder
  }, [value])

  const displayData = useMemo(() => {
    return calendar(selectedMonth, selectedYear)
  }, [selectedMonth, selectedYear])

  const changeVisible = () => setVisibleCalendar((prevState) => !prevState)
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
    setSelectedYear(Number(currentYear))
    setSelectedMonth(Number(currentMonth))
    onChange && onChange()
    setVisibleMonths(false)
    setVisibleYears(false)
    setVisibleCalendar(false)
  }
  const selectToday = () => {
    selectDay(Number(currentDay), currentYear, currentMonth - 1)
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
          lang={locale}
          selectedMonth={selectedMonth}
          returnedFormat={returnedFormat}
          setSelectedMonth={setSelectedMonth}
          mainColor={mainColor}
          setSelectedYear={setSelectedYear}
          currentYear={currentYear}
          setVisibleMonths={setVisibleMonths}
          setVisibleCalendar={setVisibleCalendar}
          onChange={onChange}
        />
      )
    } else {
      if (type === 'month') {
        return (
          <Months
            selectedYear={selectedYear}
            returnedFormat={returnedFormat}
            lang={locale}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            mainColor={mainColor}
            setSelectedYear={setSelectedYear}
            currentYear={currentYear}
            setVisibleMonths={setVisibleMonths}
            type={'month'}
            setVisibleCalendar={setVisibleCalendar}
            action={onChange}
            onChange={onChange}
          />
        )
      } else {
        return (
          <Days
            locale={locale}
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
            value={value}
            returnedFormat={returnedFormat}
            min={min}
            max={max}
          />
        )
      }
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
