import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/register", async(req, res) => {
    try{
      const {username, password, avatarUrl} = req.body

      console.log("newReq")
      console.log(username)

      const existingUser = await User.findOne({username})
      if(existingUser){
        return res.status(400).json({message: "Username is already taken"})
      }

      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password,salt)

      const newUser = new User({
        username,
        passwordHash,
        avatarUrl
      })

      await newUser.save()

      res.status(201).json({message: "User registered succesfully"})
    } catch(err){
       console.log(err)
    }
})

export default router