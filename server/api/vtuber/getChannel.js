const youtube = require('../../utils/youtube.js');
const Channel = require('../database/channel');
const moment = require('../../utils/moment');

const guraChannelId = 'UCoSrY_IQQVpmIRZ9Xf-y93g';
const watconChannelId = 'UCyl1z3jo3XHR1riLFKG5UAg';

const playListId = 'PL9781Kn53ls9In7PY32MjlzBwbP53TIRV';
const videId = 'NHqeoW8918Q';
const videId2 = 'gLcGkbFqvfU';



const getChannel = (id)=>{
  return youtube.channels.list({
    part: 'snippet,contentDetails,statistics',
    id,
  })
  .then((ytResult) => {
    const doc = ytResult.data.items[0];
    const vtuberInfo = {
      channelId: doc.id,
      uploadsId: doc.contentDetails.relatedPlaylists.uploads,
      name: doc.snippet.title,
      description: doc.snippet.description,
      photo: doc.snippet.thumbnails.high.url,
      viewCount: doc.statistics.viewCount,
      subscriberCount: doc.statistics.subscriberCount,
      videoCount: Number(doc.statistics.videoCount),
      publishedAt: moment(doc.snippet.publishedAt).valueOf(),
      updated_at: moment().valueOf(),
    }
    return vtuberInfo;
  });
}

const getPlayListByChannelId = async (channelId)=>{
  youtube.playlists.list({
    part: 'snippet,contentDetails',
    channelId,
  })
  .then((ytResult) => {
    console.log(ytResult.data.items)
    return ytResult.data.items;
  })
  .catch((err) => {
    console.log(err)
  })
}

const getPlayListItemByPlayListId = (playlistId)=>{
  youtube.playlistItems.list({
    part: 'snippet,contentDetails',
    playlistId
  })
  .then((ytResult) => {
    console.log(ytResult.data);
    console.log(ytResult.data.items[0]);
  })
  .catch((err) => {
    console.log(err)
  })
}

const getVideo = (videoId)=>{
  // return `https://www.youtube.com/watch?v=${videoId}`;
  youtube.videos.list({
    part: 'snippet,contentDetails,statistics',
    id: videoId,
  })
  .then((ytResult) => {
    const videoDoc = ytResult.data.items[0];
    const liveBroadcastContent = videoDoc.snippet.liveBroadcastContent;
    console.log(liveBroadcastContent)
  })
  .catch((err) => {
    console.log(err)
  })
}

const getAllVideo = (channelId) => {

};

getChannel(guraChannelId).then((vTuber)=>{
  const playListId = vTuber.uploadsId;
  getPlayListItemByPlayListId(playListId);
});
// 
console.log(getVideo(videId));
console.log(getVideo(videId2));