import React from 'react';
import Vtuber from "__dirname/components/Vtuber.js";

export default function Home(props) {
  return (
    <div className={'vtuberRoot'}>
      <Vtuber updateVtuber={props.updateVtuber}></Vtuber>
    </div>
  )
}
