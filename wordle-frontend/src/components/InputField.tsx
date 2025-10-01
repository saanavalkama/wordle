import type React from "react";
import type { Action } from "../reducer";

type InputFieldProps = {
  dispatch: React.Dispatch<Action>
  guess: string,
  rightWord: string,
  numGuesses: number
};

export default function InputField({dispatch, guess, rightWord, numGuesses}: InputFieldProps){

  function onType(e:React.ChangeEvent<HTMLInputElement>){
    dispatch({type:'inputFieldChange',payload:e.target.value})
  }

  function submitWord(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(guess.length !== 5) return

    if(guess.toLowerCase() === rightWord.toLowerCase()){
        dispatch({type:'win'})
    }
    if(numGuesses === 6){
        dispatch({type:'lost'})
    }

    dispatch({type:'submitWord',payload:guess})
  }

  return(
    <div>
      <form className="input" onSubmit={submitWord}>
        <input
          value={guess}
          onChange={onType}
          maxLength={5}
        />
        <button>Submit</button>
      </form>
    </div>

  )
}