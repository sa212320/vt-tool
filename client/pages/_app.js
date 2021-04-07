import React, { useEffect, useState } from 'react';
import {callApi} from '__dirname/utils/api';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider  } from "@material-ui/core/styles";
import theme from "__dirname/styles/theme.js";
import TitleBar from "__dirname/components/TitleBar.js";
import Drawer from "__dirname/components/Drawer.js";
import Head from 'next/head'
import { mobileCheck } from '__dirname/utils/mobileCheck';
import { getOrSetIsBlack } from "../utils/localStorage";


global.videoIdMap = {};
global.searchVideos = [];
global.videos = [];
global.maxLiveVideoLength = 9;

const MyApp = ({ Component, pageProps}) => {
  const [isMobile, setIsMobile] = useState();
  const [vtubers, setVtubers] = useState({});
  const [open, setOpen] = useState(true);
  const [isBlack, setIsblack] = useState();
  const [chooseTab, setChooseTab] = useState('/');
  useEffect(()=>{
    const fetchData = async () => {
      const vtubers = await callApi({path:'vtuber'});
      updateVtuber(vtubers);
    };
    fetchData();
  }, []);
  if (process.browser) {
    useEffect(()=>{
      setTimeout(()=>{
        const isMobile = mobileCheck();
        setIsMobile(isMobile);
        setOpen(!isMobile)
        const pathname = window.location.pathname+window.location.hash.split('_')[0];
        setChooseTab(pathname);
      })
    }, [window.location.pathname, window.location.hash]);
    useEffect(()=>{
      const isMobile = mobileCheck();
      setIsMobile(isMobile);
      setIsblack(getOrSetIsBlack())
    }, []);
  }

  const updateVtuber = (vtubers) =>{
    const mapping = {};
    vtubers.forEach(vtuber => {
      mapping[vtuber.channelId] = vtuber;
    });
    setVtubers(mapping);
  };
  const onChangeTab = (tab) => {
    setChooseTab(tab);
    if (isMobile) {
      setOpen(false);
    }
  };
  const changeMode = (mode) => {
    getOrSetIsBlack(mode)
    setIsblack(mode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>台姬殿 Vt-Tools</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta name="description" content="這裡有很多台灣 Vtuber 喔~"/>
        <meta name="keywords" content="Vtuber, 台灣Vtuber"></meta>
        <meta name="author" content="DVD"></meta>
        <meta name="google-site-verification" content="xheW9NlN4Om6u9IX6OBS0kaoWySa1dGed_w-JIhClD4"/>
        <link rel="icon" href="/logo.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/logo.ico" type="image/x-icon"/>
      </Head>
      <CssBaseline />
      <div className={"mainRoot " + (isBlack?'blackMode ':'') + (isMobile?'mobileMode ':'')}>
        <TitleBar onOpen={()=>setOpen(!open)} changeMode={()=>changeMode(!isBlack)} isBlack={isBlack}/>
        <Drawer open={open} onClose={setOpen} chooseTab={chooseTab} setChooseTab={onChangeTab}/>
        <div className={`main0 ${open&&'onOpen'}`}>
          <div className="main">
            <Component {...pageProps} vtubers={vtubers} updateVtuber={updateVtuber} onChangeTab={onChangeTab} isMobile={isMobile}/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default MyApp;
