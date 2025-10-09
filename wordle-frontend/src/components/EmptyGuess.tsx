import styles from '../styles/ActiveGameScreen.module.css'

export default function EmptyGuess(){
  return(
    <ul>
      <li className={styles.empty}></li>
      <li className={styles.empty}></li>
      <li className={styles.empty}></li>
      <li className={styles.empty}></li>
      <li className={styles.empty}></li>
    </ul>
  )
}