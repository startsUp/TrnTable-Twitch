import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { getThemeProps } from '@material-ui/styles';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems: 'center',
    paddingTop: theme.spacing(3)
  },
  albumImage: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  vote: {
    fill: 'none',
    stroke: theme.palette.primary.main
  },
  selectedVote: {
    fill: theme.palette.primary.main
  }
}));

const Vote = { NONE: 1, LIKE: 2, DISLIKE: 3}
export default function SpotifyNowPlaying(props) {
    const classes = useStyles();
    const [vote, setVote] = React.useState(Vote.NONE);
    const track = {
      artists: [{
        external_urls: {spotify: "https://open.spotify.com/artist/7gP3bB2nilZXLfPHJhMdvc"},
        href: "https://api.spotify.com/v1/artists/7gP3bB2nilZXLfPHJhMdvc",
        id: "7gP3bB2nilZXLfPHJhMdvc",
        name: "Foster The People",
        type: "artist",
        uri: "spotify:artist:7gP3bB2nilZXLfPHJhMdvc",
      }],
      album: {
        images: [{height: 640, url: "https://i.scdn.co/image/ab67616d0000b273ca02f2ecba4a803b191c7eab", width: 640},
        {height: 300, url: "https://i.scdn.co/image/ab67616d00001e02ca02f2ecba4a803b191c7eab", width: 300},
        {height: 64, url: "https://i.scdn.co/image/ab67616d00004851ca02f2ecba4a803b191c7eab", width: 64}],
        name: "Sacred Hearts Club"
      },
      name: "Doing It for the Money"
    }

    const handleVote = (newVote) => { 
      if (vote === newVote)
        setVote(Vote.NONE)
      else
        setVote(newVote);
    }

    return(
        <div className={classes.root}>
          <Avatar alt={track.album.name}
            variant="rounded" src={track.album.images[0].url} 
            className={classes.albumImage}
          />
          <Typography variant="h6" color='textPrimary'>{track.name}</Typography>
          <Typography variant="body2" color='textSecondary'>{track.artists.map(artist => artist.name).join(", ")}</Typography>
          <Box>
            <ThumbDownRoundedIcon className={vote === Vote.DISLIKE ? classes.selectedVote : classes.vote} onClick={() => handleVote(Vote.DISLIKE)}/>
            <ThumbUpAltRoundedIcon className={vote === Vote.LIKE ? classes.selectedVote : classes.vote} onClick={() => handleVote(Vote.LIKE)}/>
          </Box>
        </div>
    )
    
}
