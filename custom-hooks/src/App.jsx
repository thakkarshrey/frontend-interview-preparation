import { useEffect, useMemo, useRef, useState } from "react"
import PostList from "./components/PostList"
import { useWindowSize } from "./hooks/useWindowSize"
import { useDebounce } from "./hooks/useDebounce"
import {useLocalStorage} from "./hooks/useLocalStorage"
import { useIntersectionObserver } from "./hooks/useIntersectionObserver"
import useCustomMemo from "./hooks/useCustomMemo"
import useCustomEffect from "./hooks/useCustomEffect"

const App = () => {
  const [input, setInput] = useState("")
  const debouncedInput = useDebounce(input, 2000, (value) =>{
    console.log('API call after debounce input', value)
  })
  const {width, height} = useWindowSize()


  const [value, set, remove] = useLocalStorage("user", "Guest")


  const ref = useRef(null)
  const options = useMemo(() =>{
    return {
      threshold:0.5
    }
  },[])
  const intersectionEntry = useIntersectionObserver(ref, options)
  console.log(intersectionEntry?.isIntersecting,'intersectionEntry')


  /* custom useMemohook */
  const [counter01, setCounter01] = useState(0)
  /* custom useMemohook */
  
  const modifiedValue = () => {
    console.log('heavy rendering')
    for (let index = 0; index < 100000000; index++) {}
    return counter01 * counter01
  }
  const doubleCounter = useCustomMemo(modifiedValue, [counter01])

  useCustomEffect(() => {
    console.log('re rendering') 
  },[])


  return (
    <>
    <h1>Width : {width}</h1>
    <h1>Height : {height}</h1>
    <PostList/>
    <button onClick={() => setCounter01(prevValue => prevValue + 1)}>Counter_01 {doubleCounter}</button>
    <div>
      {debouncedInput}
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
    <div>
      <input type="text" placeholder="Enter your name...." value={value} onChange={(e) => set(e.target.value)} />
      <button onClick={() => remove()}>Logout</button>
    </div>
    <div ref={ref} style={{backgroundColor:'lightblue', height:'200vh'}}>Shrey Thakkar</div>
    </>
  )
}
export default App