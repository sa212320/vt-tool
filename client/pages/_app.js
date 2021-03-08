import React, { useEffect, useState } from 'react';
import {callApi} from '__dirname/utils/api';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider  } from "@material-ui/core/styles";
import theme from "__dirname/styles/theme.js";
import TitleBar from "__dirname/components/TitleBar.js";

const MyApp = ({ Component, pageProps}) => {
  const [vtubers, setVtubers] = useState({});
  useEffect(()=>{
    const fetchData = async () => {
      const vtubers = await callApi({path:'vtuber'});
      updateVtuber(vtubers);
    };
    fetchData();
  }, []);

  const updateVtuber = (vtubers) =>{
    const mapping = {};
    vtubers.forEach(vtuber => {
      mapping[vtuber.channelId] = vtuber;
    });
    setVtubers(mapping);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar/>
      <div className="main">
        <Component {...pageProps} vtubers={vtubers} updateVtuber={updateVtuber}/>
      </div>
    </ThemeProvider>
  )
}

export default MyApp;
