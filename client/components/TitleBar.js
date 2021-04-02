import React from 'react';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';

export default function MenuAppBar(props) {
  const onOpen = props.onOpen;
  return (
    <div className={'titleBarRoot'} >
      <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
          edge="start"
        >
          <MenuIcon />
      </IconButton>
      <Link href="/"> 
        <a className={'link'}>
          <img className={'logoImg'} src={'/DVD.png'} alt="DD子" title="DD子"></img>
          <span className={'title'} >DD tools</span>
        </a>
      </Link>
      <div className={'titleBarRightDiv'}>
        
        <Switch
          checked={props.isBlack}
          onChange={props.changeMode}
          color="primary"
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        {props.isBlack?<NightsStayIcon/>:<WbSunnyIcon/>}
      </div>
    </div>
  );
}