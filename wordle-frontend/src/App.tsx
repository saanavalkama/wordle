import { useEffect, useReducer, useState} from "react"
import { initialGameState, gameReducer } from "./reducers/gameReducer"
import { initialAuthState, authReducer } from "./reducers/authReducer"
import { BrowserRouter,Routes, Route } from "react-router-dom"

//componens
import Game from './Pages/Game'
import Header from "./components/Header"
import LoginForm from "./components/Login"
import Register from "./components/Register"
import Stats from "./Pages/Stats"



export type Screen = "login" | "register" | "game" | "stats";



export default function App(){

  const [gameState, dispatchGame] = useReducer(gameReducer, initialGameState)
  const [authState, dispatchAuth] = useReducer(authReducer, initialAuthState) 
  const [hydration, setHydration] = useState(false)


  

  function onLogOut(){
    dispatchAuth({type:'LOGOUT'})
    localStorage.removeItem("user")
  }


  
  const {rightWord, guess, status, guesses, activeRow, lastGuessedRow} = gameState
  const {isLoggedIn, user} = authState
  

 
  
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
      const game = localStorage.getItem('currentGameState')
      if(game){
        const gameObj = JSON.parse(game)
        console.log(gameObj)
        dispatchGame({type:'GET_FROM_LOCALSTORAGE', payload: gameObj})
      }

      setHydration(true)
  },[])

  useEffect(()=>{
    if(hydration){
      localStorage.setItem('currentGameState',JSON.stringify(gameState))
    }
  },[gameState, hydration])
  
  function onNewGame(){
    dispatchGame({type:'rematch'})
  }
  

  if(!hydration){
    return <p>loading...</p>
  }



  return(
    <div className="app">
      <BrowserRouter>
      <Header 
        onLogOut={onLogOut}
        isLoggedIn={isLoggedIn}
        user={user}  
      />
        <Routes>
          <Route 
            path="/" 
            element={
            <Game
              status={status}
              guesses={guesses}
              rightWord={rightWord}
              onNewGame={onNewGame}
              guess={guess}
              dispatchGame={dispatchGame}
              user={user}
              activeRow={activeRow}
              lastGuessedRow={lastGuessedRow}
            />}
          />
          <Route 
            path="/login" 
            element={<LoginForm dispatch={dispatchAuth} />} 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
      
        
    </div>
  )
}







