import { useState } from "react";
import type { Action} from "../reducers/gameReducer";
import { fetchWord } from "../services/fetchWord";
import styles from '../styles/StartScreen.module.css'

type StartScreenProps = {
  dispatch: React.Dispatch<Action>,
}

export default function StartScreen({dispatch}:StartScreenProps){


  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const startClick = async function(){
    setError('')
    setIsLoading(true)
    try{
      const word = await fetchWord()
      dispatch({type:'startClick', payload:word})
    } catch (err){
      console.log(err)
    } finally {
      setIsLoading(false)
    } 
  }

  return(
    <div className={styles.startScreen}>
      <h2>Start new game</h2>
      {isLoading &&
        <div className="screen">
          <div className="loader"></div>
        </div> 
      } 
      {error &&
      <div className="error-div">
        <p>{error}</p>  
      </div>
      }
      <button
          onClick={startClick}
        >Start Game
       </button>
    </div>
  )
}