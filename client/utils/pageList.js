import HomeIcon from '@material-ui/icons/Home';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';

const pageList = [
  {path: '/', title: '首頁', icon: <HomeIcon/>},
  {path: '/live', title: '直播', icon: <PlayCircleFilledWhiteIcon/>},
  {path: '/status', title: '頻道列表', icon: <SupervisedUserCircleIcon/>},
  {path: '/videos', title: '影片', icon: <OndemandVideoIcon/>},
  // {path: '/songs', title: '歌曲', icon: <MusicVideoIcon/>},
];

export {pageList};