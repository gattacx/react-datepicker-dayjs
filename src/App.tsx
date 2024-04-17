import {useEffect, useState} from "react";
import {CalendarPicker} from "./index.ts";
import dayjs from "dayjs";

function App() {
    const [state, setState] = useState<string>()
    useEffect(() => {

    }, [state]);
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1000px'}}>
            <CalendarPicker value={state} onChange={setState} min={dayjs(new Date()).format('YYYY-MM-DD')}/>
        </div>
    )
}

export default App