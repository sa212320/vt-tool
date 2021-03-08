import React from "react";
import PropTypes from "prop-types";
import Link from 'next/link'
import { withStyles } from "@material-ui/core/styles";
import { pageList } from '__dirname/utils/pageList';


const drawerWidth = 160;

const styles = theme => ({
  sidebar:{
    maxWidth: drawerWidth,
    flex:1,
    fontSize: 18,
    // background: 'red',
    boxShadow: '0px 0px 1px 1px',
  },
  hide: {
    display: "none"
  },
  drawer: {
    maxWidth: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    maxWidth: drawerWidth,
    transition: theme.transitions.create("max-width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("max-width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    maxWidth: 0,
  },
  icon:{
    display: 'inline-block',
    padding: '16px 7px 0px 20px',
    position: 'relative',
    top: '5px',
  },
  link:{
    color: 'black',
  }
});

const Sidebar = (props) => {
  const { classes } = props;
  const { open } = props;
  const links = pageList.map(({path, title, icon})=>{
    return (
      <div key={title}>
        <Link href={path}>
          <a className={classes.link} onClick={()=>goto(title)}>
            <i className={classes.icon}>{icon}</i>
            {title}
          </a>
        </Link>
      </div>
    )
  })
  const goto = (title) => {
    props.goto(title);
  };
  return (
    <div className={`${classes.sidebar} ${classes.drawer} ${open?classes.drawerOpen:`${classes.drawerClose}`}`}>
      {links}
    </div>
  )
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
  
export default withStyles(styles, { withTheme: true })(Sidebar);
