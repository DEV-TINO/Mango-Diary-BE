const express = require('express');
const router = express.Router();
const { Post } = require('../models/Post.js')
const { Emoji } = require('../models/Emoji.js')

router.post('/all', async (req, res) => { 
  const post_month = req.body.post_month
  const post_year = req.body.post_year
  const post_type = req.body.post_type

  const allPostData = await Post.findAll({where: {post_month: post_month, post_year: post_year, post_type: post_type}})
  const result = allPostData.map((data) => {
    return {
      'post_id': data.post_id,
      'post_date': data.post_date,
      'post_emoji_id': data.post_emoji_id,
    }
  })
  res.send(JSON.stringify(result, 4))
})

router.get('/:id', async (req, res) => { 
  console.log('[Post] Get Request :id', req.params)
  const { id } = req.params
  const postData = await Post.findOne({where: {post_id: id}})
  res.send(JSON.stringify(postData, 4))
})

router.post('/create', async (req, res) => { 
  console.log('[Post] Create Request >> req.body', req.body)
  const post_type = req.body.post_type
  const post_year = req.body.post_year
  const post_month = req.body.post_month
  const post_date = req.body.post_date
  const post_emoji_id = req.body.post_emoji_id
  const post_content = req.body.post_content

  if (req.body == {}) {
    response['success'] = false
    response['post_id'] = false
    res.send(JSON.stringify(response, 4))
    return 
  }

  const post_upload_image = await Emoji.findOne({where: {emoji_id: post_emoji_id}})?.emoji_image ?? 'error'
  console.log('post_upload_image', post_upload_image)
  const response = {}

  try {
    const post = await Post.create({
      'post_type': post_type,
      'post_year': post_year,
      'post_month': post_month,
      'post_date': post_date,
      'post_emoji_id': post_emoji_id,
      'post_content': post_content,
      'post_upload_image': post_upload_image
    })
    response['success'] = true
    response['post_id'] = post.post_id
  } catch(error){
    response['success'] = false
    response['post_id'] = false
  }
  res.send(JSON.stringify(response, 4))
});

module.exports = router;