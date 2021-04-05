import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Link from 'next/link'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  headImg: {
    width: 100,
    borderRadius: '50%',
    border: '1px solid',
  },
  headDiv: {
    width: 220,
    position:'absolute',
    top:'50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  youtube: {
    width: 80,
  },
  youtubeDiv:{
    position: 'relative',
    margin: 'auto',
    marginTop: -13,
    width: 80,
    height: 22,
    overflow: 'hidden',
    borderRadius: 5,
    border: '1px solid',
  },
});

const VtuberHead = (props) => {
  const { classes } = props;
  const publishedAt = moment(props.vtuber.publishedAt).format('YYYY/MM/DD');
  return (
    <div className={'vtuberHead'}>
      <div className={classes.headDiv}>
        <img className={classes.headImg} src={props.vtuber.photo}></img>
        <div className={classes.youtubeDiv}>
          <a href={'https://www.youtube.com/channel/'+props.vtuber.channelId}>
            <img className={'vtuberHeadYoutubeImg'} src="/youtube.png"></img>
          </a>
        </div>
        <div>{props.vtuber.name}</div>
        <div>{props.vtuber.subscriberCount||'-'} 位訂閱者</div>
        <div>{props.vtuber.viewCount||'-'} 總觀看次數</div>
        <div>{props.vtuber.videoCount||'-'} 影片數量</div>
        <div>{publishedAt} 頻道創立時間</div>
      </div>
    </div>
  )
};

VtuberHead.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
  
export default withStyles(styles, { withTheme: true })(VtuberHead);