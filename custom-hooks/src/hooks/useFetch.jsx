import { useEffect, useState } from "react"

export const useFetch = (url) => {
   const[data,setData] = useState(null)
   const[loading,setLoading] = useState(false)
   const[error,setError] = useState("")

   const fetchData = async(url) => {
    try {
        setLoading(true)
        const response = await fetch(url)
        if(!response.ok) throw new Error("Response from the server was not ok")
        const json = await response.json()
        setData(json)
    } catch (error) {
        setError(error)
    } finally{
        setLoading(false)
    }
   }

   useEffect(() => {
    if(url) fetchData(url)
   },[url])
   return {data, loading, error}
}