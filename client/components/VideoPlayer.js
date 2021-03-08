import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

});

const VideoPlayer = (props) => {
  const { classes } = props;
  console.log(props.videoId)
  if (props.videoId) {
    const src = `https://www.youtube.com/embed/${props.videoId}`;
    return (
      <div>
        <iframe 
          width="560" 
          height="315" 
          src={src}
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
};

VideoPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
  
export default withStyles(styles, { withTheme: true })(VideoPlayer);