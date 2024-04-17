import { IMonths} from "../interfaces.ts";
import { shortlyMonths} from "../utils.ts";
import { useTranslation} from "../hooks/useTranslation.ts";
import toRightSvg from '../../assets/to_right.svg'
import toLeftSvg from '../../assets/to_left.svg'
import dayjs from 'dayjs'

export const Months = (props: IMonths) => {
  const {
    selectedYear,
    lang,
    setSelectedMonth,
    selectedMonth,
    mainColor,
    setSelectedYear,
    currentYear,
    setVisibleMonths,
    type,
    setVisibleCalendar,
    returnedFormat,
    onChange,
  } = props
  const { t } = useTranslation(lang)

  const toLeft = () => {
    if (selectedYear > currentYear - 100) {
      setSelectedYear((prevState) => Number(prevState) - 1)
    }
  }
  const toRight = () => {
    if (selectedYear < currentYear + 100) {
      setSelectedYear((prevState) => Number(prevState) + 1)
    }
  }

  const selectMonth = (month: number) => {
    if (type === 'month') {
      type === 'month' && setVisibleCalendar(false)
      const selected = new Date(selectedYear, month - 1)
      onChange && onChange(dayjs(selected).format(returnedFormat))
      setSelectedMonth(month)
      setVisibleMonths(false)
    }
  }

  const closeBlock = () => setVisibleMonths(false)
  return (
    <>
      <div className={'top-panel'}>
        <button type={'button'} onClick={toLeft}>
          <img src={toLeftSvg} alt={'left'} />
        </button>
        <label onClick={closeBlock} style={{ cursor: 'pointer' }}>
          {selectedYear}
        </label>
        <button type={'button'} onClick={toRight}>
          <img src={toRightSvg} alt={'right'} />
        </button>
      </div>
      <div className={'years-data'}>
        {shortlyMonths.map((item) => {
          return (
            <button
              onClick={() => selectMonth(item.value)}
              key={item.value}
              type={'button'}
              style={{
                background: Number(item.value) === selectedMonth ? mainColor : 'none',
                color: Number(item.value) === selectedMonth ? 'white' : '#2E2E36'
              }}
            >
              {t(item.label)}
            </button>
          )
        })}
      </div>
    </>
  )
}
