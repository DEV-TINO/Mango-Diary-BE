const sequelize = require('../psql')
const { DataTypes } = require('sequelize');

const EMOJI_NAMES = ['angry', 'depressed', 'happy', 'pleased', 'sad']

const Emoji = sequelize.define('Emoji', {
    emoji_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    emoji_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emoji_color_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emoji_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emoji_subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    emoji_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }
)

const insertEmojiMockData = async () => {
  const MJEmojis = [
    {
      emoji_type: 'MJ',
      emoji_color_type: 'color',
      emoji_name: 'angry',
      emoji_subtitle: 'MJ angry emoji',
      emoji_image: '/static/images/MJ/mood/angry.jpg'
    },
    {
      emoji_type: 'MJ',
      emoji_color_type: 'color',
      emoji_name: 'depressed',
      emoji_subtitle: 'MJ depressed emoji',
      emoji_image: '/static/images/MJ/mood/depressed.jpg'
    },
    {
      emoji_type: 'MJ',
      emoji_color_type: 'color',
      emoji_name: 'happy',
      emoji_subtitle: 'MJ happy emoji',
      emoji_image: '/static/images/MJ/mood/happy.jpg'
    },
    {
      emoji_type: 'MJ',
      emoji_color_type: 'color',
      emoji_name: 'pleased',
      emoji_subtitle: 'MJ pleased emoji',
      emoji_image: '/static/images/MJ/mood/pleased.jpg'
    },
    {
      emoji_type: 'MJ',
      emoji_color_type: 'color',
      emoji_name: 'sad',
      emoji_subtitle: 'MJ sad emoji',
      emoji_image: '/static/images/MJ/mood/sad.jpg'
    },
  ]

  const JYEmojis = [
    {
      emoji_type: 'JY',
      emoji_color_type: 'color',
      emoji_name: 'angry',
      emoji_subtitle: 'JY angry emoji',
      emoji_image: '/static/images/JY/color/angry.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'color',
      emoji_name: 'depressed',
      emoji_subtitle: 'JY depressed emoji',
      emoji_image: '/static/images/JY/color/depressed.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'color',
      emoji_name: 'happy',
      emoji_subtitle: 'JY happy emoji',
      emoji_image: '/static/images/JY/color/happy.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'color',
      emoji_name: 'pleased',
      emoji_subtitle: 'JY pleased emoji',
      emoji_image: '/static/images/JY/color/pleased.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'color',
      emoji_name: 'sad',
      emoji_subtitle: 'JY sad emoji',
      emoji_image: '/static/images/JY/color/sad.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'gray',
      emoji_name: 'angry',
      emoji_subtitle: 'JY angry emoji',
      emoji_image: '/static/images/JY/gray/angry.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'gray',
      emoji_name: 'depressed',
      emoji_subtitle: 'JY depressed emoji',
      emoji_image: '/static/images/JY/gray/depressed.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'gray',
      emoji_name: 'happy',
      emoji_subtitle: 'JY happy emoji',
      emoji_image: '/static/images/JY/gray/happy.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'gray',
      emoji_name: 'pleased',
      emoji_subtitle: 'JY pleased emoji',
      emoji_image: '/static/images/JY/gray/pleased.jpg'
    },
    {
      emoji_type: 'JY',
      emoji_color_type: 'gray',
      emoji_name: 'sad',
      emoji_subtitle: 'JY sad emoji',
      emoji_image: '/static/images/JY/gray/sad.jpg'
    },
  ]
  
  if ((await Emoji.findAll()).length > 1) return

  for (const emoji of MJEmojis){
    await Emoji.create(emoji)
  }
  
  for (const emoji of JYEmojis){
    await Emoji.create(emoji)
  }
}


module.exports = { Emoji, insertEmojiMockData, EMOJI_NAMES};