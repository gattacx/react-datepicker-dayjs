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
import '../../../node_modules/react-datepicker-dayjs/dist/style.css'

function App() {
    // dayjs default return is string format
	const [date, setDate] = useState<string | null>()
	
	return (
		<DatePicker value={date} onChange={setDate} />
	)
}
```

Use with react-hook-form
```js
import { CalendarPicker } from 'react-datepicker-dayjs'
import { useFormContent, Controller } from 'react-hook-form'
// if need a default styles
import '../../../node_modules/react-datepicker-dayjs/dist/style.css'

function App() {
    
	return (
            <Controller
                control={control}
                render={({ field: { onChange, value }, 
                         fieldState: { error } }) => (
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
type                    | String        | "month", "full"                 | Type of returned date (when type of month, days is not show). Default: full                                                                    
onChange*               | string, null  | null, '1994-09-05'              | Returned date or null (if reset)                   
value*                  | string, null  | null, '1994-09-05'              | Show date or placeholder                                                               
returnedFormat          | string        | "YYYY.MM.DD", "MM.YYYY" and etc | Returned format of value, default: 'YYYY-MM-DD'
placeholder             | string        | any string                      | default placeholder it's returnedFormat   
globalStyles            | CSSProperties | any styles                      | Styles for global container                                                       
calendarStyles          | CSSProperties | any styles                      | Styles for calendar container                                                                        
mainColor               | string        | any color                       | Color is active date. Default: #2F8DB3                                                 
min                     | string        | none, "2024-04-12"              | Min date for select. Default: none
max                     | string        | none, "2024-05-12"              | Max date for select. Default: none

### Todos

- More variables to response
- Calendar type according to international standard
- Tests
- Documentation

