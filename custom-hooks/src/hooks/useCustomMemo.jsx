import { useEffect, useRef } from "react"

const areEqual = (prevDeps, deps = []) => {
    if(prevDeps === null) return false
    if(prevDeps.length !== deps.length) return false

    for (let index = 0; index < prevDeps.length; index++) {
        if(prevDeps[index] !== deps[index]) return false
    }

    return true
}

const useCustomMemo = (cb, deps) => {
    let memoizedRef = useRef(null)


    if(!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)){
        memoizedRef.current = {
            value : cb(),
            deps
        }
    }

    useEffect(() => {
        return () => {
            memoizedRef.current = null
        }
    },[])

    return memoizedRef.current.value
}

export default useCustomMemo