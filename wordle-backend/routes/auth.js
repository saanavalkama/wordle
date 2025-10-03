import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/register", async(req, res) => {
    try{
      const {username, password, avatarUrl} = req.body

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

router.post("/login", async(req,res)=>{
  const {username,password} = req.body
  console.log(username)
  console.log(password)
  if(!username || !password){
    return res.status(400).json({message:'Username and password are required'})
  }
  try{
    //check if user found
    const user = await User.findOne({username})
    console.log(user)
    if(!user){
      return res.status(404).json({message:'username not found'})
    }
    //check if passwords match
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if(!isMatch){
      return res.status(401).json({message: 'wrong credentials'})
    }
    //create a token
    const payload = {id:user._id, username: user.username };
    const secret = process.env.JWT_SECRET || "secret"
    const options = { expiresIn: "1h" };

    const token = jwt.sign(payload, secret, options);
    console.log(token);

    //success+token
    res.status(200).json({
      message:'login succesfull',
      token,
      username: user.username,
      avatarUrl: user.avatarUrl
    })

  } catch (err){
    console.log(err)
  }

})

export default router