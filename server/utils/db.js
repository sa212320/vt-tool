const { Sequelize } = require('sequelize');
const {dbFile} = require('../config');

const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: dbFile,
});
sequelize.query("PRAGMA journal_mode=WAL;");
module.exports = sequelize;