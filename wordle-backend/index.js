import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import mongoose from "mongoose"

//routes
import wordRoutes from "./routes/word.js"
import authRoutes from "./routes/auth.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.mongoDB)
  .then(()=>console.log("MongoDB connected"))
  .catch(err => console.log(err))

const fallbackWords = [
  "about", "other", "which", "their", "there", "first", "would", "these", "click", "price",
  "state", "after", "world", "music", "where", "books", "links", "years", "order", "items",
  "group", "under", "games", "could", "great", "hotel", "store", "terms", "right", "local",
  "those", "using", "phone", "forum", "based", "black", "check", "index", "being", "women",
  "today", "south", "pages", "found", "house", "photo", "power", "while", "three", "total",
  "place", "think", "north", "posts", "media", "since", "guide", "board", "white", "small",
  "times", "sites", "level", "hours", "image", "title", "shall", "class", "still", "money",
  "every", "visit", "tools", "reply", "value", "press", "learn", "print", "stock", "point",
  "sales", "large", "table", "start", "model", "human", "movie", "march", "never", "users",
  "topic", "below", "field", "plant", "angle", "boost", "charm", "drive", "equal", "fancy",
  "heart", "ideal", "knife", "laugh", "magic", "novel", "pride", "quick", "relax", "share"
];


app.use("/api/word", wordRoutes);
app.use("/api/auth",authRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
})



