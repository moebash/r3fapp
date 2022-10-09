import { useState } from "react"
import ReactDOM from "react-dom"

import "./App.css"
import App from "./App"

function Overlay() {
  const [ready, set] = useState(false)
  return (
    <>
    { 
    document.addEventListener('visibilitychange', function (event) {
      if (document.hidden) {
          console.log('not visible');
      } else {
        <App />
      }
  })
    
    }
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
