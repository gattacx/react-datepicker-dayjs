import { useMemo } from 'react'
import { years} from "../utils.ts";
import { IYears} from "../interfaces.ts";
import toLeftSvg from '../../assets/to_left.svg'
import toRightSvg from '../../assets/to_right.svg'
export const Years = (props: IYears) => {
  const { selectedYear, setSelectedYear, setVisibleYears, mainColor } = props

  const toLeft = () => {
    if (selectedYear > 1980) {
      setSelectedYear((prevState) => Number(prevState) - 12)
    }
  }
  const toRight = () => {
    if (selectedYear < 2080) {
      setSelectedYear((prevState) => Number(prevState) + 12)
    }
  }

  const yearsArray = useMemo(() => {
    return years(selectedYear)
  }, [selectedYear])

  const selectYear = (year: number) => {
    setVisibleYears(false)
    setSelectedYear(year)
  }

  const closeBlock = () => setVisibleYears(false)
  return (
    <>
      <div className={'top-panel'}>
        <button type={'button'} onClick={toLeft}>
          <img src={toLeftSvg} alt={'left'} />
        </button>
        <label onClick={closeBlock} style={{ cursor: 'pointer' }}>
          {yearsArray[0]} - {yearsArray[yearsArray.length - 1]}
        </label>
        <button type={'button'} onClick={toRight}>
          <img src={toRightSvg} alt={'right'} />
        </button>
      </div>
      <div className={'years-data'}>
        {yearsArray.map((item, index) => {
          return (
            <button
              key={index}
              type={'button'}
              onClick={() => selectYear(item)}
              style={{
                background: item === selectedYear ? mainColor : 'none',
                color: item === selectedYear ? 'white' : '#2E2E36'
              }}
            >
              {item}
            </button>
          )
        })}
      </div>
    </>
  )
}
