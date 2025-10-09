import { motion } from 'motion/react'

type GuessedListProps = {
    word: string,
    rightWord: string,
    isFlipping:boolean
}

export default function GuessedList({word, rightWord,  isFlipping}: GuessedListProps){

  const letters = word.split("")

  return(
    <ul className="word-list">
      {letters.map((letter,indx) => 
        <Letter 
          key={indx} 
          letter={letter} 
          position={indx}
          rightWord={rightWord} 
          isFlipping={isFlipping}
      />)}
    </ul>
  )
}


type LetterProps = {
    letter: string
    position: number
    rightWord: string
    isFlipping: boolean
}

function Letter({letter, position, rightWord, isFlipping}:LetterProps){

    function colorCoding(){
        if(rightWord[position] === letter){
            return "rgb(24, 166, 24)"
        } else if (rightWord.includes(letter)){
            return "rgb(152, 139, 18)"
        } else {
            return "rgb(107, 104, 104)"
        }
    }

    const bgColor = colorCoding()
    
    if(!isFlipping) return(
        <li 
            className='letter'
            style={{backgroundColor: bgColor }}
        >{letter}</li>
    )

    return(
      <motion.li
        className='letter'        
        initial={{rotateX:0, backgroundColor:"rgb(107, 104, 104)"}}
        animate={{
            rotateX:[0,90,0],
            backgroundColor:['rgb(107,104,104)',bgColor,bgColor]

        }}
        transition={{
            delay:position*0.15,
            duration:0.5,
            ease:'easeInOut'
        }}
        style={{backfaceVisibility: 'hidden'}}
      >{letter}</motion.li>
    )
}