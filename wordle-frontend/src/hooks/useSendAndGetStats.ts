import  {useEffect, useState} from 'react'
import type {User} from '../reducers/authReducer'
import { sendStats } from '../services/sendStats'

type SendStats = {
  won: boolean,
  guesses: number,
  score: number
}

export function useSendAndGetStats(user : User, game:SendStats){

    const [stats, setStats] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        if(!user || !game) return 
        async function sendAndGetStats() {
          setError('')
          setIsLoading(true)
          try{
            const res = await sendStats(game,user)
            if(res){
              setStats(res.stats)
            }
          } catch(err){
            if (err instanceof Error){
                setError(err.message)
            }
          } finally {
            setIsLoading(false)
          }
        }
        sendAndGetStats()
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      return {stats, isLoading, error}
}