const { DataTypes, Sequelize} = require('sequelize');
const db = require('../utils/db');

const SpVideos = db.define('SpVideos', {
  videoId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  channelId: {
    type: DataTypes.STRING,
  },
  channelName: {
    type: DataTypes.STRING,
  },
  channelPhoto: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  sequelize:db,
  logging: false,
});

SpVideos.getAll = async function (){
  const results = await this.findAll();
  return results.map(d=>d.dataValues);
}

module.exports = SpVideos;