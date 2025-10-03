/* eslint-disable no-case-declarations */
export type Action = 
  | {type: 'setWord', payload: string}
  | {type:'startClick'}
  | {type:'inputFieldChange', payload: string}
  | {type: 'win'}
  | {type:'rematch'}
  | {type:'submitWord',payload:string}
  | {type:'lost'}


export type GameStatus = 
  | 'idle'
  | 'active'
  | 'win'
  | 'lost'

export interface State {
    rightWord: string;
    guess: string;
    status: GameStatus; 
    guesses: string[]
  }


export const initialGameState : State = {
  rightWord:'',
  guess:'',
  //statuses: idle, active, win, lost,
  status:'idle',
  guesses:[]
}

export function gameReducer(state : State, action : Action):State{
    switch (action.type){
      case 'setWord':
        return {...state, status:'idle', rightWord: action.payload}
      case 'startClick':
        return {...state, status:'active',guess:'',guesses:[]}
      case 'inputFieldChange':
        return {...state, guess: action.payload}
      case 'win':
        return {...state, status: 'win'}
      case 'rematch':
        return initialGameState
      case 'submitWord':
        const newGuesses = [...state.guesses, action.payload]
        const hasWon =  state.rightWord === action.payload
        const hasLost = !hasWon && newGuesses.length >= 6
        return {...state, guesses: newGuesses, guess:'', status: hasWon ? 'win' : hasLost ? 'lost' : 'active'}
      case "lost":
        return {...state, status:'lost'}
      default:
        throw new Error('Unknown action')
    }
  }