import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const SECRET_KEY = process.env.JWT_SECRET

export const authorize = async(req,res,next)=>{
    const authHeader = req.headers['authorization']
    if(!authHeader){
        return res.status(401).json({message:'No token provided'})
    }
    const token = authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message:'malformed token'})
    }
    try{
        if(!process.env.JWT_SECRET) throw new Error("JWT secret not defined")

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message:'user not found'})

        }
        req.user = user
        next()
    } catch (err){
        console.log(err)
    
    }
}