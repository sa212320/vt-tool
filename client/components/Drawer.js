import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { useRouter } from 'next/router'
import {callApi} from '__dirname/utils/api';
import { mobileCheck } from '__dirname/utils/mobileCheck';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import MovieIcon from '@material-ui/icons/Movie';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -20,
    top: 15,
    left: 'calc(100% + -8px)',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function myDrawer(props) {
  const router = useRouter()
  const { open } = props;
  const [vtuberCount, setVtuberCount] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  let list = [];
  if (mobileCheck()) {
    list = [
      { text:'首頁', count:0, icon: <HomeIcon/>, url:'/'},
      { text:'直播中', count:liveCount, icon: <VideocamIcon/>, url:'/#live'},
      { text:'即將播放', count:upcomingCount, icon: <AccessAlarmIcon/>, url:'/#upcoming'},
      { text:'影片(日期)', count:0, icon: <MovieIcon/>, url:'/#old'},
      { text:'影片(關鍵字)', count:0, icon: <MovieIcon/>, url:'/#date'},
      { text:'Vtuber', count:0, icon: <AssignmentIndIcon/>, url:'/#vtuber'},
    ];
  } else {
    list = [
      { text:'直播室', count:0, icon: <OndemandVideoIcon/>, url:'/watch'},
      { text:'首頁', count:0, icon: <HomeIcon/>, url:'/#'},
      { text:'直播中', count:liveCount, icon: <VideocamIcon/>, url:'/#live'},
      { text:'即將播放', count:upcomingCount, icon: <AccessAlarmIcon/>, url:'/#upcoming'},
      { text:'影片(日期)', count:0, icon: <MovieIcon/>, url:'/#old'},
      { text:'影片(關鍵字)', count:0, icon: <MovieIcon/>, url:'/#date'},
      { text:'Vtuber', count:0, icon: <AssignmentIndIcon/>, url:'/#vtuber'},
    ];
  }
  

  useEffect(()=>{
    const fetchData = async () => {
      // getCount('vtuber/count', setVtuberCount);
      getCount('videos/liveCount', setLiveCount);
      getCount('videos/upcomingCount', setUpcomingCount);
    };
    fetchData();
  }, []);

  const gotoUrl = (url) => {
    props.setChooseTab(url);
    if (url.indexOf('#')>=0){
      router.push(url+`_${new Date().getTime()}`);
    }else{
      router.push(url);
    }
  };
  const getCount = async (path, set) => {
    const r = await callApi({path});
    set(r.count);
  };

  return (
    <Drawer
      className={"drawer"}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <List>
        {list.map(({text, icon, url, count}) => (
          <ListItem className={url===props.chooseTab?"isTabActive":""} button key={text} onClick={()=>gotoUrl(url)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <StyledBadge badgeContent={count} color="secondary">
              <ListItemText primary={text} />
            </StyledBadge>
          </ListItem>
        ))}
      </List>
      <div className={'indexPageDiscriptions'}>
        <div>
          <div>
            <Link href="/privacy">
              <a>隱私權政策與條款</a>
            </Link>
          </div>
          <div>
          聯絡資訊:
          </div>

          <div>
            <EmailIcon></EmailIcon>
            <a href="mailto:dvdvd5566@gamil.com">dvdvd5566@gamil.com</a>
          </div>
          <div>
            <TwitterIcon></TwitterIcon>
            <a href="https://twitter.com/DdVtuber">Twitter</a>
          </div>
          <div>
            <YouTubeIcon></YouTubeIcon>
            <a href="https://www.youtube.com/channel/UCR3qiQWYf6aVN6eZxXsCnwg/">Youtube</a>
          </div>
        </div>

        <img className={'dvdImg'} src={'/DVD.png'}></img>
      </div>
    </Drawer>
  );
}