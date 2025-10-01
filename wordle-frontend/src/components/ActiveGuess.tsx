type ActiveGuessProps = {
  guess: string;
  
};

export default function ActiveGuess({guess}:ActiveGuessProps){

function wordList(guess: string):string[]{
    return guess.padEnd(5).split("")
}

const letters = wordList(guess)

  return(
    <ul className="word-list">
     {letters.map((letter,index) => <Letter key={index} letter={letter} />)}
    </ul>
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

