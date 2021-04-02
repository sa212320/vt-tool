const setWatchVideo = (video) =>{
  if (process.browser) {
    let videos = getWatchVideo();
    const i = videos.indexOf(video.videoId);
    if (i === -1) {
      videos.push(video.videoId);
      console.log(videos);
      videos = videos.splice(videos.length - global.maxLiveVideoLength);

    } else {
      // videos.splice(i, 1);
      // console.log(videos);
    }
    window.localStorage.setItem('WatchVideo', JSON.stringify(videos));
  }
};

const getWatchVideo = () =>{
  if (process.browser) {
    const vidoeId = location.hash.replace('#', '');
    if (vidoeId){
      return [vidoeId];
    } else {
      const r = window.localStorage.getItem('WatchVideo');
      if (r) {
        return JSON.parse(r);
      }
    }
  }
  return [];
};

const setIds = (ids) =>{
  if (process.browser) {
    window.localStorage.setItem('WatchVideo', JSON.stringify(ids));
  }
};

export {setWatchVideo, getWatchVideo, setIds};