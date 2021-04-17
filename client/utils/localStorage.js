const setWatchVideo = (video) =>{
  if (process.browser) {
    let videos = getWatchVideo();
    const i = videos.indexOf(video.videoId);
    if (i === -1) {
      videos.push(video.videoId);
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

const getOrSetIsBlack = (isBlack) =>{
  if (process.browser ) {
    if (isBlack !== undefined) {
      window.localStorage.setItem('IsBlack', JSON.stringify(isBlack));
    } else {
      const r = window.localStorage.getItem('IsBlack');
      if (r) {
        return JSON.parse(r);
      }
    }
  }
};

export {setWatchVideo, getWatchVideo, setIds, getOrSetIsBlack};