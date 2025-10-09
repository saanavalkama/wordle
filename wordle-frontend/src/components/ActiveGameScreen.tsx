import type { Action } from "../reducers/gameReducer"
import GuessedList from "./GuessedList"
import ActiveGuess from "./ActiveGuess"
import EmptyGuess from "./EmptyGuess"
import InputField from "./InputField"
import Feedback from "./Feeback"

import styles from '../styles/ActiveGameScreen.module.css'


type ActiveGameScreenProps = {
  guesses: string[],
  rightWord: string,
  guess: string,
  dispatchGame: React.Dispatch<Action>,
  activeRow:number,
  lastGuessedRow:number

}

export default function ActiveGameScreen({guesses, rightWord, guess, dispatchGame, activeRow, lastGuessedRow}:ActiveGameScreenProps){

  const maxRows = 6
  console.log(activeRow)

  return(
    <div className={styles.activeGame}>
      <div>
        {Array.from({length: maxRows}).map((_, rowIndex)=>{
          if(rowIndex < guesses.length){
            return(
              <GuessedList
                key={rowIndex}
                rightWord={rightWord}
                word={guesses[rowIndex]}
                isFlipping={rowIndex === lastGuessedRow}
              />
            )
          } if(rowIndex === activeRow){
            return( 
            <ActiveGuess key={rowIndex} guess={guess} isActive={true}/>)
          } else{
            return <EmptyGuess key={rowIndex}/>
          }
        })}
      </div>
      <InputField 
          dispatch={dispatchGame} 
          guess={guess} 
      />
      <Feedback correctWord={rightWord} guesses={guesses}/>
    </div>
  )
}