const { DataTypes } = require('sequelize');
const db = require('../utils/db');
const Channel = require('./channel');
const { updateTime } = require('../config.js');
const { getChannelDoc } = require('../utils/youtube.js');

const Vtuber = db.define('Vtuber', {
  channelId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  uploadsId: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  viewCount: {
    type: DataTypes.NUMBER,
  },
  subscriberCount: {
    type: DataTypes.NUMBER,
  },
  videoCount: {
    type: DataTypes.NUMBER,
  },
  publishedAt: {
    type: DataTypes.NUMBER,
  },
  type: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true,
  sequelize:db,
  logging: false,
});

Vtuber.getAll = async function (){
  const results = await this.findAll();
  return results.map(d=>d.dataValues);
}


module.exports = Vtuber;