
const sequelize = require('../psql')
const { DataTypes } = require('sequelize');

const Statistic = sequelize.define('Statistic', {
  statistic_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  statistic_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  statistic_year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statistic_month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  statistic_rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  statistic_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  statistic_comment: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  }
})

module.exports = { Statistic }