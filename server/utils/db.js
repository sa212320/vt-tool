const { Sequelize } = require('sequelize');
const {dbFile} = require('../config');

const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: dbFile
});

module.exports = sequelize;