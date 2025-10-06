import express from 'express'
const router = express.Router()

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

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://random-words-api.kushcreates.com/api?language=en&category=wordle&length=5&words=1"
    );

    if (!response.ok) {
      throw new Error("failed to fetch");
    }

    const data = await response.json();
    const word = data[0].word;
    
    
    res.json({ word });
  } catch (err) {
    console.error(err);
    const fallback = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    res.json({ word: fallback });
  }
});

export default router;
