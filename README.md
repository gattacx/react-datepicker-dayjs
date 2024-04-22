# React DatePicker

### Simple datepicker on React + dayjs

![](https://i.ibb.co/wLKhJRC/tg-image-2248843087.jpg)


## Installation
```
npm install react-datepicker-dayjs
```
Or via yarn:

```
yarn add react-datepicker-dayjs
```

```js
import { useState } from 'react'
import { CalendarPicker } from 'react-datepicker-dayjs'
// if need a default styles
import 'react-datepicker-dayjs/dist/style.css'

function App() {
    // dayjs default return is string format
	const [date, setDate] = useState<string>()
	
	return (
		<CalendarPicker value={date} onChange={setDate} />
	)
}
```

Use with react-hook-form
```js
import { CalendarPicker } from 'react-datepicker-dayjs'
import { useFormContext, Controller } from 'react-hook-form'
// if need a default styles
import 'react-datepicker-dayjs/dist/style.css'

function App() {
        const { control } = useFormContext()
	return (
            <Controller
                control={control}
                render={({ field: { onChange, value }}) => (
                <CalendarPicker
                    value={value}
                    onChange={onChange}
                />
            )}
            name={'your-key'}
        />
	)
}
```

Property                | type          | Values                          | Description                                                                                
------------------------|---------------|---------------------------------|--------------------------------------------------------------------------------------------
locale                  | string        | "en", "ru"                      | Changed language and day of started week. Default: en                                                                     
type                    | String        | "date", "full"                  | Type of returned date (when type of month, days is not show)                                                                   
onChange*               | string        | '1994-09-05'                    | Returned date or null (if reset)                   
value*                  | string        | '1994-09-05'                    | Show date or placeholder                                                               
returnedFormat          | string        | "YYYY.MM.DD", "MM.YYYY" and etc | Returned format of value, default: 'YYYY-MM-DD'
placeholder             | string        | any string                      | default placeholder it's returnedFormat   
globalStyles            | CSSProperties | any styles                      | Styles for global container                                                       
calendarStyles          | CSSProperties | any styles                      | Styles for calendar container                                                                        
mainColor               | string        | any color                       | Color is active date. Default: #2F8DB3                                                 
min                     | string        | none, "2024-04-12"              | Min date for select. Default: none
max                     | string        | none, "2024-05-12"              | Max date for select. Default: none

### Todos

- Tests
- Documentation


# Please create a discussion if you have any comments or suggestions, thank you.

