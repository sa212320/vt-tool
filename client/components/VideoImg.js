import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useRouter } from 'next/router'
import { withStyles } from "@material-ui/core/styles";
import { setWatchVideo } from "../utils/localStorage";
import { mobileCheck } from '__dirname/utils/mobileCheck';

const styles = theme => ({

});

const VideoImg = (props) => {
  const router = useRouter()
  const { classes } = props;



  const watchVideo = ()=>{
    setWatchVideo(props.video);
    setTimeout(()=>{
      if (mobileCheck()) {
        window.open(`https://www.youtube.com/watch?v=${props.video.videoId}`);
      } else {
        router.push(`/watch`)
      }
    });
  };
  if (props.video) {
    const publishedAt = props.video&&moment(props.video.publishedAt).format('YYYY/MM/DD HH:mm:ss');
    return(
      <div className={'borderRoot videoImgRoot'} onClick={()=>watchVideo()}>
        <img className={'videoImg'} src={props.video.photo}></img>
        {props.video.liveBroadcastContent==='live'&&(
        <span className={'live'}>
          直播中
        </span>
        )}
        {props.video.liveBroadcastContent==='upcoming'&&(
        <span className={'upcoming'}>
          即將播放 {props.video&&moment(props.video.liveTime).format('MM/DD HH:mm')}
        </span>
        )}
        <div className={'titleDiv'}>
          <img className={'headImg'} src={props.video.vtuber&&props.video.vtuber.photo}></img>
          <div className={'title'}>
            {props.video.title}
          </div>
        </div>
        <div className={'timeDiv'}>
          <div className={'time'}>{props.video.vtuber&&props.video.vtuber.name}</div>
          <div className={'time'}>{publishedAt}</div>
        </div>
      </div>
    );
  }
  return <div className={'videoImgRoot'}></div>;
};

VideoImg.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
  
export default withStyles(styles, { withTheme: true })(VideoImg);