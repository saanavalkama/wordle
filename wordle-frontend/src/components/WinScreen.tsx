type WinScreenProps = {
  onNewGame: ()=> void,
  rightWord:string
  }


export default function WinScreen({onNewGame, rightWord}:WinScreenProps){

 const letters = rightWord.split("")

  return(
    <div className="screen">
      <h2>You guessed the word right</h2>
      <ul className="word-list">{letters.map((letter,index) => <Letter key={index} letter={letter} />)}</ul>
      <button onClick={onNewGame}>New game</button>
    </div>
  )
}

type LetterProps = {
    letter: string
}

function Letter({letter}:LetterProps){
    
    return(
        <li className="letter correct">{letter}</li>
    )
}
