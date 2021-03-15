import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {callApi} from '__dirname/utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from'lodash';
import moment from'moment';
import { setWatchVideo, getWatchVideo, setIds } from "../utils/localStorage";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Count from "__dirname/components/Count.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

export default function Watch(propss) {
  let props = Object.assign({}, propss);
  let ids = getWatchVideo();

  global.videoIdMap = global.videoIdMap||{};
  global.searchVideos = global.searchVideos||[];
  global.videos = global.videos||[];
  const vtubers = props.vtubers||{};
  const [tab, setTab] = useState('video');
  const [isLoad, setIsLoad] = useState(false);
  const [playList, setPlayList] = useState();
  const [searchText, setSearchText] = useState('');
  const [chooseVideoList, setChooseVideoList] = useState([]);
  const [otherVideoList, setOtherVideoList] = useState([]);
  const [liveVideoList, setLiveVideoList] = useState([]);
  const [upcomingVideoList, setUpcomingVideoList] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const [chatId, setChatId] = useState();
  const [chatroomList, setChatroomList] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      await getVideo();
    };
    fetchData();
  }, [props.vtubers]);

  const getVideo = async () => {
    if (isLoad) return;
    setIsLoad(true);
    if (!process.browser) return;
    await getWatchVideos(ids);
    await getLiveVideos();
    ids = ids.filter(id=>global.videoIdMap[id]);
    setIds(ids)
    await getLeftVideo();
    setChatLL(ids);
    setIsLoad(false);

  };
  const watchVideo = (video)=>{
    video.noChoose = !video.noChoose;
    const videoId = video.videoId
    if (ids.includes(videoId)) {
      ids = ids.filter(id=>id!=videoId);
    } else {
      ids = [...ids, videoId];
    }
    setIds(ids)
    setVtuberList(vtubers);
    getLeftVideo(vtubers);
    setChatLL(ids);
  };
  const setChatLL = (ids) => {
    if (ids.length) {
      if (!chatId) {
        const chatId = ids[0];
        setChatId(chatId)
        const chooseVideo = ids.map(id=>global.videoIdMap[id]);
        const chatroomL = chooseVideo.map((video)=>{
          const vtuber = vtubers[video.channelId];
          video.noChoose = video.videoId!==chatId;
          return chatroomListParser(video, vtuber)
        });
        setChatroomList(chatroomL);
      };
    } else {
      setChatId('');
    }
  };
  const chatVideo = (video)=>{
    setChatId(video.videoId);
    const chatId = video.videoId;
    const chooseVideo = ids.map(id=>global.videoIdMap[id]);
    const chatroomL = chooseVideo.map((video)=>{
      const vtuber = vtubers[video.channelId];
      video.noChoose = video.videoId!==chatId;
      return chatroomListParser(video, vtuber)
    });
    setChatroomList(chatroomL)
  };
  const getWatchVideos = async (ids)=>{
    if (ids.length) {
      const params = {ids};
      const videos = await callApi({path:'videos/ids', params});
      videos.forEach((video)=>{
        global.videoIdMap[video.videoId] = video;
      });
    }
  };

  const getLeftVideo = () => {
    const watchVideo = ids.map((id)=>{
      return global.videoIdMap[id];
    }).filter(v=>v);
    setPlayList(watchVideo.map(video=>leftPlayListParser(video)));
  };
  const leftPlayListParser = (video) => {
    const url = `https://www.youtube.com/embed/${video.videoId}`;
    const count = ids.length;
    return (
      <div className={`videoRoot count${count}`} key={video.videoId}>
        <div className="loadingYoutube loadingYtc">
          <img src={video.photo}></img>
          <div>
            <CircularProgress color="primary" />
          </div>
        </div>
        <iframe 
          className="yt"
          width="560"
          height="315" 
          src={url}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    );
  };


  const getLiveVideos = async () => {
    global.videos = await callApi({path:'videos/live'});
    global.videos.forEach((video)=>{
      global.videoIdMap[video.videoId] = video;
    });
    setVtuberList(vtubers);
  };
  const setVtuberList = (vtuberMapping) => {
    const group = _.groupBy(global.videos, (v)=>v.liveBroadcastContent);
    if (group.live) {
      const l = group.live.map((video)=>{
        const vtuber = vtuberMapping[video.channelId];
        video.noChoose = !ids.includes(video.videoId);
        return rightPlayListParser(video, vtuber)
      });
      setLiveVideoList(l);
    }
    if (group.upcoming) {
      const l = group.upcoming.sort((a,b)=>a.liveTime - b.liveTime).map((video)=>{
        const vtuber = vtuberMapping[video.channelId];
        video.noChoose = !ids.includes(video.videoId);
        return rightPlayListParser(video, vtuber)
      });
      setUpcomingVideoList(l);
    }
    global.searchVideos.forEach((video)=>{
      global.videoIdMap[video.videoId] = video;
    });
    const l2 = global.searchVideos.map((video)=>{
      const vtuber = vtubers[video.channelId];
      video.noChoose = !ids.includes(video.videoId);
      return rightPlayListParser(video, vtuber)
    });
    setOtherVideoList(l2);

    const chooseVideo = ids.map(id=>global.videoIdMap[id]);
    const l = chooseVideo.map((video)=>{
      const vtuber = vtuberMapping[video.channelId];
      video.noChoose = false;
      return rightPlayListParser(video, vtuber)
    });
    setChooseVideoList(l);

    const chatroomL = chooseVideo.map((video)=>{
      const vtuber = vtuberMapping[video.channelId];
      video.noChoose = video.videoId!==chatId;
      return chatroomListParser(video, vtuber)
    });
    setChatroomList(chatroomL)
  };
  const rightPlayListParser = (video, vtuber) => {
    return (
      <div className="imgRoot" onClick={()=>watchVideo(video)} key={video.videoId+video.noChoose}>
        <img className={`${'rightPlayVideo'} ${!video.noChoose?'rightPlayVideoActice':''}`} src={video.photo}/>
        {vtuber&&<img className={'vtuber'} src={vtuber.photo}/>}
        {(!video.noChoose&&<CheckIcon className={'checkIcon'}/>)}
        {video.liveBroadcastContent==='upcoming'&&(
        <div className={'live'}>
          <div>{moment(video.liveTime).format('MM/DD')}</div>
          <div>{moment(video.liveTime).format('HH:mm')}</div>
        </div>
        )}
        <div className={'videoTitle'}>{video.title}</div>
      </div>
    );
  };
  const chatroomListParser = (video) => {
    return (
      <div className={'imgRoot'} onClick={()=>chatVideo(video)} key={video.videoId+video.noChoose}>
        <img className={`${'rightPlayVideoChat'} ${!video.noChoose?'rightPlayVideoActice':''}`} src={video.photo}/>
        {(!video.noChoose&&<CheckIcon className={'checkIcon'}/>)}
      </div>
    );
  };

  const handleKeyDown = (event) => {
    if(event.keyCode == 13){
      searchVideo();
    }
  };
  const stopPropagation = (e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  const searchVideo = async () => {
    if (isLoad) return;
    setIsLoad(true);
    const params = {searchText};
    global.searchVideos = await callApi({path:'videos/search', params, data:params});
    global.searchVideos.forEach((video)=>{
      global.videoIdMap[video.videoId] = video;
    });
    const l = global.searchVideos.map((video)=>{
      const vtuber = vtubers[video.channelId];
      video.noChoose = !ids.includes(video.videoId);
      return rightPlayListParser(video, vtuber)
    });
    setOtherVideoList(l);
    setExpanded(true)
    setIsLoad(false);
  };
  let url = 'localhost';
  if (process.browser) {
    url = window.location.host;
  }
  return (
    <>
      <div className={'watchRoot'}>
        <div className={'left'} id="watchDiv">
          {playList}
        </div>
        <div className={'right'}>
          <div className={'rightTab'}>
            <div onClick={()=>setTab('video')} className={tab==='video'?'choose':''}>影片</div>
            <div onClick={()=>setTab('chatroom')} className={tab==='chatroom'?'choose':''}>聊天室</div>
            {/* <div onClick={()=>setTab('discord')} className={tab==='discord'?'choose':''}>Discord</div> */}
          </div>
          {tab==='video'&&(
            <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Count count={chooseVideoList.length}>
                  播放中
                </Count>
              </AccordionSummary>
              <AccordionDetails>
                <div className={'rightDiv'}>{chooseVideoList}</div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Count count={liveVideoList.length}>
                  直播中
                </Count>
              </AccordionSummary>
              <AccordionDetails>
                <div className={'rightDiv'}>{liveVideoList}</div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Count count={upcomingVideoList.length}>
                  即將播放
                </Count>
              </AccordionSummary>
              <AccordionDetails>
                <div className={'rightDiv'}>{upcomingVideoList}</div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded}>
              <AccordionSummary
                onClick={()=>setExpanded(!expanded)}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Count count={otherVideoList.length}>
                  搜尋
                </Count>
                <div className={'searchInputDiv'} onClick={stopPropagation}>
                  <input className={'searchInput'} onKeyDown={handleKeyDown} value={searchText} onChange={(e)=>setSearchText(e.target.value)}></input>
                  <span onClick={()=>searchVideo()}><SearchIcon/></span>
                </div>

              </AccordionSummary>
              <AccordionDetails>
                <div className={'rightDiv'}>{otherVideoList}</div>
              </AccordionDetails>
            </Accordion>
            {isLoad&&(
              <div className={'loadingDiv'}>
                <CircularProgress color="primary" />
              </div>
            )}     
            </div>
          )}

          <div className={`${'chatroom'} ${tab==='chatroom' && chatId && 'displayShow'}`}>
            <div className="videoList">
              {chatroomList}
            </div>
            <div className="videoChat">
              <div className="loadingYoutube">
                <div>
                  <CircularProgress color="primary" />
                </div>
                <iframe 
                  className="ytc"
                  src={'https://www.youtube.com/live_chat?v='+chatId+'&embed_domain='+url}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {tab==='discord'&&(
            <div>
              discord
            </div>
          )}
     
        </div>
      </div>
    </>
  )
}
