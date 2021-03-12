const axios = require('axios');
const {parseString} = require ('xml2js');

const getLiveVideoIds2 = async (channelId) => {
  const result = (await axios.get('https://www.youtube.com/feeds/videos.xml', {
    params: {
      channel_id: channelId,
      t: Date.now(),
    },
  })).data;
  return new Promise((resolve, reject)=>{
    parseString(result, function (err, result) {
      console.log(err, result)
      if (err) {
        reject(err);
      }
      resolve(result.feed.entry.map(v=>v['yt:videoId']));
    });
  });
};

getLiveVideoIds2('UC4J0GZLM55qrFh2L-ZAb2LA').then((doc)=>{
  console.log(doc)
})