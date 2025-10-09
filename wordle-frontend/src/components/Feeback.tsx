import styles from '../styles/ActiveGameScreen.module.css'

type FeedbackProps = {
  correctWord: string,
  guesses: string[]

}

type LetterStatus = "correct" | "present" | "absent";

export default function Feedback({correctWord, guesses}:FeedbackProps){

const d : Record<string, LetterStatus> = {}


 for (const guess of guesses){
    for (let i = 0; i < guess.length; i++){
        if (guess[i] === correctWord[i]){
            d[guess[i]]="correct"
        } else if (correctWord.includes(guess[i])){
            if(d[guess[i]]!="correct"){
                d[guess[i]] = "present"
            }
        }
        else{
            if(d[guess[i]] === undefined){
                d[guess[i]] = "absent" 
            }
        }
    }
  }

  const ROW_ONE: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const ROW_TWO: string[] = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const ROW_THREE: string[] = ["z", "x", "c", "v", "b", "n", "m"];

  return(
    <div className={styles.keyboard}>
      <ul className={styles.keyboardRow}>{ROW_ONE.map(ele => <Letter key={ele} letter={ele} status={d[ele] ?? 'not-guessed'}/>)}</ul>
      <ul className={styles.keyboardRow}>{ROW_TWO.map(ele => <Letter key={ele} letter={ele} status={d[ele] ?? 'not-guessed' }/>)}</ul>
      <ul className={styles.keyboardRow}>{ROW_THREE.map(ele => <Letter key={ele} letter={ele} status={d[ele] ?? 'not-guessed'}/>)}</ul>
    </div>
  )
}

type LetterProps = {
    letter: string,
    status: string
}

function Letter({letter, status}:LetterProps){
    return(
      <li className={styles[status]}>{letter}</li>
    )
}