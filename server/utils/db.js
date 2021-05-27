const { Sequelize } = require('sequelize');
const {dbFile} = require('../config');

const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: dbFile,
  dialectOptions: {
    mode: 'SQLITE_CONFIG_MULTITHREAD'
  }
});

module.exports = sequelize;