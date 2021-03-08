import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Vtuber from "__dirname/components/Vtuber.js";
import LiveVideos from "__dirname/components/LiveVideos.js";
import AllVideos from "__dirname/components/AllVideos.js";

const useStyles = makeStyles((theme) => ({
  root:{
    textAlign: 'center',
  },
  logoImg:{
    height: 400,
    verticalAlign: 'middle',
  },
  titleDiv:{
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  title:{
    fontSize: 80,
  },
  description:{
    fontSize: 20,
  },
  page:{
    height: '100%',
    overflow: 'auto',
    padding:' 0 40px',
    width: '100%',
  }
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <div className={classes.root}>
        <img className={classes.logoImg} src={'/DVD.png'}></img>
        <div className={classes.titleDiv}>
          <div className={classes.title}>Vt Tools</div>
          <div className={classes.description}>這是用來推廣台V的網站~~~</div>
        </div>
      </div>
      <Vtuber updateVtuber={props.updateVtuber}></Vtuber>
      <LiveVideos vtubers={props.vtubers}></LiveVideos>
      <AllVideos vtubers={props.vtubers}></AllVideos>
    </div>
  )
}
