import express from 'express'
import User from '../models/User.js'
import { authorize } from '../middleware/auth.js'

const router = express.Router()

router.post("/",authorize, async (req,res)=>{
  try{
    const {won, guesses, score} = req.body

    console.log('won '+ won )
    console.log('guesses ' + guesses + 'type' + typeof guesses)
    console.log('score ' + score + 'type' + typeof score)

    
    if(won === undefined || guesses === null || score === null){
     return res.status(400).json({message: "missing information"})
    }
    const user = req.user
    console.log(user)

    /*stats: {
    gamesPlayed: { type: Number, default: 0 },
    totalScore:{type:Number, default: 0},
    wins: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    totalGuesses: { type: Number, default: 0 },
    avgGuesses: { type: Number, default: 0 },
    lastPlayed: { type: Date, default: null },
    fastestWin: { type: Number, default: 0 },
  },*/ 
  const parsedScore = Number(score)
  const parsedGuesses = Number(guesses)

  if(isNaN(parsedGuesses) || isNaN(parsedScore)){
    return res.status(400).json({message: 'Invalid score or guesses'})
  }

  user.stats.gamesPlayed += 1
  user.stats.totalScore += parsedScore
  user.stats.totalGuesses += parsedGuesses
  user.stats.avgGuesses = user.stats.totalGuesses / user.stats.gamesPlayed
  user.stats.lastPlayed = new Date()
  if(guesses < user.stats.fastestWin || user.stats.fastestWin === 0){
    user.stats.fastestWin = guesses
  }

  if(won){
    user.stats.wins += 1
    user.stats.currentStreak += 1
  }
  if(!won){
    user.stats.currentStreak = 0
    
  }
  
  await user.save()

  return res.status(200).json({message: 'stats updated succesfully', stats: user.stats})

  } catch (err){
    console.log(err)
  }
})

export default router