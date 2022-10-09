import { useState } from "react"
import ReactDOM from "react-dom"
import { usePageVisibility } from 'react-page-visibility';

import "./App.css"
import App from "./App"

function Overlay() {
  const [ready, set] = useState(false)
  const isVisible = usePageVisibility()
  
  return (
    <>
     <App />
      <div className="dot" />
      <div className={`fullscreen bg ${ready ? "ready" : "notready"} ${ready && "clicked"}`}>
        <div className="stack">
          <button onClick={() => set(true)}>Click (needs fullscreen)</button>
        </div>
       
      </div>
    </>
  )
}

ReactDOM.render(<Overlay />, document.getElementById("root"))
