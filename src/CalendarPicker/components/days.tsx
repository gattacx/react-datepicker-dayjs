import toLeftSvg from '../../assets/to_left.svg'
import {calendar, monthList} from "../utils.ts";
import toRightSvg from '../../assets/to_right.svg'
import { useTranslation} from "../hooks/useTranslation.ts";
import { IDays} from "../interfaces.ts";
import { useMemo } from 'react'
import {Day} from "./day.tsx";

export const Days = (props: IDays) => {
  const {
    locale,
    displayData,
    mainColor,
    selectDay,
    toLeft,
    toRight,
    selectedMonth,
    showYears,
    selectedYear,
    showMonths,
    value,
    returnedFormat,
    min,
    max
  } = props
  const { t } = useTranslation(locale)

  const displayDataDoMonth = useMemo(() => {
    if (displayData) {
      const daysDoMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay()
      const returnedDay = daysDoMonth === 0 ? (locale === 'en' ? 7 : 6) : daysDoMonth - ( locale === 'en' ? 0 : 1)
      if (returnedDay !== 0 && returnedDay !== 7) {
        return calendar(Number(selectedMonth) - 1, Number(selectedYear)).slice(-returnedDay)
      } else {
        return []
      }
    }
  }, [displayData])

  const displayDataAfterMonth = useMemo(() => {
    if (displayData) {
      const daysOfMonth = new Date(
        selectedYear,
        selectedMonth - 1,
        displayData[displayData.length - 1]
      ).getDay()
      switch (locale) {
        case "en":
          return calendar(Number(selectedMonth) + 1, Number(selectedYear)).slice(0, 7 - daysOfMonth - 1)
        case "ru":
          if (daysOfMonth > 0 && daysOfMonth !== 7) {
            return calendar(Number(selectedMonth) + 1, Number(selectedYear)).slice(0, 7 - daysOfMonth)
          } else {
            return []
          }
      }
    }
  }, [displayData])

  return (
    <>
      <div className={'top-panel'}>
        <button type={'button'} onClick={toLeft}>
          <img src={toLeftSvg} alt={'left'} />
        </button>
        <label>
          <span onClick={showMonths}>{t(monthList[selectedMonth - 1])}</span>
          &nbsp;
          <span onClick={showYears}>{selectedYear}</span>
        </label>
        <button type={'button'} onClick={toRight}>
          <img src={toRightSvg} alt={'right'} />
        </button>
      </div>

      <div className={'calendar-data'}>
        <div className={'days-of-week'}>
          {locale === 'en' && <label style={{ color: '#FF5B5B'}}>{t('sunday')}</label>}
          <label>{t('monday')}</label>
          <label>{t('tuesday')}</label>
          <label>{t('wednesday')}</label>
          <label>{t('thursday')}</label>
          <label>{t('friday')}</label>
          <label>{t('saturday')}</label>
          {locale === 'ru' && <label style={{ color: '#FF5B5B'}}>{t('sunday')}</label>}
        </div>
        <div className={'days-of-calendar'}>
          {displayDataDoMonth?.map((item: number, index: number) => {
            return (
              <button type={'button'} className={'inactive'} disabled key={index}>
                {item}
              </button>
            )
          })}
          {displayData.map((item: number, index: number) => {
            return (
             <Day selectDay={selectDay}
                  item={item}
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  returnedFormat={returnedFormat}
                  mainColor={mainColor}
                  min={min}
                  max={max}
                  key={index}
                  value={value}
                  />
            )
          })}
          {displayDataAfterMonth?.map((item: number, index: number) => {
            return (
              <button type={'button'} className={'inactive'} disabled key={index}>
                {item}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
