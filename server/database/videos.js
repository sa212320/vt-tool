const { DataTypes, Sequelize} = require('sequelize');
const db = require('../utils/db');
const Op = Sequelize.Op;

const Videos = db.define('Videos', {
  videoId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  channelId: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  liveBroadcastContent: {
    type: DataTypes.STRING,
  },
  publishedAt: {
    type: DataTypes.NUMBER,
  },
  startTime:{
    type: DataTypes.NUMBER,
  },
  endTime:{
    type: DataTypes.NUMBER,
  },
  liveTime:{
    type: DataTypes.NUMBER,
  },
  tags: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  sequelize:db,
  logging: false,
  indexes:[
    {fields: ['channelId', 'publishedAt']},
  ],
});

Videos.getAll = async function (){
  const results = await this.findAll();
  return results.map(d=>d.dataValues);
}

Videos.getAllNone = async function (){
  const results = await this.findAll({
    where: {
      liveBroadcastContent: 'none',
    }
  });
  return results.map(d=>d.dataValues);
}

Videos.getAllLive = async function (){
  const results = await this.findAll({
    where: {
      liveBroadcastContent: 'live',
    }
  });
  return results.map(d=>d.dataValues);
}


Videos.getNestVideoByChannelID = async function (channelId){
  const results = await this.max('publishedAt', { where: {channelId}});
  return results.map(d=>d.dataValues);
}

Videos.getVideoCountByChannelID = async function (channelId){
  const result = await this.count({ where: {channelId}});
  return result;
}


Videos.getVideoByChannelID = async function (channelId, publishedAt=0){
  const results = await this.findAll({
    where: {
      channelId,
      publishedAt:{
        [Op.gte]:publishedAt,
      }
    }
  });
  return results.map(d=>d.dataValues);
}

module.exports = Videos;