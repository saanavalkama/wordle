export type Action = 
  | {type: 'setWord', payload: string}
  | {type:'error'}
  | {type:'loading'}
  | {type:'startClick'}
  | {type:'inputFieldChange', payload: string}
  | {type: 'win'}
  | {type:'rematch'}
  | {type:'submitWord',payload:string}
  | {type:'lost'}

export interface State {
    rightWord: string;
    guess: string;
    status: string; 
    guesses: string[]
  }


export const initialState : State = {
  rightWord:'',
  guess:'',
  //statuses: start, error, loading, active, win, lost
  status:'idle',
  guesses:[]
}

export function reducer(state : State, action : Action){
    switch (action.type){
      case 'setWord':
        return {...state, status:'start', rightWord: action.payload}
      case 'error':
        return {...state,status:'error'}
      case 'loading':
        return {...state, status:'loading'}
      case 'startClick':
        return {...state, status:'active',guess:'',guesses:[]}
      case 'inputFieldChange':
        return {...state, guess: action.payload}
      case 'win':
        return {...state, status: 'win'}
      case 'rematch':
        return {...state, staus:'start'}
      case 'submitWord':
        return {...state, guesses: [...state.guesses,action.payload], guess:''}
      case "lost":
        return {...state, status:'lost'}
      default:
        throw new Error('Unknown action')
    }
  }