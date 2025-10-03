import type React from "react";
import type { Action } from "../reducers/gameReducer";

type InputFieldProps = {
  dispatch: React.Dispatch<Action>
  guess: string,
};

export default function InputField({dispatch, guess}: InputFieldProps){

  function onType(e:React.ChangeEvent<HTMLInputElement>){
    dispatch({type:'inputFieldChange',payload:e.target.value})
  }

  function submitWord(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(guess.length !== 5) return
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