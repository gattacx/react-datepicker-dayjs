import {useEffect, useState} from "react";
import {CalendarPicker} from "./index.ts";

function App() {
    const [state, setState] = useState<string>()
    useEffect(() => {

    }, [state]);
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1000px'}}>
            <CalendarPicker value={state} onChange={setState} type={'month'}/>
        </div>
    )
}

export default App