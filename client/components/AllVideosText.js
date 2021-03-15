
import React, { useEffect, useState } from 'react';
import {callApi} from '__dirname/utils/api';
import VideoImg from "__dirname/components/VideoImg.js";
import moment from 'moment';
import SearchIcon from '@material-ui/icons/Search';


export default function AllVideos(props) {
  const now = moment();
  const [videoList, setVideoList] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  const searchVideo = async () => {
    const params = {searchText};
    const searchVideos = await callApi({path:'videos/search', params, data:params});
    searchVideos.forEach((video)=>{
      global.videoIdMap[video.videoId] = video;
    });
    const l = searchVideos.map((video)=>{
      video.vtuber = props.vtubers[video.channelId];
      return (
        <VideoImg video={video} key={video.videoId}/>
      )
    });
    setVideoList(l);
  };

  const handleKeyDown = (event) => {
    if(event.keyCode == 13){
      searchVideo();
    }
  };



  return (
    <>
      <div className="allVideoText">
        <div className={'searchInputDiv'}>
          <input className={'searchInput'} onKeyDown={handleKeyDown} value={searchText} onChange={(e)=>setSearchText(e.target.value)}></input>
          <span onClick={()=>searchVideo()}><SearchIcon/></span>
        </div>
      </div>
      <div className="flexWrap displayFlex">
        {videoList.length?'':(<div>無</div>)}
        {videoList}
        <VideoImg/>
        <VideoImg/>
        <VideoImg/>
        <VideoImg/>
        <VideoImg/>
        <VideoImg/>
        <VideoImg/>
        <VideoImg/>
        <VideoImg/>

      </div>

    </>
  )
}
