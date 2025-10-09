import styles from '../styles/WinScreen.module.css'
import { useEffect, useState } from 'react'
import type {User} from '../reducers/authReducer'
import { sendStats } from '../services/sendStats'

type lostScreenProps = {
  rightWord: string,
  onNewGame: () => void
  guesses: string[],
  user: User | null
}

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

export default function LostScreen({rightWord, onNewGame, guesses, user}:lostScreenProps){

  const [stats, setStats] = useState<Stats | null>(null)

 const letters = rightWord.split("")

 const object = {
    won: false,
    guesses: guesses.length,
    score: 0
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


  console.log(stats)

  return(
    <div className={styles.screen}>
      <h2>You didn't guess the right word this time</h2>
      <p>The right word is</p>
      <ul className="word-list">
       {letters.map((letter,index) => <Letter key={index} letter={letter} />)}
    </ul>
      <button onClick={onNewGame}>New Game</button>
      {user && <Stats stats={stats} />}
    </div>
  )
}

type LetterProps = {
    letter: string
}

function Letter({letter}:LetterProps){
    
    return(
        <li className="letter">{letter}</li>
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
