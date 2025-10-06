import { useEffect, useState } from "react"
import { sendStats } from "../services/sendStats"
import type { User } from "../reducers/authReducer"

type WinScreenProps = {
  onNewGame: ()=> void,
  rightWord:string,
  guesses: string[],
  user: User | null
}

/*
POINTSYSTEM:
1 guess: 600p
2 guesses: 500
3 guesses: 400
4 --> 300
5 --> 200
6 --> 100
*/

type Stats = {
  gamesPlayed: number
  totalScore: number
  wins: number
  currentStreak: number
  totalGuesses: number
  avgGuesses: number 
  lastPlayed: string | null
  fastestWin: number
}




export default function WinScreen({onNewGame, rightWord, user, guesses}:WinScreenProps){

  const [stats, setStats] = useState<Stats | null>(null)

  console.log(stats)

  let scoredPoints: number;
  if(guesses.length === 1){
    scoredPoints = 600
  } else if(guesses.length === 2){
    scoredPoints = 500
  } else if(guesses.length === 3){
    scoredPoints =  400
  } else if(guesses.length === 4){
    scoredPoints = 300
  }else if(guesses.length === 5){
    scoredPoints = 200
  } else{
    scoredPoints = 100
  }

  const object = {
    won: true,
    guesses: guesses.length,
    score: scoredPoints
  }

  useEffect(()=>{
    async function sendAndGetStats() {
      if(!user){
        return
      }
      try{
        const res = await sendStats(object,user)
        if(res){
          setStats(res.stats)
        }
      } catch(err){
        console.log(err)
      } 
    }
    sendAndGetStats()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 const letters = rightWord.split("")

  return(
    <div className="screen">
      <h2>You guessed the word right</h2>
      <ul className="word-list">{letters.map((letter,index) => <Letter key={index} letter={letter} />)}</ul>
      <button onClick={onNewGame}>New game</button>
      <Stats stats={stats} />
    </div>
  )
}

type LetterProps = {
    letter: string
}

function Letter({letter}:LetterProps){
    
    return(
        <li className="letter correct">{letter}</li>
    )
}

type statsProps = {stats: Stats | null}

function Stats({stats}:statsProps){

  return(
    <div>
      <h2>Stats</h2>
      <p>total score: {stats?.totalScore}</p>
      <p>Games played: {stats?.gamesPlayed}</p>
      <p>wins: {stats?.wins}</p>
      <p>current streak: {stats?.currentStreak}</p>
      <p>total guesses: {stats?.totalGuesses}</p>
      <p>average guesses: {stats?.avgGuesses !== undefined ? Math.round(stats?.avgGuesses) : "N/A"}</p>
      <p>fastest win: {stats?.fastestWin}</p>  
      <p>Last played: {stats?.lastPlayed}</p>
    </div>
  )
}
