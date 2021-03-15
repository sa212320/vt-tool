const axios = require('axios');
const {parseString} = require ('xml2js');
const moment = require('moment')

const getNewVideos = async (channelId) => {
  const result = (await axios.get('https://www.youtube.com/feeds/videos.xml', {
    params: {
      channel_id: channelId,
      t: Date.now(),
    },
  })).data;
  return new Promise((resolve, reject)=>{
    parseString(result, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result.feed.entry.map(v=>({id:v['yt:videoId'], published:v.published})));
    });
  });
};

const updateVideosDatabase = async (channelId) => {
  const originVideoIds = await getNewVideos(channelId);
  console.log()
  const publishedAt = Math.min(...originVideoIds.map(v=>moment(v.published[0]).valueOf()));
  console.log(publishedAt)
  // const exitVideos = await Videos.getVideoByChannelID(vtuber.channelId, publishedAt);
    // if (originVideoIds.length) {


    //   const exitVideos = await Videos.getVideoByChannelID(vtuber.channelId, publishedAt);
    //   const exitVideoId = {};
    //   exitVideos.forEach(({videoId})=>{
    //     exitVideoId[videoId] = true;
    //   });
    //   const videos = await getVideosInfo(videoIds);
    //   return Promise.all(videos.map(async (video)=>{
    //     if (!exitVideoId[video.id]){ 
    //       const info = videoParser(video);
    //       return Videos.upsert(info);
    //     } else {
    //       return Promise.resolve();
    //     }
    //   }));
    // }
  //   return Promise.resolve();
  // });
  // return Promise.all(promisses);
};

updateVideosDatabase('UCYuCbE3H9xmR8_HSFizYFYg')