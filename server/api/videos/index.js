const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;

const Videos = require('../../database/videos');
const Vtuber = require('../../database/vtuber');
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
  const max = 100;
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
    limit: max,
    order: [
      ['publishedAt', 'DESC'],
    ],
  });
  const maxDelta = max - result.length;
  if (maxDelta > 0) {
    const vtuberQuery = searchTexts.map(t=>{
      return {
        name: {[Op.like]: `%${t}%`},
      };
    });  
    const vtubers = await Vtuber.findAll({
      where: {
        [Op.and]: vtuberQuery,
      },
      limit: maxDelta,
    });
    const result2 = await Videos.findAll({
      where: {
        channelId: {
          [Op.in]: vtubers.map((vtuber)=>vtuber.channelId),
        },
        videoId: {
          [Op.notIn]: result.map((video)=>video.videoId),
        },
      },
      limit: maxDelta,
      order: [
        ['publishedAt', 'DESC'],
      ],
    });
    result.push(...result2);
    result.sort((a, b)=>b.publishedAt - a.publishedAt);
  };
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