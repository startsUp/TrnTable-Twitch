import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Avatar } from '@material-ui/core';
import { getThemeProps } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  albumImage: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
}));


export function SpotifyNowPlaying(props) {
    const { track } = props;

    return(
        <Box>
          <Avatar alt={track.album.name}
            variant="rounded" src={track.album.images[0].url} 
            className={classes.albumImage}
          />
        </Box>
    )
    
}

export default SpotifySearchResults
