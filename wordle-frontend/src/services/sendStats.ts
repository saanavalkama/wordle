import axios from "axios"

type gameResult = {
    won: boolean,
    guesses: number,
    score: number
}

type User = {
  token: string
}

export async function sendStats(gameResult : gameResult, user?: User){
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