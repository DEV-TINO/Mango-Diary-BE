const sequelize = require('../psql')
const { DataTypes } = require('sequelize');

const Post = sequelize.define('Post', {
  post_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  post_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  post_year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  post_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_emoji_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  post_content: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  post_upload_image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  }
})

module.exports = { Post }