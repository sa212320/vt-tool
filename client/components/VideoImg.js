import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useRouter } from 'next/router'
import { withStyles } from "@material-ui/core/styles";
import { setWatchVideo } from "../utils/localStorage";
import { mobileCheck } from '__dirname/utils/mobileCheck';

const styles = theme => ({
  root:{
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: 200,
    textAlign: 'center',
    display: 'inline-block',
    flex: 1,
    overflow: 'hidden',
    position: 'relative',

  },
  headImg: {
    width: 60,
    borderRadius: '50%',
    border: '2px solid',
    verticalAlign: 'middle',
  },
  timeDiv:{
    display: 'inline-block',
    marginTop: 7,
    marginBottom: 7,
    width: 'calc(100% - 20px)',
    overflow: 'hidden',
    textAlign: 'right',
  },
  titleDiv:{
    display: 'inline-block',
    marginTop: 7,
    marginBottom: 7,
    height: 80,
    width: 'calc(100% - 20px)',
    overflow: 'hidden',
    textAlign: 'right',
  },
  title:{
    display: 'inline-block',
    width: 'calc(100% - 82px)',
    textAlign: 'left',
    marginLeft: 14,
    verticalAlign: 'middle',
    maxHeight: 60,
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-inline-box',
    overflow: 'hidden',
  },
  videoImg: {
    width: '100%',
  },
  time: {
    color: 'rgba(0,0,0,0.4)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  live: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 25,
    padding: '2px 9px',
    fontWeight: 800,
    position: 'absolute',
    whiteSpace: 'nowrap',
    left: '50%',
    transform: `translateX(-50%)`,
    bottom: 151,
  },
  upcoming: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 25,
    padding: '2px 9px',
    fontWeight: 800,
    position: 'absolute',
    whiteSpace: 'nowrap',
    left: '50%',
    transform: `translateX(-50%)`,
    bottom: 151,
  }
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
      <div className={'borderRoot ' + classes.root} onClick={()=>watchVideo()}>
        <img className={classes.videoImg} src={props.video.photo}></img>
        {props.video.liveBroadcastContent==='live'&&(
        <span className={classes.live}>
          直播中
        </span>
        )}
        {props.video.liveBroadcastContent==='upcoming'&&(
        <span className={classes.upcoming}>
          即將播放 {props.video&&moment(props.video.liveTime).format('YYYY/MM/DD HH:mm')}
        </span>
        )}
        <div className={classes.titleDiv}>
          <img className={classes.headImg} src={props.video.vtuber&&props.video.vtuber.photo}></img>
          <div className={classes.title}>
            {props.video.title}
          </div>
        </div>
        <div className={classes.timeDiv}>
          <div className={classes.time}>{props.video.vtuber&&props.video.vtuber.name}</div>
          <div className={classes.time}>{publishedAt}</div>
        </div>
      </div>
    );
  }
  return <div className={classes.root}></div>;
};

VideoImg.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
  
export default withStyles(styles, { withTheme: true })(VideoImg);