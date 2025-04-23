import { Option, Poll } from "../types"

export const getPolls = async(pollId:string):Promise<Poll> => {
    const response = await fetch(`http://localhost:3000/polls/${pollId}`)
    if(!response.ok){
        throw new Error("Failed to fetch the poll")
    }

    return response.json()
}

export const createPoll = async(pollId:string, selectedOptions:string[]):Promise<Option[]> => {
    const poll = await getPolls(pollId)
    
    const updatedOptions = poll.options.map((element) => {
        if(selectedOptions.includes(element.id)){
            return {
                ...element,
                votes : element.votes + 1
            }
        }
        return element
    })

    const totalVotes = updatedOptions.reduce((acc, element) => acc + element.votes, 0)

    await fetch(`http://localhost:3000/polls/${pollId}`, {
        method:"PATCH",
        "headers" : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({options:updatedOptions, totalVotes})
    })

    return updatedOptions
}

export const removePoll = async (pollId:string, selectedOptions:string[]):Promise<Option[]> => {
    const poll = await getPolls(pollId)
    
    const updatedOptions = poll.options.map((element) => {
        if(selectedOptions.includes(element.id)){
            return {
                ...element,
                votes : element.votes > 0 ? element.votes - 1 : 0
            }
        }
        return element
    })

    const totalVotes = updatedOptions.reduce((acc, element) => acc + element.votes, 0)

    await fetch(`http://localhost:3000/polls/${pollId}`, {
        method:"PATCH",
        "headers" : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({options:updatedOptions, totalVotes})
    })

    return updatedOptions
}