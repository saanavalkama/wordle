import styles from '../styles/ActiveGameScreen.module.css'
import {motion, useAnimation} from 'motion/react'
import { useEffect} from 'react';

type ActiveGuessProps = {
  guess: string;
  isActive:boolean
  
};

export default function ActiveGuess({guess, isActive}:ActiveGuessProps){

function wordList(guess: string):string[]{
    return guess.padEnd(5).split("")
}

const letters = wordList(guess)

  return(
    <ul>
     {letters.map((letter,index) => <Letter key={index} letter={letter} isActive={isActive} />)}
    </ul>
  )
}

type LetterProps = {
    letter: string
    isActive: boolean
}

function Letter({letter, isActive}:LetterProps){

  const controls = useAnimation()

  useEffect(()=>{
    if(isActive){
      controls.start({
        opacity:[0,0.5,1],
        transition:{duration:0.3}
      })
    }
  },[isActive,controls])
    
    return(
        <motion.li 
          className={styles.active}
          animate={controls}
        >{letter}
        </motion.li>
    )
}

