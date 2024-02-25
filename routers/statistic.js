const express = require('express');
const router = express.Router();
const { Statistic } = require('../models/Statistic.js')
const { Post } = require('../models/Post.js')
const { Emoji, EMOJI_NAMES } = require('../models/Emoji.js')

router.post('/', async (req, res) => { 
  const month = req.body.month
  const year = req.body.year
  const post_type = req.body.post_type

  const allPostData = await Post.findAll({where: {post_month: month, post_year: year, post_type: post_type}})

  // make statistic like this
  const emojis = allPostData.map((data) => data.post_emoji_id).map(async (emojiId) => {
    return await Emoji.findOne({where: {emoji_id: emojiId}})
  })

  const emojiData = EMOJI_NAMES.map(async (emojiName) => {
    const emoji_count = emojis.reduce((acc, emoji) => {
      return emoji.emoji_name === emojiName ? acc + 1 : acc
    })
    return {
      'emoji_name': emojiName,
      'emoji_count': emoji_count
    }
  })

  const ranks = emojiData.map(async (data) => {
    return {
      'emoji_name': data.emoji_name,
      'emoji_count': data.emoji_count,
      'emoji_rank': emojiData.filter((emoji) => emoji.emoji_count > data.emoji_count).length + 1
    }
  })

  const statistics = ranks.map(async (rank) => {
    // regenrate statistic
    const statistic = await Statistic.drop({where: {statistic_type: post_type, statistic_year: year, statistic_month: month}})
    console.log('[STATISTIC] Drop Exist Data...', statistic)
    return await Statistic.create({
      statistic_type: post_type,
      statistic_year: year,
      statistic_month: month,
      statistic_rank: rank.emoji_rank,
      statistic_count: rank.emoji_count,
      statistic_comment: rank.emoji_name
    })
  }).filter((statistic) => statistic !== null)

  res.send(JSON.stringify(statistics, 4))
});

module.exports = router;