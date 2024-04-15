import {IDay} from "../interfaces.ts";
import dayjs from "dayjs";
import {returnedDate} from "../utils.ts";
import {useMemo} from "react";


export const Day = (props: IDay) => {
    const { selectDay, item, returnedFormat, selectedMonth, selectedYear, currentYear, currentMonth, currentDay, max, min, mainColor, value } = props

    const checkMinMaxDate = useMemo(() => {
        return Number(returnedDate(selectedYear, selectedMonth - 1, item, returnedFormat, 'unix')) < dayjs(min).unix()
            || Number(returnedDate(selectedYear, selectedMonth - 1, item, returnedFormat, 'unix')) > dayjs(max).unix()
    }, [selectedYear, selectedMonth])

    return (
        <button
            type={'button'}
            className={`hover-class ${checkMinMaxDate && 'inactive'}`}
            onClick={() => !checkMinMaxDate && selectDay(item)}
            value={item}
            style={{
                background:
                    value ===
                    dayjs(new Date(selectedYear, selectedMonth - 1, item)).format(returnedFormat)
                        ? mainColor
                        : dayjs(new Date(currentYear, currentMonth, item)).format(returnedFormat) ===
                        dayjs(new Date(selectedYear, selectedMonth, item)).format(
                            returnedFormat
                        ) && item === currentDay
                            ? '#D8DDED'
                            : 'none',
                color:
                    value ===
                    dayjs(new Date(selectedYear, selectedMonth - 1, item)).format(returnedFormat)
                        ? 'white'
                        : '#2E2E36'
            }}
        >
            {item}
        </button>
    )
}