import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Vtuber from "__dirname/components/Vtuber.js";
import LiveVideos from "__dirname/components/LiveVideos.js";
import AllVideos from "__dirname/components/AllVideos.js";
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Home(props) {
  return (
    <div className={'indexRoot'}>
      <div className={'indexPage'}>
        <img className={'logoImg'} src={'/DVD.png'}></img>
        <div className={'titleDiv'}>
          <div className={'title'}>Vt Tools</div>
          <a href="https://www.youtube.com/channel/UCR3qiQWYf6aVN6eZxXsCnwg/">
            <img className="youtubeImg" src="/youtube.png"></img>
          </a>
          <a href="https://twitter.com/DdVtuber">
            <img className="twitterImg" src="/twitter.png"></img>
          </a>
        </div>
      </div>
    </div>
  )
}
