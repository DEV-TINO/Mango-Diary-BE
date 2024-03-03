const express = require('express');
const router = express.Router();
const { Post } = require('../models/Post.js')
const fs = require('fs')
const multer = require('multer')
const path = require('path')


const createDirectory = ({post_type: post_type}) => {
  const staticPath = path.join('/data', 'uploadImages')
  const postPath = path.join(staticPath, post_type)
  try {
    if (!fs.existsSync(postPath)) {
      fs.mkdirSync(postPath, { recursive: true });
      console.log(`${postPath} 폴더가 생성되었습니다.`);
    } else {
      console.log(`${postPath} 폴더는 이미 존재합니다.`);
    }
    return postPath
  } catch (error) {
    console.error(`폴더 생성 중 오류가 발생했습니다: ${error}`);
    return false
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const input = {
      'post_type': req.body.post_type,
    }
    // 디렉토리 생성
    const dir = createDirectory(input);
    if (dir) {
      console.log('[storage] generated dir', dir)
      // 콜백으로 디렉토리 경로 전달
      cb(null, dir);
    } else {
      cb(new Error('Directory Creation Error'), '')
    }
  },
  filename: function (req, file, cb) {
    // 파일 이름 설정. 여기서도 동적으로 설정 가능
    cb(null, file.originalname + '-' + Date.now());
  }
})

const upload = multer({ storage: storage })


router.post('/all', async (req, res) => { 
  try {
    const { post_month, post_year, post_type } = req.body
    console.log(`[Post] Get All Request >> post_month : ${post_month}, post_year : ${post_year}, post_type : ${post_type}, req_body : ${req.body}` )
    const allPostData = await Post.findAll({where: {post_month: post_month, post_year: post_year, post_type: post_type}})
    const result = allPostData.map((data) => {
      return {
        'post_id': data.post_id,
        'post_date': data.post_date,
        'post_emoji_id': data.post_emoji_id,
      }
    })
    res.send(result)
  } catch (error) {
    console.error(`[ERROR] Cannot Get All Post Data : ${error}`)
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.get('/search/:id', async (req, res) => { 
  console.log('[Post] Get Request :id', req.params)
  const { id } = req.params
  const postData = await Post.findOne({where: {post_id: id}})
  res.send(JSON.stringify(postData, 4))
})

router.post('/create', upload.single('post_upload_image'),async (req, res) => { 
  const response = {}
  if (Object.keys(req.body).length === 0) {
    response['success'] = false
    response['post_id'] = false
    console.error('[ERROR] Request Body is Empty', req.body)
    res.send(JSON.stringify(response, 4))
    return 
  }
  
  try {
    const { post_type, post_year, post_month, post_date, post_emoji_id, post_content } = req.body
    console.log(`[Post] Create Request >> post_type : ${post_type}, post_year : ${post_year}, post_month : ${post_month}, post_date : ${post_date}, post_emoji_id : ${post_emoji_id}, post_content : ${post_content}` )
    console.log(`[Post] Create Request >> req.file : ${req.file}` )
    console.log(`[Post] Create Request >> req.body : ${req.body}` )
    const post_upload_image = req?.file ?? false
    const post = await Post.create({
      'post_type': post_type,
      'post_year': post_year,
      'post_month': post_month,
      'post_date': post_date,
      'post_emoji_id': post_emoji_id,
      'post_content': post_content,
      'post_upload_image': 'no image'
    })

    if (post_upload_image !== false) {
      const imagePath = String(req.file.path).replace('public', 'static')
      console.log('[Post] Create Request >> imagePath', imagePath)
      await post.update({
        'post_upload_image': imagePath
      })
    }

    response['success'] = true
    response['post_id'] = post.post_id
  } catch(error){
    response['success'] = false
    response['post_id'] = false
    console.error(`[ERROR] Cannot Create Post : ${error}`)
  }
  res.send(response)
});

module.exports = router;