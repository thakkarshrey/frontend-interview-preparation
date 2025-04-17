import React from "react"
import { useFetch } from "../hooks/useFetch"

const PostList = React.memo(() => {
    const {data, error, loading} = useFetch("https://jsonplaceholder.typicode.com/posts")

    if(loading) return (
        <>Loading ....</>
    )

    if(error) return (
        <>Error : {error.message}</>
    )
    return (
        <>
        <h1>Post List</h1>
        <ul>
        {
            data && data?.splice(0,10).map((element) => {
                return <li key={element.id}>
                    <h3>{element.title}</h3>
                    <p>{element.body}</p>
                </li>
            })
        }    
        </ul>
        </>
    )
})
export default PostList