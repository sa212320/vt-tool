
import React, { useEffect, useState } from 'react';
import {callApi} from '__dirname/utils/api';
import VideoImg from "__dirname/components/VideoImg.js";
import Count from "__dirname/components/Count.js";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function LiveVideos(props) {
  const [videoList, setVideoList] = useState([]);
  let videos = [];
  useEffect(()=>{
    const fetchData = async () => {
      videos = await callApi({path:'videos/live'});
      videos = videos.sort((a, b)=>{
        return a.liveTime - b.liveTime;
      });
      setVtuberList(props.vtubers);
    };
    fetchData();
  }, [props.vtubers]);

  const setVtuberList = (vtuberMapping) => {

    const l = videos.map((doc)=>{
      doc.vtuber = vtuberMapping[doc.channelId];
      return (
        <VideoImg key={doc.videoId} video={doc}/>
      )
    });
    setVideoList(l);
  }

  return (
    videoList.length?(
      <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Count count={videoList.length}>
              直播 / 即將播放
            </Count>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      </>
    ):(
      <div></div>
    )
  )
}
