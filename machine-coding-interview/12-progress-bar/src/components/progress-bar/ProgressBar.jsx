import React, { useEffect, useState } from 'react'
import "./ProgressBar.css"

const ProgressBar = ({value = 0}) => {
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        let intervalId = null
        intervalId = setInterval(() => {
            setPercentage((prevValue) => {
                if(value < 0) return 0
                if(prevValue === value) {
                    return value
                }
                else if(prevValue >= 100){
                    return 100
                }
                else {
                    return prevValue + 1
                }
            })
        }, 50);

        return () => clearInterval(intervalId)
    },[])

  return (
    <div className='progress-bar' >
        <span style={{color:percentage > 50 ? "white" : ""}}>{percentage.toFixed()}%</span>
        <div 
        className='progress-bar__progress' 
        role='progressbar' 
        aria-valuemin={0} 
        aria-valuemax={100} 
        aria-valuenow={percentage}
        // style={{width:`${percentage.toFixed()}%`}}>
        style={{transform:`scaleX(${percentage/100})`, transformOrigin:'left'}}>
        </div>
    </div>
  )
}

export default ProgressBar