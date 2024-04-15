import {useState} from "react";
import {CalendarPicker} from "./index.ts";

function App() {
    const [state, setState] = useState<string | null>(null)
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1000px'}}>
            <CalendarPicker onChange={setState} value={state} min={'2024-04-13'} max={'2024-04-20'}/>
        </div>
    )
}

export default App