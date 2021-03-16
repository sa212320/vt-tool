require('dotenv').config();
const moment = require('moment')
const { google } = require('googleapis');

const now = moment().valueOf()
let youtubeCount = 0;

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY,
});

const vid = 'GUCkB-rNBnU'

const getVideosInfo = async (videoIds, result=[])=>{
  const ids = [...videoIds];
  const targetIds = ids.splice(0, 50);
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
  console.log(data)
  const scheduleMoment = moment(data.live_schedule);
  if (data.live_end) {
    saveInfo.liveBroadcastContent = 'none';
  } else if (data.live_start) {
    saveInfo.liveBroadcastContent = 'live';
  } else if (data.live_schedule) {
    if (moment().isSameOrAfter(scheduleMoment)) {
      if (moment().diff(scheduleMoment, 'hours', true) > 0.5) {
        saveInfo.liveBroadcastContent = 'none';
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

console.log(now)
getVideosInfo(["rUJzx15SGKY","xpgwwzxNenE","_0i1DlczAkY","jn_I4N7u1vo"]).then((docs)=>{
  console.log(docs)
  // console.log(videoParser(docs[1]))
})