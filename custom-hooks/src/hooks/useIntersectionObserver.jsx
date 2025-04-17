import { useEffect, useState } from "react"

export const useIntersectionObserver = (ref, options) => {
    const [intersectingEntry, setIntersectingEntry] = useState(null)

    useEffect(() => {
        if (ref.current && typeof IntersectionObserver === 'function') {
            const handler = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setIntersectingEntry(entry)
                })
            }
            const observer = new IntersectionObserver(handler, options)
            observer.observe(ref.current)

            return () => {
                observer.disconnect()
            }
        }

    }, [options])

    return intersectingEntry
}