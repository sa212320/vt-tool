import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Link from 'next/link'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  head:{
    padding: theme.spacing(),
    textAlign: 'center',
    display: 'inline-block',
    border: '1px solid',
  },
  headImg: {
    width: 100,
    borderRadius: '50%',
    border: '1px solid',
  }
});

const VtuberHead = (props) => {
  const { classes } = props;
//   channelId: "UCoSrY_IQQVpmIRZ9Xf-y93g"
// createdAt: "2021-02-25T07:52:32.746Z"
// description: "A descendant of the Lost City of Atlantis, who swam to Earth while saying, "It's so boring down there LOLOLOL!" She bought her clothes (and her shark hat) in the human world and she really loves them. In her spare time, she enjoys talking to marine life.↵↵For Inquiries↵Cover Corp: http://cover-corp.com/↵Official Twitter: https://twitter.com/hololive_En"
// name: "Gawr Gura Ch. hololive-EN"
// photo: "https://yt3.ggpht.com/ytc/AAUvwnhSSaF3Q-PyyTSis4EH6Cu8FZ32LNvkxI9Gl_rn=s800-c-k-c0x00ffffff-no-rj"
// publishedAt: 1594880720801
// subscriberCount: 2280000
// updatedAt: "2021-02-25T07:52:32.746Z"
// uploadsId: "UUoSrY_IQQVpmIRZ9Xf-y93g"
// videoCount: 116
// viewCount: 81180177
  const publishedAt = moment(props.vtuber.publishedAt).format('YYYY/MM/DD');
  return (
    <div className={classes.head}>
      <img className={classes.headImg} src={props.vtuber.photo}></img>
      <div>{props.vtuber.name}</div>
      <div>{props.vtuber.subscriberCount} 位訂閱者</div>
      <div>{props.vtuber.viewCount} 總觀看次數</div>
      <div>{props.vtuber.videoCount} 影片數量</div>
      <div>{publishedAt} 出道時間</div>
      <a href={'https://www.youtube.com/channel/'+props.vtuber.channelId}>youtube</a>
    </div>
  )
};

VtuberHead.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
  
export default withStyles(styles, { withTheme: true })(VtuberHead);