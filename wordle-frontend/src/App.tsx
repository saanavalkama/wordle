import { useEffect, useReducer, useState} from "react"
import { initialGameState, gameReducer } from "./reducers/gameReducer"
import { initialAuthState, authReducer } from "./reducers/authReducer"

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
import LoginForm from "./components/Login"
import Register from "./components/Register"




export type Screen = "login" | "register" | "game" | "stats";



export default function App(){

  const [gameState, dispatchGame] = useReducer(gameReducer, initialGameState)
  const [authState, dispatchAuth] = useReducer(authReducer, initialAuthState) 
  const [screen, setScreen] = useState<Screen>('game')

  function showRegister(){
    setScreen('register')
  }

  function showLogin(){
    setScreen('login')
  }

  function onLogOut(){
    dispatchAuth({type:'LOGOUT'})
    localStorage.removeItem("user")
  }


  
  const {rightWord, guess, status, guesses} = gameState
  const {isLoggedIn, user, token} = authState
  

 
  
  console.log(gameState)
  console.log(authState)


  useEffect(()=>{
    const user = localStorage.getItem('user')
    if(user){
      const userObj = JSON.parse(user)
      if(userObj && userObj.token){
        dispatchAuth({type:'SET_FROM_LOCALSTORAGE', payload: userObj})
      }
    }
  },[])

  useEffect(()=>{
      const game = localStorage.getItem('currentGameState')
      if(game){
        const gameObj = JSON.parse(game)
        console.log(gameObj)
        dispatchGame({type:'GET_FROM_LOCALSTORAGE', payload: gameObj})
      }
  },[])

  useEffect(()=>{
    localStorage.setItem('currentGameState',JSON.stringify(gameState))
  },[gameState])
  
  function onNewGame(){
    dispatchGame({type:'rematch'})
  }
  

  const nEmptyFields = 5 - guesses.length


  return(
    <div className="app">
      <Header 
        onShowRegister={showRegister} 
        onShowLogIn={showLogin}
        onLogOut={onLogOut}
        isLoggedIn={isLoggedIn}
        user={user}  
      />
      {screen === 'register' && <Register />}
      {screen === 'login' && <LoginForm dispatch={dispatchAuth} setScreen={setScreen}/>}
      {screen === 'game' && isLoggedIn &&
      <Game>
        {status === 'idle' && 
          <StartScreen 
            dispatch={dispatchGame}  
            />}
        {status === 'win' && 
          <WinScreen 
            onNewGame={onNewGame} 
            rightWord={rightWord}
            user={user}
            guesses={guesses} 
          />}
        {status === 'lost' && <LostScreen onNewGame={onNewGame} rightWord={rightWord}/>}
        {status === 'active' &&
        <>
          {guesses.map((guess,indx) => <GuessedList key={indx} rightWord={rightWord} word={guess}/>)}
          <ActiveGuess guess={guess}/>
          {[...Array(nEmptyFields)].map((_,i)=>(<EmptyGuess key={i} />))}
          <InputField 
            dispatch={dispatchGame} 
            guess={guess} 
          />
          <Feedback correctWord={rightWord} guesses={guesses}/>
        </>}
      </Game>}  
    </div>
  )
}







