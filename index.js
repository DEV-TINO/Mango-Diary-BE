const express = require('express')
const cors = require('cors')
const sequelize = require('./psql.js')
const createError = require('http-errors');
const path = require('path');
const app = express()
const port = 3333
const emojiRouter = require('./routers/emoji.js')
const postRouter = require('./routers/post.js')
const statisticRouter = require('./routers/statistic.js')
const { insertEmojiMockData } = require('./models/Emoji.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Get Public dir....
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use('/static', express.static(__dirname + '/public'));

const migration = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('[SUCCESS] Database migration success')
    insertEmojiMockData()
  } catch(error){
    console.error(`[ERROR] Cannot Migrate Database : ${error}`)
  }
}

migration()

app.use('/emoji', emojiRouter)
app.use('/post', postRouter)
app.use('/statistic', statisticRouter)

app.get('/', (req, res) => {  
  // res.send('Hello World!')
  res.render('form')
})

// app.use((req, res, next) => {
//   next(createError(404))
// })

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('[custom Error]', err)
  res.send('error'); 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})