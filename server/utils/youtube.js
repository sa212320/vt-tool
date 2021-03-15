require('dotenv').config();
const { google } = require('googleapis');
const axios = require('axios');
const moment = require('./moment');
const {parseString} = require ('xml2js');
const Channel = require('../database/channel');
const Vtuber = require('../database/vtuber');
const Videos = require('../database/videos');
const {channelIds} = require('../config.js');

let youtubeCount = 0;

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY,
});

const getChannelDoc = async (id)=>{
  youtubeCount++
  const ytResult = await youtube.channels.list({
    part: 'snippet,contentDetails,statistics',
    id,
  });

  const doc = ytResult.data.items[0];
  const vtuberInfo = {
    channelId: doc.id,
    uploadsId: doc.contentDetails.relatedPlaylists.uploads,
    name: doc.snippet.title,
    description: doc.snippet.description,
    photo: doc.snippet.thumbnails.high.url,
    viewCount: doc.statistics.viewCount,
    subscriberCount: doc.statistics.subscriberCount,
    country: doc.snippet.country,
    videoCount: Number(doc.statistics.videoCount),
    publishedAt: moment(doc.snippet.publishedAt).valueOf(),
    type: 'channel',
  }
  return vtuberInfo;
};
const getChannelDocByUsername = async (username)=>{
  youtubeCount++
  const ytResult = await youtube.channels.list({
    part: 'snippet,contentDetails,statistics',
    forUsername:username,
  });
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
    type: 'user',
  }
  return vtuberInfo;
};
const getPlayListItemByPlayListId = async (playlistId, maxResults=10, pageToken='')=>{
  youtubeCount++
  const ytResult = await youtube.playlistItems.list({
    part: 'snippet,contentDetails',
    playlistId,
    maxResults,
    pageToken,
  })
  return ytResult.data.items;
};


const getLiveVideoIds2 = async (channelId) => {
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
      resolve(result.feed.entry.map(v=>v['yt:videoId']));
    });
  });
};
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

// const getLiveVideoIds = async (channelId)=>{
//   youtubeCount+=100;
//   const ytResult = (await youtube.search.list({
//     part: 'snippet',
//     channelId,
//     maxResults: 5,
//     type: 'video',
//     eventType: 'live',
//   })).data;
//   return ytResult.items.map(v=>v.id.videoId);
// };
// const getUpcomingVideoIds = async (channelId)=>{
//   youtubeCount+=100;
//   const ytResult = (await youtube.search.list({
//     part: 'snippet',
//     channelId,
//     maxResults: 5,
//     type: 'video',
//     eventType: 'live',
//   })).data;
//   return ytResult.items.map(v=>v.id.videoId);
// };
const getAllOverVideoId = async (playlistId, max, pageToken='', result=[])=>{
  youtubeCount++;
  const ytResult = (await youtube.playlistItems.list({
    part: 'snippet, contentDetails',
    playlistId,
    maxResults: (max&&max<=50)?max:50,
    pageToken,
  })).data;
  result.push(...ytResult.items);
  if (max && max <= result.length) {
    return result.map(r=>r.contentDetails.videoId);
  }
  if (ytResult.nextPageToken) {
    return getAllOverVideoId(playlistId, max, ytResult.nextPageToken, result);
  }
  return result.map(r=>r.contentDetails.videoId);
};

const getAllVideoId = async (vtuber, max)=>{
  let liveVideoIds = [];
  let upcomingVideoIds = [];
  let videoIds = [];
  try { 
    liveVideoIds = await getLiveVideoIds2(vtuber.channelId);
  } catch (err) {}
  // try { 
  //   upcomingVideoIds = await getUpcomingVideoIds(vtuber.channelId);
  // } catch (err) {}
  try { 
    if (!max || max>50) {
      videoIds = await getAllOverVideoId(vtuber.uploadsId, max);
    }
  } catch (err) {}
  const list = [...liveVideoIds, ...upcomingVideoIds, ...videoIds];
  return list.filter((d,i)=>list.indexOf(d)===i);
};


const getVideosInfo = async (videoIds, result=[])=>{
  const ids = [...videoIds];
  const targetIds = ids.splice(0, 50);
  youtubeCount++
  const ytResult = (await youtube.videos.list({
    part: 'id,snippet,status,contentDetails,liveStreamingDetails',
    id: targetIds,
    fields: 'items(id,snippet,contentDetails,status/embeddable,liveStreamingDetails)',
    maxResults: targetIds.length, // keep at 50, not VIDEOS_MAX_QUERY
  })).data.items;
  result.push(...ytResult);
  if (ids.length) {
    return getVideosInfo(ids, result);
  } else {
    return result;
  }
}
const videoParser = (videoDoc)=>{
  const {snippet, liveStreamingDetails} = videoDoc;
  const saveInfo = {
    videoId: videoDoc.id,
    channelId: snippet.channelId,
    title: snippet.title,
    description: snippet.description,
    photo: snippet.thumbnails.high.url,
    liveBroadcastContent: snippet.liveBroadcastContent,
    tags: snippet.tags?snippet.tags.join(''):'',
    publishedAt: moment(snippet.publishedAt).valueOf(),
  };
  if (!liveStreamingDetails) {
    return saveInfo;
  }
  const data = {}
  data.live_schedule = liveStreamingDetails.scheduledStartTime || null;
  data.live_start = liveStreamingDetails.actualStartTime || null;
  data.live_end = liveStreamingDetails.actualEndTime || null;
  const scheduleMoment = moment(data.live_schedule);
  if (data.live_end) {
    saveInfo.liveBroadcastContent = 'none';
  } else if (data.live_start) {
    saveInfo.liveBroadcastContent = 'live';
  } else if (data.live_schedule) {
    if (moment().isSameOrAfter(scheduleMoment)) {
      if (moment().diff(scheduleMoment, 'hours', true) > 0.25) {
        saveInfo.liveBroadcastContent = 'delete';
      }else{
        saveInfo.liveBroadcastContent = 'live';
      }
    } else {
      saveInfo.liveBroadcastContent = 'upcoming';
    }
  } else {
    saveInfo.liveBroadcastContent = 'none';
  }
  if (data.live_start) {
    saveInfo.startTime = moment(data.live_start).valueOf();
  }
  if (data.live_end) {
    saveInfo.endTime = moment(data.live_end).valueOf();
  }
  if (data.live_schedule) {
    saveInfo.liveTime = moment(data.live_schedule).valueOf();
  }
  return saveInfo;
}

const initChannelDatabase = () =>{
  const promises = channelIds.map((url)=>{
    const path = url.replace('https://www.youtube.com/', '');
    const [type, id] = path.split('/');
    if (type === 'channel') {
      return Channel.upsert({id, type});
    } else if (type === 'user'){
      return Channel.upsert({id, type});
    }
    return Promise.resolve();
  });
  return Promise.all(promises);
}
const initVideosDatabase = async () => {
  const vtubers = await Vtuber.getAll();
  const noUpdateVideoId = (await Videos.getAllNone()).map(({videoId})=>videoId);
  const promisses = vtubers.map(async (vtuber)=>{
    if (!vtuber.videoCount) return Promise.resolve();
    const videoIds = await getAllVideoId(vtuber);
    const newIds = videoIds.filter((id)=>noUpdateVideoId.indexOf(id) === -1);
    if (newIds.length) {
      const videos = await getVideosInfo(newIds);
      return Promise.all(videos.map(async (video)=>{
        const info = videoParser(video);
        if (info.liveBroadcastContent === 'delete') {
          return Videos.destroy({
            where: {
              videoId:video.videoId
            }
          });
        }
        return Videos.upsert(info);
      }));
    }
    return Promise.resolve();
  });
  return Promise.all(promisses);
}

const updateVtuberDatabase = async () => {
  const channelIds = await Channel.getAll();
  const promises = channelIds.map(({id, type}) => {
    if (type === 'channel') {
      return getChannelDoc(id).then((doc)=>{
        return Vtuber.upsert(doc);
      });
    } else if (type === 'user'){
      return getChannelDocByUsername(id).then((doc)=>{
        return Vtuber.upsert(doc);
      });
    }
  });
  return Promise.all(promises);
}

const updateVideosDatabase = async () => {
  const vtubers = await Vtuber.getAll();
  const promisses = vtubers.map(async (vtuber)=>{
    if (!vtuber.videoCount) return Promise.resolve();
    const originVideoIds = await getNewVideos(vtuber.channelId);
    const publishedAt = Math.min(...originVideoIds.map(v=>moment(v.published[0]).valueOf()));
    const exitVideos = await Videos.getVideoByChannelID(vtuber.channelId, publishedAt);
    const exitVideoId = {};
    exitVideos.forEach(({videoId})=>{
      exitVideoId[videoId] = true;
    });
    const videoIds = [];
    originVideoIds.forEach(({id})=>{
      if (!exitVideoId[id]) videoIds.push(id);
    });
    if (videoIds.length) {
      const videos = await getVideosInfo(videoIds);
      return Promise.all(videos.map(async (video)=>{
        const info = videoParser(video);
        if (info.liveBroadcastContent === 'delete') {
          return Videos.destroy({
            where: {
              videoId:video.videoId
            }
          });
        }
        return Videos.upsert(info);
      }));
    }
    return Promise.resolve();
  });
  return Promise.all(promisses);
}

const checkVideosDatabase = async () => {
  const liveVideo = await Videos.getAllLive();
  const liveVideoId = liveVideo.map(video=>video.videoId);
  if (liveVideoId.length === 0) return;
  const videos = await getVideosInfo(liveVideoId);
  const videoMap = {};
  videos.forEach((video)=>{
    videoMap[video.id] = video;
  });
  const promisses = liveVideo.map((video)=>{
    const doc = videoMap[video.videoId];
    if (doc) {
      const info = videoParser(doc);
      if (info.liveBroadcastContent === 'delete') {
        return Videos.destroy({
          where: {
            videoId:video.videoId
          }
        });
      }
      return Videos.upsert(info);
    } else {
      return Videos.destroy({
        where: {
          videoId:video.videoId
        }
      });
    }
  });
  return Promise.all(promisses);
}

const getYoutubeCount = ()=>{
  const temp = youtubeCount;
  youtubeCount = 0;
  return temp;
};

module.exports = {
  getChannelDoc, 
  getPlayListItemByPlayListId, 
  initVideosDatabase,
  initChannelDatabase,
  updateVtuberDatabase,
  updateVideosDatabase,
  checkVideosDatabase,
  getYoutubeCount,
  youtube
};