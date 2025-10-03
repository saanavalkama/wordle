import type { User } from "../reducers/authReducer"

type HeaderProps = {
  onShowRegister: ()=>void,
  onShowLogIn: ()=>void,
  onLogOut: ()=>void,
  isLoggedIn:boolean,
  user: User | null
}

export default function Header({onShowRegister, onShowLogIn, onLogOut, user, isLoggedIn}:HeaderProps){
  return(
    <header className="header">
      {isLoggedIn && <div className="header-item">
        <img src={user?.avatarUrl} />
        <div>
          <p>you are logged in:</p>
          <p>{user?.username}</p>
        </div>
      </div>
      }
      <ul className="wordlist">
        <li className="header-element">W</li>
        <li className="header-element">o</li>
        <li className="header-element">r</li>
        <li className="header-element">d</li>
        <li className="header-element">l</li>
        <li className="header-element">e</li>
      </ul>
      {isLoggedIn ?
       <div className="buttons">
        <button>Stats</button>
        <button onClick={onLogOut}>Log out</button>
       </div> : 
      <div className="buttons">
        <button onClick={onShowRegister}>Register</button>
        <button onClick={onShowLogIn}>Log in</button>
      </div>}
    </header>
  )
}