import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import {callApi} from '__dirname/utils/api';
import _ from'lodash';
import moment from'moment';
import Vtuber from "__dirname/components/Vtuber.js";
import VideoImg from "__dirname/components/VideoImg.js";
import AllVideosL from "__dirname/components/AllVideosL.js";
import AllVideosText from "__dirname/components/AllVideosText.js";

export default function VideoPage(props) {
  const [liveAndUpcoming, setLiveAndUpcoming] = useState([]);
  const [spVideos, setSpVideos] = useState([]);
  const vtuberRef = useRef();
  const spRef = useRef();
  const liveRef = useRef();
  const upcomingRef = useRef();
  const oldRef = useRef();
  const oldDateRef = useRef();
  const scrollElement = useRef();
  const deltHeight = 0;
  useEffect(()=>{
    const getSpVideos = async () => {
      let videos = await callApi({path:'videos/sp'});
      videos = videos.sort((a, b)=>{
        return new Date(a.updatedAt)-new Date(b.updatedAt);
      });
      const result = [];
      result.push(<div ref={spRef} key={'spRef'}></div>);
      result.push(titleBar('推薦影片', videos.length));
      result.push(
        <div className="flexWrap displayFlex" key={'live'}>
          {videos.map((video)=>{
            video.vtuber = {
              channelId: video.channelId,
              name: video.channelName,
              photo: video.channelPhoto,
            }
            return <VideoImg key={video.videoId} video={video}/>;
          })}
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
      );
      setSpVideos(result);
    };
    const fetchData = async () => {
      let videos = await callApi({path:'videos/live'});
      videos = videos.sort((a, b)=>{
        return a.liveTime - b.liveTime;
      });
      setVideoList(videos, props.vtubers);
    };
    getSpVideos();
    fetchData();
  }, [props.vtubers]);
  let isFirst = false;
  const titleBar = (text, count) =>{
    const r = (
      <div className={"videoTitle "+(isFirst?'first':'')} key={text}>
        {text}
      </div>
    );
    isFirst = false;
    return r;
  };

  const setVideoList = (originVideos, vtuberMapping) => {
    const videos = originVideos.filter((video)=>moment(video.liveTime).diff(moment(), 'days')<7);
    videos.forEach(video => {
      video.vtuber = vtuberMapping[video.channelId];
    });
    console.log(videos);
    const group = _.groupBy(videos, (v)=>v.liveBroadcastContent);
    let result = [];
    if (group.live) {
      result.push(<div ref={liveRef} key={'liveRef'}></div>);
      result.push(titleBar('直播中', group.live.length));
      result.push(
        <div className="flexWrap displayFlex" key={'live'}>
          {group.live.map((video)=><VideoImg key={video.videoId} video={video}/>)}
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
      );
    }
    if (group.upcoming) {
      result.push(<div ref={upcomingRef} key={'upcomingRef'}></div>);
      const liveTimeGroup = _.groupBy(group.upcoming, (v)=>moment(v.liveTime).format('YYYY/MM/DD'));
      _.keys(liveTimeGroup).forEach((key)=>{
        const videos = liveTimeGroup[key];
        result.push(titleBar(`即將播放:${key}`, videos.length));
        result.push(
          <div className="flexWrap displayFlex" key={'upcoming'}>
            {videos.map((video)=><VideoImg key={video.videoId} video={video}/>)}
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
        );
      })
    }
    result.push(<div ref={oldRef} key={'oldRef'}></div>);
    result.push(titleBar('影片(日期)'));
    result.push(<AllVideosL vtubers={props.vtubers} key={'oldVideo'}></AllVideosL>);
    result.push(<div ref={oldDateRef} key={'oldDateRef'}></div>);
    result.push(titleBar('影片(關鍵字)'));
    result.push(<AllVideosText vtubers={props.vtubers} key={'oldDateVideo'}></AllVideosText>);
    
    
    result.push(<div ref={vtuberRef} key={'vtuberRef'}></div>);
    result.push(titleBar('Vtuber'));


    setLiveAndUpcoming(result);
    if (process.browser) {
      const hash = window.location.hash.split('_')[0];
      const id = hash.replace('#', '');
      switch (id) {
        case 'live': return scrollTo(liveRef);
        case 'upcoming': return scrollTo(upcomingRef);
        case 'old': return scrollTo(oldRef);
        case 'date': return scrollTo(oldDateRef);
        case 'vtuber': return scrollTo(vtuberRef);
        case 'sp': return scrollTo(spRef);
      }
      scrollTo();
    }
  };

  const scrollTo = (ref, height=deltHeight) => {
    if (process.browser) {
      setTimeout(()=>{
        if (scrollElement.current && ref && ref.current) {
          scrollElement.current.scrollTop = ref.current.offsetTop-height;
        } else if (scrollElement.current){
          scrollElement.current.scrollTop = 0
        }
      });
    }
  };

  if (process.browser) {
    let tempTab;
    useEffect(()=>{
      const hash = window.location.hash.split('_')[0];
      const id = hash.replace('#', '');
      tempTab = id;
      switch (id) {
        case 'live': return scrollTo(liveRef);
        case 'upcoming': return scrollTo(upcomingRef);
        case 'old': return scrollTo(oldRef);
        case 'date': return scrollTo(oldDateRef);
        case 'vtuber': return scrollTo(vtuberRef);
        case 'sp': return scrollTo(spRef);
      }
      scrollTo();
    }, [window.location.hash]);
    useEffect(()=>{
      const timmer = setInterval(() => {
        if (tempTab === undefined) return;
        let tab = '';
        const dh = -60;
        if (scrollElement.current && liveRef.current) {
          if (scrollElement.current.scrollTop - (spRef.current.offsetTop-deltHeight) >= dh) {
            tab = 'sp';
          }
        }
        if (scrollElement.current && liveRef.current) {
          if (scrollElement.current.scrollTop - (liveRef.current.offsetTop-deltHeight) >= dh) {
            tab = 'live';
          }
        }
        if (scrollElement.current && upcomingRef.current) {
          if (scrollElement.current.scrollTop - (upcomingRef.current.offsetTop-deltHeight) >= dh) {
            tab = 'upcoming';
          }
        }
        if (scrollElement.current && oldRef.current) {
          if (scrollElement.current.scrollTop - (oldRef.current.offsetTop-deltHeight) >= dh) {
            tab = 'old';
          }
        }
        if (scrollElement.current && oldDateRef.current) {
          if (scrollElement.current.scrollTop - (oldDateRef.current.offsetTop-deltHeight) >= dh) {
            tab = 'date';
          }
        }
        if (scrollElement.current && vtuberRef.current) {
          if (scrollElement.current.scrollTop - (vtuberRef.current.offsetTop-deltHeight) >= dh) {
            tab = 'vtuber';
          }
        }
        if (tempTab !== tab) {
          tempTab = tab;
          if (props.onChangeTab){
            if (tempTab) {
              props.onChangeTab(`/#${tempTab}`);
            } else {
              props.onChangeTab(`/#`);
            }
          }
        }
      }, 100);
      return ()=>clearInterval(timmer);
    }, []);
  }

  return (
    <div className="videoPageRoot" ref={scrollElement}>
      <a className={'add'} href="https://www.youtube.com/channel/UCtWuTDvZeZ09COJ2SjfESzQ" target="_blank">
          <img className={'add'} src={'/add2.jpg'} alt="祈霓722 Ch." title="祈霓722 Ch."></img>
        </a>
        <a className={'add'} href="https://www.youtube.com/channel/UCaN_Pq3x9pzhb7t9KhxQm8Q" target="_blank">
          <img className={'add'} src={'/add1.jpg'} alt="夏莎莎 Zasasa" title="夏莎莎 Zasasa"></img>
        </a>
      <div className={'indexRoot'}>
        <div className={'indexPage'}>
          <img className={'logoImg'} src={'/logo.png'} alt="台姬殿" title="台姬殿"></img>
          <div className={'titleDiv'}>
            <div className={'title ' + (props.isMobile?'mobile':'')}>
              <a className="logoTitleImg" href="https://discord.gg/TVPC" target="_blank">
                <img className="discordImg" src="/discord.png" alt="台姬殿Discord:https://discord.gg/TVPC" title="台姬殿Discord:https://discord.gg/TVPC"></img>
                <span className="logoTitleImg">台姬殿</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {spVideos}
      {liveAndUpcoming}
      <div className={'vtuberList'}>
        <Vtuber updateVtuber={props.updateVtuber}></Vtuber>
      </div>
    </div>
  );
}
