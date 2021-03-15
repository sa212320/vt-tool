
import React, { useEffect, useState } from 'react';
import {callApi} from '__dirname/utils/api';
import VideoImg from "__dirname/components/VideoImg.js";
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
        <VideoImg video={doc} key={doc.videoId}/>
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
    <>
      <div>
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
