export type Action = 
    | { type: 'LOGIN_SUCCESS', payload: User }
    | {type: 'LOGIN_ERROR'} 
    | {type: 'SET_FROM_LOCALSTORAGE', payload: User}
    | {type: 'LOGOUT'}


export type User = {
    token: string,
    username: string,
    avatarUrl: string,
    stats?: string[]
}

export interface State {
    isLoggedIn: boolean,
    user: User | null,
    token: string | null
}

export const initialAuthState = {
    isLoggedIn: false,
    user: null,
    token: null
}

export function authReducer(state:State, action: Action){
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {...state, isLoggedIn: true, user: action.payload, token: action.payload.token}
        case 'LOGIN_ERROR':
            return initialAuthState
        case 'SET_FROM_LOCALSTORAGE':
            return {...state, isLoggedIn: true, user: action.payload, token: action.payload.token }
        case "LOGOUT":
            return initialAuthState
        default:
            throw new Error("Action not found")
    }
}

/*export const LOGIN = () => {
  dispatch({})  
} */
