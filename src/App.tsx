import {useState} from "react";
import {CalendarPicker} from "./index.ts";

function App() {
    const [state, setState] = useState<string | null>(null)
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1000px'}}>
            <CalendarPicker onChange={setState} value={state} />
        </div>
    )
}

export default App