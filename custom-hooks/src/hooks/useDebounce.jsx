import { useEffect, useState } from "react"

export const useDebounce = (value, delay, cb = () => {}) => {
    const [newInput, setNewInput] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNewInput(value)
            cb(value)
        }, delay);

        return () => clearTimeout(timeout)
    },[value, delay])

    return newInput
}