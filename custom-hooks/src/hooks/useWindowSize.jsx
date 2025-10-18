import { useCallback, useEffect, useState } from "react"
import useThrottle from "./useThrottle"


export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width : window.innerWidth,
        height : window.innerHeight
    })

    const handleResize = () => {
        setWindowSize({
            width : window.innerWidth,
            height : window.innerHeight
        })
    }

    const throttledFn = useThrottle(handleResize, 1000)

    useEffect(() => {
        window.addEventListener('resize', throttledFn)

        return () => window.removeEventListener('resize', throttledFn)
 
    },[])

    return windowSize
}