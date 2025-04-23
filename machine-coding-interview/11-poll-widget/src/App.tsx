import { useEffect, useState } from 'react'
import PollWidget from './components/poll-widget'
import { createPoll, getPolls, removePoll } from './services/apiService'
import { Poll } from './types'
import './App.css'

function App() {
  const [pollData,setPollData] = useState<Poll | null>(null)
  console.log('inside app')
    useEffect(() => {
        const fetchPoll = async(pollId:string) => {
          try {
            const response = await getPolls(pollId)
            setPollData(response)
          } catch (error) {
            console.log(error,'error')
          }
        }
        fetchPoll("10")
      },[])

      if(!pollData) return (
        <div>Loading .....</div>
      )

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <PollWidget 
      pollId={pollData?.id} 
      question={pollData?.question} 
      options={pollData?.options} 
      isMultiple={true}
      onVote={createPoll}
      onVoteRemove={removePoll}
      styles={{}}
      />

    </div>
  )
}

export default App
