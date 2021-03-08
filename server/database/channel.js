const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const Channel = db.define('Channel', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  sequelize:db,
  logging: false,
});

Channel.getAll = async function (){
  const results = await this.findAll();
  return results.map(d=>d.dataValues);
}

module.exports = Channel;

// /const jane = Channel.findAll()