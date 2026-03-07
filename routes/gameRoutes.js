const express = require("express");
const router = express.Router();
const db = require("../config/firebase");
const admin = require("firebase-admin");

const db = admin.database();
const playersRef = db.ref("players");

// Spin route
router.post("/spin", async (req, res) => {
  try {
    const { playerId, bet } = req.body;

    const snapshot = await playersRef.child(playerId).once("value");
    const player = snapshot.val();

    if (!player) return res.status(404).json({ message: "Player not found" });
    if (player.coins < bet) return res.status(400).json({ message: "Not enough coins" });

    player.coins -= bet;

    const win = Math.random() < 0.3;
    let winAmount = 0;
    if (win) {
      winAmount = bet * 2;
      player.coins += winAmount;
    }

    await playersRef.child(playerId).set(player);

    res.json({ win, winAmount, remainingCoins: player.coins });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "Game route working" });
});

module.exports = router;