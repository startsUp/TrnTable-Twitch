import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


export function SpotifySearchResults(props) {


    return(
        <List className={classes.root}>
        {
            props.tracks.map(track => {
                return(
									<ListItem alignItems="flex-start" key={track.id}>
											<ListItemAvatar>
											<Avatar alt="Remy Sharp" src={track.album.images[0].url} />
											</ListItemAvatar>
											<ListItemText
											primary={track.name}
											secondary={
													<React.Fragment>
														{track.artist.map(artist => artist.name).join(", ")}
													</React.Fragment>
											}
											/>
											<Divider variant="inset" component="li" />
									</ListItem>
									
                )
            })
        }
      
      </List>
    )
    
}

export default SpotifySearchResults
