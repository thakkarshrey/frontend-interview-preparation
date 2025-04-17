import { useMemo, useRef, useState } from "react"
import PostList from "./components/PostList"
import { useWindowSize } from "./hooks/useWindowSize"
import { useDebounce } from "./hooks/useDebounce"
import {useLocalStorage} from "./hooks/useLocalStorage"
import { useIntersectionObserver } from "./hooks/useIntersectionObserver"

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

  return (
    <>
    <h1>Width : {width}</h1>
    <h1>Height : {height}</h1>
    <PostList/>
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