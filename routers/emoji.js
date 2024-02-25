const express = require('express');
const router = express.Router();
const { Emoji } = require('../models/Emoji')

// Get All Emoji
router.get('/all', async (req, res) => { 
  const allEmojiData = await Emoji.findAll()
  res.send(JSON.stringify(allEmojiData, 4))
});

// Get Emoji by ID
router.get('/search/:id', async (req, res) => { 
  const { id } = req.params
  const emojiData = await Emoji.findOne({where: {emoji_id: id}})
  res.send(JSON.stringify(emojiData, 4))
});

module.exports = router;