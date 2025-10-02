import { useState } from "react"
import { registerUser } from "../services/userRegister"

export default function Register(){

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRe, setPasswordRe] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  function hasSpecialChar(password: string): boolean {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>-]/;
    return specialCharRegex.test(password);
  }

  function hasUppercase(password: string): boolean {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
  }

  function isStrongPassword(pw: string) {
    return pw.length >= 6 && hasUppercase(pw) && hasSpecialChar(pw);
  }

  async function onFormSubmit(e:React.FormEvent){
    e.preventDefault()

    if(!isStrongPassword(password)){
      setError("Password is not strong enough")
      return
    }

    if(password !== passwordRe){
      setError("passwords don't match")
      return 
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try{
       const {status, data} =  await registerUser(username,password)
       if(status === 201){
        setSuccess(data.message || "User registered succesfully")
        setPassword('')
        setUsername('')
        setPasswordRe('')
       } else {
        setError(data.message || "something went wrong")
       }
    } catch(err){ 
      if (err instanceof Error){
        setError(err.message)
      }    
    } finally {
      setIsLoading(false)
    }
  }

  return(
  <div className="register">
    <h2>Create your account</h2>
    {isLoading && <p>loading...</p>}
    {success && <p>{success}</p>}
    {error && 
      <div className="register-error">
        <p >{error}</p>
      </div>
    }
    <form className="register-form"onSubmit={onFormSubmit}>
      <div>
        <label>Username</label>
        <input
         value={username}
         onChange={(e)=> setUsername(e.target.value)}
        />
      </div>
      <div className="password-div">
        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}  
        />
        <div className="password-feedback">
            {password.length < 6 && (
              <div>
                <p>Password must be at least 6 characters long</p>
              </div>
            )}
            {!hasSpecialChar(password) && (
              <div>
                <p>password must contain special characther</p>
              </div>
            )}
            {!hasUppercase(password) && (
              <div>
                <p>password must contain uppercase letter</p>
              </div>
            )}
        </div>
      </div>
      <div>
        <label>Re-type password</label>
        <input 
          type="password"
          value={passwordRe}
          onChange={(e)=>setPasswordRe(e.target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
  </div>)
}