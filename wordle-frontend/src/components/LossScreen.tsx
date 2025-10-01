type lostScreenProps = {
  rightWord: string,
  onNewGame: () => void
}

export default function LostScreen({rightWord, onNewGame}:lostScreenProps){

 const letters = rightWord.split("")

  return(
    <div className="screen">
      <h2>You didn't guess the right word this time</h2>
      <p>The right word is</p>
      <ul className="word-list">
       {letters.map((letter,index) => <Letter key={index} letter={letter} />)}
    </ul>
      <button onClick={onNewGame}>New Game</button>
    </div>
  )
}

type LetterProps = {
    letter: string
}

function Letter({letter}:LetterProps){
    
    return(
        <li className="letter">{letter}</li>
    )
}
