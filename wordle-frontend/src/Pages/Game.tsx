import StartScreen from '../components/StartScreen'
import WinScreen from '../components/WinScreen'
import LostScreen from '../components/LossScreen'
import ActiveGameScreen from '../components/ActiveGameScreen'

import type { Action } from '../reducers/gameReducer'
import type { GameStatus } from '../reducers/gameReducer'
import type { User } from '../reducers/authReducer'

import styles from '../styles/Game.module.css'

type GameProps =  {
    status: GameStatus,
    guesses: string[],
    rightWord: string,
    onNewGame:()=>void,
    guess: string,
    dispatchGame: React.Dispatch<Action>,
    user: User 
    activeRow: number,
    lastGuessedRow: number
}

export default function GamePage({status,guesses,rightWord, onNewGame, guess, dispatchGame, user, activeRow, lastGuessedRow}:GameProps){

    return(
      <div className={styles.game}>
        {status === 'idle' && guesses.length === 0 && !rightWord &&
          <StartScreen 
            dispatch={dispatchGame}  
          />}
        {status === 'win' && 
          <WinScreen 
            onNewGame={onNewGame} 
            rightWord={rightWord}
            user={user}
            guesses={guesses}/>
        }
        {status === 'lost' && 
          <LostScreen 
            onNewGame={onNewGame} 
            rightWord={rightWord}
            guesses={guesses}
            user={user}
            />
        }
        {status === 'active' && 
          <ActiveGameScreen
            guesses={guesses}
            rightWord={rightWord}
            guess={guess}
            dispatchGame={dispatchGame}
            activeRow={activeRow}
            lastGuessedRow={lastGuessedRow}
          />
        }
        </div>   
    )
}
