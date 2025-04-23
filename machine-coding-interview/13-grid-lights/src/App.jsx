import React from 'react'
import { useState } from 'react'
import "./App.css"

const App = () => {
  const [filled, setFilled] = useState([])
  const [isDeactivating, setIsDeactivating] = useState(false)
  const CONFIG = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]

  const deactivation = () => {
    setIsDeactivating(true)
    let timer = null
    timer = setInterval(() => {
      setFilled((prevValue) => {
        const temp_value = [...prevValue]
        temp_value.pop()
        if (temp_value.length === 0) {
          clearInterval(timer)
          setIsDeactivating(false)
        }
        return temp_value
      })
    }, 500);
  }

  return (
    <div className="App">
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: `repeat(${CONFIG[0].length}, 1fr)` }}>
        {
          CONFIG.flat(1).map((element, index) => {
            return element ? <button key={index} className={`grid-container__button ${filled.includes(index) && `grid-container__button-filled`}`} onClick={() => {
              const newFilled = [...filled, index]
              if (!filled.includes(index)) {
                setFilled(newFilled)
              }
              if (newFilled.length === CONFIG.flat(1).filter(Boolean).length) {
                deactivation()
              }
            }} disabled={isDeactivating}></button> : <span key={index}></span>
          })
        }
      </div>
    </div>
  )
}

export default App