
// I will use this hook along with useWindow hook, because if we consider the useWindow hook, it will re render the component on every window size change. What if there is an api call on every window size change. We cannot afford to do that. So we will deplay it. We will delay the API call after every delay milliseconds.

import { useCallback, useRef } from "react"

const useThrottle = (fn, delay) => {
    // const [throttledValue,setThrottledValue] = useState(fn)
    const lastTimeOfExecution = useRef(Date.now())

    return useCallback((...args) => {
        const now = Date.now()
        let diff = now - lastTimeOfExecution.current
        console.log('inside usecallback')
        if (diff >= delay) {
            fn(...args)
            lastTimeOfExecution.current = now
        }
    },[fn,delay])

    // useEffect(() => {
    //     let timoutId = setTimeout(() => {
    //         const now = Date.now()
    //         let diff = now - lastTimeOfExecution.current
    //         if(diff >= delay){
    //             console.log('throttling')
    //             setThrottledValue(fn)
    //             lastTimeOfExecution.current = now
    //         }
    //     }, delay - (Date.now() - lastTimeOfExecution.current));

    //     return () => {
    //         clearTimeout(timoutId)
    //     }
    // },[fn, delay])

    return throttledValue
}

export default useThrottle