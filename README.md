# React DatePicker

### Simple datepicker on React + dayjs

![](https://i.ibb.co/7QrKqbv/tg-image-2478850552.jpg)


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

Property                | type          | Values                          | Description                                                                                
------------------------|---------------|---------------------------------|--------------------------------------------------------------------------------------------
locale                  | string        | "en", "ru"                      | Changed language and day of started week. Default: en                                                                     
type                    | String        | "month", "full"                 | Type of returned date (when type of month, days is not show). Default: full                                                                    
onChange*               | string, null  | null, '05.09.1994'              | Returned date or null (if reset)                   
value*                  | string, null  | null, '05.09.1994'              | Show date or placeholder                                                               
returnedFormat          | string        | "YYYY.MM.DD", "MM.YYYY" and etc | Returned format of value, default: 'DD.MM.YYYY'
placeholder             | string        | any string                      | default placeholder it's returnedFormat   
globalStyles            | CSSProperties | any styles                      | Styles for global container                                                       
calendarStyles          | CSSProperties | any styles                      | Styles for calendar container                                                                        
mainColor               | string        | any color                       | Color is active date. Default: #2F8DB3                                                 


### Todos

- More variables to response
- Calendar type according to international standard
- Tests
- Documentation

