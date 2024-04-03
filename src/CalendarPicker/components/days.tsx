import toLeftSvg from '../../assets/to_left.svg'
import { calendar, monthList} from "../utils.ts";
import toRightSvg from '../../assets/to_right.svg'
import { useTranslation} from "../hooks/useTranslation.ts";
import { IDays} from "../interfaces.ts";
import { useMemo } from 'react'
import dayjs from 'dayjs'

export const Days = (props: IDays) => {
  const {
    lang,
    displayData,
    mainColor,
    currentDay,
    selectDay,
    toLeft,
    toRight,
    selectedMonth,
    showYears,
    selectedYear,
    showMonths,
    value,
    returnedFormat,
    currentYear,
    currentMonth
  } = props
  const { t } = useTranslation(lang)

  const displayDataDoMonth = useMemo(() => {
    if (displayData) {
      const daysDoMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay()
      const returnedDay = daysDoMonth === 0 ? 6 : daysDoMonth - 1
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
      if (daysOfMonth > 0 && daysOfMonth !== 7) {
        return calendar(Number(selectedMonth) + 1, Number(selectedYear)).slice(0, 7 - daysOfMonth)
      } else {
        return []
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
          <label>{t('monday')}</label>
          <label>{t('tuesday')}</label>
          <label>{t('wednesday')}</label>
          <label>{t('thursday')}</label>
          <label>{t('friday')}</label>
          <label>{t('saturday')}</label>
          <label style={{ color: '#FF5B5B' }}>{t('sunday')}</label>
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
              <button
                type={'button'}
                className={'hover-class'}
                onClick={() => selectDay(item)}
                value={item}
                key={index}
                style={{
                  background:
                    value ===
                    dayjs(new Date(selectedYear, selectedMonth, item)).format(returnedFormat)
                      ? mainColor
                      : dayjs(new Date(currentYear, currentMonth, item)).format(returnedFormat) ===
                            dayjs(new Date(selectedYear, selectedMonth, item)).format(
                              returnedFormat
                            ) && item === currentDay
                        ? '#D8DDED'
                        : 'none',
                  color:
                    value ===
                    dayjs(new Date(selectedYear, selectedMonth, item)).format(returnedFormat)
                      ? 'white'
                      : '#2E2E36'
                }}
              >
                {item}
              </button>
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
