import { useEffect, useReducer} from "react"
import {useWord} from "./hooks/useWord2"
import { initialState, reducer } from "./reducer"

//components
import InputField from './components/InputField'
import StartScreen from "./components/StartScreen"
import Game from "./components/Game"
import ActiveGuess from "./components/ActiveGuess"
import GuessedList from "./components/GuessedList"
import EmptyGuess from "./components/EmptyGuess"
import Header from "./components/Header"
import Feedback from "./components/Feeback"
import WinScreen from "./components/WinScreen"
import LostScreen from "./components/LossScreen"

export default function App(){

  const [state, dispatch] = useReducer(reducer, initialState )

  
  const {rightWord, guess, status, guesses} = state 
  console.log(rightWord)
  const {word, isLoading,error,refetch} = useWord()

  console.log(state)
  
  function onNewGame(){
    refetch()
    dispatch({type:'rematch'})
  }
  
  useEffect(()=>{
      if(word){
        dispatch({type: 'setWord', payload: word})
      }
      if(error){
        dispatch({type:'error'})
      }
      if(isLoading){
        dispatch({type:'loading'})
      }
     
    },[word, isLoading, error])

  const nEmptyFields = 6 - guesses.length


  return(
    <div className="app">
      <Header />
      {status === 'loading' && 
        <div className="screen">
          <div className="loader"></div>
        </div>}
      {status === 'error' && <p>{error}</p>}
      {status === 'start' && <StartScreen dispatch={dispatch} status={status} isLoading={isLoading} error={error}/>}
      {status === 'win' && <WinScreen onNewGame={onNewGame} rightWord={rightWord} />}
      {status === 'lost' && <LostScreen onNewGame={onNewGame} rightWord={rightWord}/>}
      {status === 'active' &&
        <Game>
          {guesses.map(guess => <GuessedList rightWord={rightWord} word={guess}/>)}
          <ActiveGuess guess={guess}/>
          {[...Array(nEmptyFields)].map((_,i)=>(<EmptyGuess key={i} />))}
          <InputField 
            dispatch={dispatch} 
            guess={guess} 
            rightWord={rightWord}
            numGuesses={guesses.length}
          />
          <Feedback correctWord={rightWord} guesses={guesses}/>
        </Game>
      }
    </div>
  )
}







