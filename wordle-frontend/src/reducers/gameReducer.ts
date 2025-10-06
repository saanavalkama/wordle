/* eslint-disable no-case-declarations */
export type Action = 
  | {type:'startClick',payload:string}
  | {type:'inputFieldChange', payload: string}
  | {type: 'win'}
  | {type:'rematch'}
  | {type:'submitWord',payload:string}
  | {type:'lost'}
  | {type: 'GET_FROM_LOCALSTORAGE', payload: GameState }


export type GameStatus = 
  | 'idle'
  | 'active'
  | 'win'
  | 'lost'

export interface GameState {
    rightWord: string;
    guess: string;
    status: GameStatus; 
    guesses: string[]
  }


export const initialGameState : GameState = {
  rightWord:'',
  guess:'',
  //statuses: idle, active, win, lost,
  status:'idle',
  guesses:[]
}

export function gameReducer(state : GameState, action : Action):GameState{
    switch (action.type){
      case 'startClick':
        return {...state, status:'active',guess:'',guesses:[],rightWord:action.payload}
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
      case "GET_FROM_LOCALSTORAGE":
        return action.payload 
      default:
        throw new Error('Unknown action')
    }
  }