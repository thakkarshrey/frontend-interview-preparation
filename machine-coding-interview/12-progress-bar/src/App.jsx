import React, { useEffect, useState } from 'react'
import "./App.css"
import ProgressBar from './components/progress-bar'

const App = () => {
  
  return (
    <div className='App'><ProgressBar value={90}/></div>
  )
}

export default App