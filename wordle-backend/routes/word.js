import express from 'express'
const router = express.Router()

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
