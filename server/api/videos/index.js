const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;

const Videos = require('../../database/videos');
const SpVideos = require('../../database/spVideos');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const sortVideo = (result) => {
  return result.sort((a,b)=>b.publishedAt - a.publishedAt);
}

router.get('/', async (req, res)=>{
  const result = await Videos.findAll();
  return res.send(result);
});

router.get('/time', async (req, res)=>{
  const query = req.query;
  const result = await Videos.findAll({
    where: {
      publishedAt:{
        [Op.between]:[query.startTime, query.endTime],
      },
    }
  });;
  return res.send(sortVideo(result));
});

router.get('/live', async (req, res)=>{
  const result = await Videos.findAll({
    where: {
      [Op.not]: {
        liveBroadcastContent:'none',
      },
    },
    order: [
      ['liveTime', 'DESC'],
    ],
  });
  return res.send(sortVideo(result));
});

router.get('/search', async (req, res)=>{
  if (!req.query.searchText) {
    return res.send([]);
  }
  const searchTexts = req.query.searchText.split(/[\s,]/);
  const query = searchTexts.map(t=>{
    return {
      title: {[Op.like]: `%${t}%`},
    };
  });
  const result = await Videos.findAll({
    where: {
      [Op.and]: query,
    },
    limit: 100,
    order: [
      ['publishedAt', 'DESC'],
    ],
  });
  return res.send(result);
});

router.get('/ids', async (req, res)=>{
  const {ids} = req.query;
  const result = await Videos.findAll({
    where: {
      [Op.or]: ids.map(id=>({videoId:id})),
    },
  });

  return res.send(sortVideo(result));
});

router.get('/liveCount', async (req, res)=>{
  const count = await Videos.count({
    where: {
      liveBroadcastContent:'live',
    },
  });
  return res.send({count});
});

router.get('/upcomingCount', async (req, res)=>{
  const count = await Videos.count({
    where: {
      liveBroadcastContent:'upcoming',
    },
  });
  return res.send({count});
});

router.get('/sp', async (req, res)=>{
  const result = await SpVideos.getAll();
  return res.send(result);
});

module.exports = router;