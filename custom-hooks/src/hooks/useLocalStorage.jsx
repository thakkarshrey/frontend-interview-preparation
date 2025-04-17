import { useState } from "react"

const is_browser = window !== undefined

export const useLocalStorage = (key, default_value) => {
    if (!is_browser) return [default_value, () => { }, () => { }]
    if (!key) throw Error("Local storage should not have a missing key")

    const stored_value = localStorage.getItem(key)
    const initial_value = stored_value ? JSON.parse(stored_value) : default_value

    const [value, setValue] = useState(initial_value)

    const set = (new_value) => {
        try {
            const value_to_be_stored = new_value instanceof Function ? new_value(value) : new_value

            if (value_to_be_stored) {
                setValue(value_to_be_stored)
                localStorage.setItem(key, JSON.stringify(value_to_be_stored))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const remove = () => {
        try {
            localStorage.removeItem(key)
            setValue("")
        } catch (error) {
            console.log(error)
        }
    }

    return [value, set, remove]
}
