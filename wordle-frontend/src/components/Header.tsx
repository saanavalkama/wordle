import type { User } from "../reducers/authReducer"
import { NavLink } from "react-router-dom"
import styles from '../styles/Header.module.css'

type HeaderProps = {
  onLogOut: ()=>void,
  isLoggedIn:boolean,
  user: User | null
}

export default function Header({onLogOut, user, isLoggedIn}:HeaderProps){
  return(
    <header className={styles.header}>
      {isLoggedIn && <div className={styles.user}>
        <img src={user?.avatarUrl} />
        <div>
          <p>you are logged in:</p>
          <p>{user?.username}</p>
        </div>
      </div>
      }
      {!isLoggedIn && <NavLink to="/login">Login</NavLink> }
      
      <NavLink to="/">
      <ul>
        <li className="header-element">W</li>
        <li className="header-element">o</li>
        <li className="header-element">r</li>
        <li className="header-element">d</li>
        <li className="header-element">l</li>
        <li className="header-element">e</li>
      </ul>
      </NavLink>
      {isLoggedIn ?
       <div className={styles.links}>
        <NavLink to='/stats'>Stats</NavLink>
        <button onClick={onLogOut}>Log out</button>
       </div> : 
      <div className={styles.links}>
        <NavLink to="/register">Register</NavLink>
      </div>}
    </header>
  )
}