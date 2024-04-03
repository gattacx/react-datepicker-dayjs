import {useState} from "react";
import {CalendarPicker} from "./index.ts";

function App() {
    const [state, setState] = useState<string | null>(null)
  return (
    <>
       <CalendarPicker onChange={setState} value={state}/>
    </>
  )
}

export default App
