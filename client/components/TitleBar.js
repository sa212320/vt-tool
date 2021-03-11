import React from 'react';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
          <img className={'logoImg'}  src={'/DVD.png'}></img>
          <span className={'title'} >Vt Tools</span>
        </a>
      </Link>
    </div>
  );
}