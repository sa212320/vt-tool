const setWatchVideo = (video) =>{
  if (process.browser) {
    const videos = getWatchVideo();
    const i = videos.indexOf(video.videoId);
    if (i === -1) {
      videos.push(video.videoId);
    } else {
      // videos.splice(i, 1);
    }
    window.localStorage.setItem('WatchVideo', JSON.stringify(videos));
  }
};

const getWatchVideo = () =>{
  if (process.browser) {
    const r = window.localStorage.getItem('WatchVideo');
    if (r) {
      return JSON.parse(r);
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