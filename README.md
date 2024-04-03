# React DatePicker

### Simple datepicker on React + dayjs

![](https://i.ibb.co/Mp7JtZ7/tg-image-481559596.jpg)


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

// default state is null or string (dayjs formatted default to string).
	const [date, setDate] = useState<string | null>(null)
	
	return (
		<DatePicker value={date} onChange={setDate} />
	)
}
```

Property                | type           | Values                          | Description                                                                                
------------------------|----------------|---------------------------------|--------------------------------------------------------------------------------------------
locale                  | string         | "en", "ru"                      | Calendar language                                                                          
type                    | String         | "month", "full"                 | Type of returned date                                                                      
onChange*               | Date, null     | null, '05.09.1994'              | Returned date or null (if reset)                       
value*                  | Date, null     | null, '05.09.1994'              | Show date or placeholder                                                               
returnedFormat          | string         | "YYYY.MM.DD", "MM.YYYY" and etc | Returned format of value, default: 'DD.MM.YYYY'
globalStyles            | CSSProperties  | any styles                      | Styles for global container                                                       
calendarStyles          | CSSProperties  | any styles                      | Styles for calendar container                                                                       
placeholder             | string         | any string                      | default placeholder it's ReturnedFormat                                                
mainColor               | string         | any color                       | Color is active date. Default color: #2F8DB3                                                 


### Todos

- More variables to response
- Calendar type according to international standard
- Tests
- Documentation

### Private