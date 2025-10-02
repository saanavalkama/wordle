import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatarUrl: { type: String },
  stats: {
    gamesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    totalGuesses: { type: Number, default: 0 },
    avgGuesses: { type: Number, default: 0 },
    lastPlayed: { type: Date, default: null },
    fastestWin: { type: Number, default: 0 },
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
