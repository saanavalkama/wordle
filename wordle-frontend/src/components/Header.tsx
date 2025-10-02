type HeaderProps = {
  onShowRegister: ()=>void,
}

export default function Header({onShowRegister}:HeaderProps){
  return(
    <header className="header">
      <ul className="wordlist">
        <li className="header-element">W</li>
        <li className="header-element">o</li>
        <li className="header-element">r</li>
        <li className="header-element">d</li>
        <li className="header-element">l</li>
        <li className="header-element">e</li>
      </ul>
      <div className="buttons">
        <button onClick={onShowRegister}>Register</button>
        <button>Log in</button>
      </div>     
    </header>
  )
}