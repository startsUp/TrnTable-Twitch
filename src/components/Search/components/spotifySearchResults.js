import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    display: 'grid',
    overflow: 'auto',
    height: '100%'
  },
  inline: {
    display: 'inline',
  },
  backIcon: {
    position: 'fixed',
    top: '0.5rem',
    left: '0.5rem'
  }
}));

const Error = (props) => (
  <Box>
    props.error.errorMsg
  </Box>
)

export default function SpotifySearchResults(props) {
    const classes = useStyles();

    return( // TODO: FIX STYLING 
      <div>
        <ArrowBackIcon onClick={props.backToSearch} className={classes.backIcon}/>
        { props.error.errorMsg !== '' && 
          <Error {...props}/>
        }
					<List className={classes.root}>
					{   props.error.errorMsg === '' &&
							props.tracks.map(track => {
									return(
                    <React.Fragment>
                      <ListItem alignItems="flex-start" key={track.id}>
                          <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={track.album.images[0].url} />
                          </ListItemAvatar>
                          <ListItemText
                          primary={track.name}
                          secondary={track.artists.map(artist => artist.name).join(", ")}
                          />        
                      </ListItem>
                    </React.Fragment>
										
									)
							})
					}
					
					</List>
      </div>
    )   
}
