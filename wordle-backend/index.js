import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import mongoose from "mongoose"

//routes
import wordRoutes from "./routes/word.js"
import authRoutes from "./routes/auth.js"
import statRoutes from "./routes/stats.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.mongoDB)
  .then(()=>console.log("MongoDB connected"))
  .catch(err => console.log(err))


app.use("/api/word", wordRoutes);
app.use("/api/auth",authRoutes)
app.use("/api/stats",statRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
})



