
import React, { useEffect, useState } from 'react';
import {callApi} from '__dirname/utils/api';
import VideoImg from "__dirname/components/VideoImg.js";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Count from "__dirname/components/Count.js";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';


export default function AllVideos(props) {
  const now = moment();
  const [selectedDate, setSelectedDate] = useState(now);
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  let videos = [];
  
  const handleDateChange = async (data)=>{
    setSelectedDate(data);
    await getVideoList(data);
    if (videos.length) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }
  const setVtuberList = (vtuberMapping) => {
    const l = videos.map((doc)=>{
      doc.vtuber = vtuberMapping[doc.channelId];
      return (
        <VideoImg video={doc}/>
      )
    });
    setVideoList(l);
  }
  const getVideoList = async (data) => {
    const startTime = data.startOf('day').valueOf();
    const endTime = data.endOf('day').valueOf();
    const params = {startTime, endTime}
    videos = await callApi({path:'videos/time', params, data:params});
    videos = videos.sort((a, b)=>{
      return b.publishedAt - a.publishedAt;
    });
    console.log(videos)
    setVtuberList(props.vtubers);
  }
  const stopPropagation = (e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  useEffect(()=>{
    const fetchData = async () => {
      getVideoList(now);
    };
    fetchData();
  }, [props.vtubers]);

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        onClick={()=>setExpanded(!expanded)}
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <Count count={videoList.length}>
            所有影片
          </Count>
          <div onClick={stopPropagation}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className="videoDataPicker"
                disableToolbar
                variant="inline"
                format="YYYY/MM/DD"
                margin="normal"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}>
                
              </KeyboardDatePicker>
            </MuiPickersUtilsProvider>
          </div>
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
  )
}
