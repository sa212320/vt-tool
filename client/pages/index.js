import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import {callApi} from '__dirname/utils/api';
import _ from'lodash';
import moment from'moment';
import Vtuber from "__dirname/components/Vtuber.js";
import VideoImg from "__dirname/components/VideoImg.js";
import AllVideosL from "__dirname/components/AllVideosL.js";
import { mobileCheck } from '__dirname/utils/mobileCheck';

export default function VideoPage(props) {
  const [liveAndUpcoming, setLiveAndUpcoming] = useState([]);
  const vtuberRef = useRef();
  const liveRef = useRef();
  const upcomingRef = useRef();
  const oldRef = useRef();
  const scrollElement = useRef();
  const deltHeight = 0;
  const isMobile = mobileCheck();
  useEffect(()=>{
    const fetchData = async () => {
      let videos = await callApi({path:'videos/live'});
      videos = videos.sort((a, b)=>{
        return a.liveTime - b.liveTime;
      });
      setVideoList(videos, props.vtubers);
    };
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

  const setVideoList = (videos, vtuberMapping) => {
    videos.forEach(video => {
      video.vtuber = vtuberMapping[video.channelId];
    });
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
    result.push(titleBar('影片'));
    result.push(<AllVideosL vtubers={props.vtubers} key={'oldVideo'}></AllVideosL>);

    
    result.push(<div ref={vtuberRef} key={'vtuberRef'}></div>);
    result.push(titleBar('Vtuber'));


    setLiveAndUpcoming(result);
    if (process.browser) {
      const hash = window.location.hash.split('_')[0];
      const id = hash.replace('#', '');
      switch (id) {
        case 'live': return scrollTo(liveRef, 120);
        case 'upcoming': return scrollTo(upcomingRef);
        case 'old': return scrollTo(oldRef);
        case 'vtuber': return scrollTo(vtuberRef);
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
        case 'live': return scrollTo(liveRef, 120);
        case 'upcoming': return scrollTo(upcomingRef);
        case 'old': return scrollTo(oldRef);
        case 'vtuber': return scrollTo(vtuberRef);
      }
      scrollTo();
    }, [window.location.hash]);
    useEffect(()=>{
      const timmer = setInterval(() => {
        if (tempTab === undefined) return;
        let tab = '';
        if (scrollElement.current && liveRef.current) {
          if (scrollElement.current.scrollTop - (liveRef.current.offsetTop-deltHeight) > 0) {
            tab = 'live';
          }
        }
        if (scrollElement.current && upcomingRef.current) {
          if (scrollElement.current.scrollTop - (upcomingRef.current.offsetTop-deltHeight) > 0) {
            tab = 'upcoming';
          }
        }
        if (scrollElement.current && oldRef.current) {
          if (scrollElement.current.scrollTop - (oldRef.current.offsetTop-deltHeight) > 0) {
            tab = 'old';
          }
        }
        if (scrollElement.current && vtuberRef.current) {
          if (scrollElement.current.scrollTop - (vtuberRef.current.offsetTop-deltHeight) > 0) {
            tab = 'vtuber';
          }
        }
        if (tempTab !== tab) {
          tempTab = tab;
          if (props.onChangeTab){
            if (tempTab) {
              props.onChangeTab(`/#${tempTab}`)
            } else {
              props.onChangeTab(`/`)
            }
          }
        }
      }, 100);
      return ()=>clearInterval(timmer);
    }, []);
  }

  return (
    <div className="videoPageRoot" ref={scrollElement}>
      <div className={'indexRoot'}>
        <div className={'indexPage'}>
          <img className={'logoImg'} src={'/DVD.png'}></img>
          <div className={'titleDiv'}>
            <div className={'title ' + (isMobile?'mobile':'')}>Vt Tools</div>
            <a href="https://www.youtube.com/channel/UCR3qiQWYf6aVN6eZxXsCnwg/">
              <img className="youtubeImg" src="/youtube.png"></img>
            </a>
            <a href="https://twitter.com/DdVtuber">
              <img className="twitterImg" src="/twitter.png"></img>
            </a>
          </div>
        </div>
      </div>
      {liveAndUpcoming}
      <div className={'vtuberList'}>
        <Vtuber updateVtuber={props.updateVtuber}></Vtuber>
      </div>
    </div>
  );
}
