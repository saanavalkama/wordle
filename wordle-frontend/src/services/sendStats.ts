import axios from "axios"
import type {User} from '../reducers/authReducer'

type gameResult = {
    won: boolean,
    guesses: number,
    score: number
}



export async function sendStats(gameResult : gameResult, user: User){
  if(!user){
    return
  }
  
  try{
    const res = await axios.post("http://localhost:8000/api/stats", gameResult,{headers:{
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json"
    }})
    return res.data
  }catch(err){
    console.log(err)
  }
}