import { useRef } from "react"

const useCustomEffect = (effect, deps) => {
    const isFirstRender = useRef(true)
    const preVDeps = useRef([])

    if(isFirstRender.current){
        const cleanupFn = effect()
        isFirstRender.current = false
        if(cleanupFn && typeof cleanupFn === "function"){
            cleanupFn()
        }
        return
    }

    let isDepsChanged = false

    if(deps) {
        if(JSON.stringify(preVDeps.current) !== JSON.stringify(deps)){
            isDepsChanged = true
        }
    }

    if(isDepsChanged) {
        const cleanupFn = effect()
        if(cleanupFn && typeof cleanupFn === "function" && deps){
            cleanupFn()
        }
    }


    preVDeps.current = deps || []
}

export default useCustomEffect