import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: 64,
    backgroundColor:'white',
  },
  logoImg: {
    height: 64,
    verticalAlign: 'middle',
    marginLeft: 24,
    cursor: 'pointer',
  },
  title:{
    fontSize: 22,
    fontWeight: 800,
    verticalAlign: 'middle',
    cursor: 'pointer',
    color: 'black'
  },
  link:{
    textDecoration: 'auto',
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Link href="/"> 
        <a className={classes.link}>
          <img className={classes.logoImg}  src={'/DVD.png'}></img>
          <span className={classes.title} >Vt Tools</span>
        </a>
      </Link>
    </div>
  );
}