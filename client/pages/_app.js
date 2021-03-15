import React, { useEffect, useState } from 'react';
import {callApi} from '__dirname/utils/api';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider  } from "@material-ui/core/styles";
import theme from "__dirname/styles/theme.js";
import TitleBar from "__dirname/components/TitleBar.js";
import Drawer from "__dirname/components/Drawer.js";
import Head from 'next/head'
import { mobileCheck } from '__dirname/utils/mobileCheck';


global.videoIdMap = {};
global.searchVideos = [];
global.videos = [];

const MyApp = ({ Component, pageProps}) => {
  const isMobile = mobileCheck();
  const [vtubers, setVtubers] = useState({});
  const [open, setOpen] = useState(!isMobile);
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
        const pathname = window.location.pathname+window.location.hash.split('_')[0];
        setChooseTab(pathname);
      })
    }, [window.location.pathname, window.location.hash]);
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

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Vt-Tools</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CssBaseline />
      <div className="mainRoot">
        <TitleBar onOpen={()=>setOpen(!open)}/>
        <Drawer open={open} onClose={setOpen} chooseTab={chooseTab} setChooseTab={onChangeTab}/>
        <div className={`main0 ${open&&'onOpen'}`}>
          <div className="main">
            <Component {...pageProps} vtubers={vtubers} updateVtuber={updateVtuber} onChangeTab={onChangeTab}/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default MyApp;
