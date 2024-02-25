const { Sequelize } = require('sequelize');
const env = require('dotenv').config();

const sequelize = new Sequelize(
  env.parsed.DB_NAME,
  env.parsed.DB_USER,
  env.parsed.DB_PASS, {
    host: env.parsed.DB_HOST,
    port: env.parsed.DB_PORT,
    dialect: 'postgres'
});


module.exports = sequelize;