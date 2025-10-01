type GuessedListProps = {
    word: string
    rightWord: string
}

export default function GuessedList({word, rightWord}: GuessedListProps){

  const letters = word.split("")

  return(
    <ul className="word-list">
      {letters.map((letter,indx) => 
        <Letter 
          key={indx} 
          letter={letter} 
          position={indx}
          rightWord={rightWord} 
      />)}
    </ul>
  )
}


type LetterProps = {
    letter: string
    position: number
    rightWord: string
}

function Letter({letter, position, rightWord}:LetterProps){

    function colorCoding(){
        if(rightWord[position] === letter){
            return "correct"
        } else if (rightWord.includes(letter)){
            return "present"
        } else {
            return "absent"
        }
    }

    const classname = colorCoding()
    
    return(
        <li className={`letter ${classname}`}>{letter}</li>
    )
}