import React, { useState } from "react"
import { login } from "../services/login"
import type { Action } from "../reducers/authReducer"
import { useNavigate } from "react-router-dom"
import styles from '../styles/Login.module.css'


type LoginFormProps = {
  dispatch: React.Dispatch<Action>
}

export default function LoginForm({dispatch}:LoginFormProps){

  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

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
        setUsername("")
        setPwd("")
        navigate("/")
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
    <div className={styles.login}>
      {error && 
        <div className={styles.error}>
          <p>{error}</p>  
        </div>}
      {isLoading &&
        <div className="screen">
          <div className="loader"></div>
        </div> 
      }
      <h2>Log in</h2>
      <form className={styles.form} onSubmit={onSubmitLogin}>
        <input 
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          value={pwd}
          onChange={(e)=>setPwd(e.target.value)}
          type="password"
          placeholder="password"
          required
        />
        <button>Submit</button>
      </form>
    </div>
  )
}