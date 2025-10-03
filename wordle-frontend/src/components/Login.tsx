import React, { useState } from "react"
import { login } from "../services/login"
import type { Action } from "../reducers/authReducer"
import type {Screen} from '../App'

type LoginFormProps = {
  dispatch: React.Dispatch<Action>
  setScreen: React.Dispatch<React.SetStateAction<Screen>>
}

export default function LoginForm({dispatch, setScreen}:LoginFormProps){

  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmitLogin(e:React.FormEvent){
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if(!username || !pwd){
      setError("Please enter both username and password")
      setIsLoading(false)
      return
    }

    try{
      const user = await login(username,pwd)
      console.log(user)
      //returns {username, token, avatarUrl}
      if(user){
        dispatch({type:'LOGIN_SUCCESS',payload: user})
        const userString = JSON.stringify(user)
        localStorage.setItem('user', userString)
        setScreen('game')
        setUsername("")
        setPwd("")
      } else {
        setError("Invalid credentials")
        dispatch({type:'LOGIN_ERROR'})
      }
    } catch(err) {
      console.log(err)
      if (err instanceof Error){
        setError(err.message)
      }
      dispatch({type: 'LOGIN_ERROR'})

    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="login">
      {error && 
        <div className="error-div">
          <p>{error}</p>  
        </div>}
      {isLoading &&
        <div className="screen">
          <div className="loader"></div>
        </div> 
      }
      <h2>Log in</h2>
      <form className="login-form" onSubmit={onSubmitLogin}>
        <div>
          <label>Username</label>
          <input 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={pwd}
            onChange={(e)=>setPwd(e.target.value)}
            type="password"
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}