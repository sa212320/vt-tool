import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import {callApi} from '__dirname/utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from'lodash';
import moment from'moment';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Count from "__dirname/components/Count.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

export default function Watch(props) {
  console.log(props)
  props.ids = props.ids||[];
  props.videoIdMap = props.videoIdMap||{};
  props.searchVideos = props.searchVideos||[];
  props.videos = props.videos||[];
  const vtubers = props.vtubers;
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
    const id = window.location.hash;
    props.ids = id.replace(/#/, '').split(',').filter(d=>d);
    await getWatchVideos(props.ids);
    await getLiveVideos();
    props.ids = props.ids.filter(id=>props.videoIdMap[id]);
    window.location.hash = `#${props.ids.join(',')}`;
    await getLeftVideo();
    setChatLL(props.ids);
    setIsLoad(false);

  };
  const watchVideo = (video)=>{
    video.noChoose = !video.noChoose;
    const videoId = video.videoId
    if (props.ids.includes(videoId)) {
      props.ids = props.ids.filter(id=>id!=videoId);
    } else {
      props.ids = [...props.ids, videoId];
    }
    window.location.hash = `#${props.ids.join(',')}`;
    setVtuberList(vtubers);
    getLeftVideo(vtubers);
    setChatLL(props.ids);
  };
  const setChatLL = (ids) => {
    if (ids.length) {
      if (!chatId) {
        const chatId = ids[0];
        setChatId(chatId)
        const chooseVideo = ids.map(id=>props.videoIdMap[id]);
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
    const chooseVideo = props.ids.map(id=>props.videoIdMap[id]);
    const chatroomL = chooseVideo.map((video)=>{
      const vtuber = vtubers[video.channelId];
      video.noChoose = video.videoId!==chatId;
      return chatroomListParser(video, vtuber)
    });
    setChatroomList(chatroomL)
  };
  const getWatchVideos = async (ids)=>{
    const params = {ids};
    const videos = await callApi({path:'videos/ids', params});
    videos.forEach((video)=>{
      props.videoIdMap[video.videoId] = video;
    });
  };

  const getLeftVideo = () => {
    const watchVideo = props.ids.map((id)=>{
      return props.videoIdMap[id];
    }).filter(v=>v);
    setPlayList(watchVideo.map(video=>leftPlayListParser(video)));
  };
  const leftPlayListParser = (video) => {
    const url = `https://www.youtube.com/embed/${video.videoId}`;
    const count = props.ids.length;
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
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    );
  };


  const getLiveVideos = async () => {
    props.videos = await callApi({path:'videos/live'});
    props.videos.forEach((video)=>{
      props.videoIdMap[video.videoId] = video;
    });
    setVtuberList(vtubers);
  };
  const setVtuberList = (vtuberMapping) => {
    const group = _.groupBy(props.videos, (v)=>v.liveBroadcastContent);
    if (group.live) {
      const l = group.live.map((video)=>{
        const vtuber = vtuberMapping[video.channelId];
        video.noChoose = !props.ids.includes(video.videoId);
        return rightPlayListParser(video, vtuber)
      });
      setLiveVideoList(l);
    }
    if (group.upcoming) {
      const l = group.upcoming.map((video)=>{
        const vtuber = vtuberMapping[video.channelId];
        video.noChoose = !props.ids.includes(video.videoId);
        return rightPlayListParser(video, vtuber)
      });
      setUpcomingVideoList(l);
    }
    props.searchVideos.forEach((video)=>{
      props.videoIdMap[video.videoId] = video;
    });
    const l2 = props.searchVideos.map((video)=>{
      const vtuber = vtubers[video.channelId];
      video.noChoose = !props.ids.includes(video.videoId);
      return rightPlayListParser(video, vtuber)
    });
    setOtherVideoList(l2);

    const chooseVideo = props.ids.map(id=>props.videoIdMap[id]);
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
        <img className={`${'rightPlayVideo'} ${!video.noChoose&&'rightPlayVideoActice'}`} src={video.photo}/>
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
        <img className={`${'rightPlayVideoChat'} ${!video.noChoose&&'rightPlayVideoActice'}`} src={video.photo}/>
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
    props.searchVideos = await callApi({path:'videos/search', params, data:params});
    props.searchVideos.forEach((video)=>{
      props.videoIdMap[video.videoId] = video;
    });
    const l = props.searchVideos.map((video)=>{
      const vtuber = vtubers[video.channelId];
      video.noChoose = !props.ids.includes(video.videoId);
      return rightPlayListParser(video, vtuber)
    });
    setOtherVideoList(l);
    setExpanded(true)
    setIsLoad(false);
  };
  return (
    <>
      <div className={'watchRoot'}>
        <div className={'left'} id="watchDiv">
          {playList}
        </div>
        <div className={'right'}>
          <div className={'rightTab'}>
            <div onClick={()=>setTab('video')} className={tab==='video'&&'choose'}>影片</div>
            <div onClick={()=>setTab('chatroom')} className={tab==='chatroom'&&'choose'}>聊天室</div>
            {/* <div onClick={()=>setTab('discord')} className={tab==='discord'&&'choose'}>Discord</div> */}
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
                  src={'https://www.youtube.com/live_chat?v='+chatId+'&embed_domain=localhost'}
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
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
