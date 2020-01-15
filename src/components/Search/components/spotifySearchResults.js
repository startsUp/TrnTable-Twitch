import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid, Typography, Avatar, ListItemAvatar, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '20px auto',
  },
  results: {
    width: '100%',
    maxWidth: 360,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  artistName:{
    fontSize: '0.75rem'
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
    position: 'sticky',
    top: theme.spacing(1)
  },
  albumImage: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }, 
  listItem: {
    fontSize: '0.8rem'
  }
}));

const Error = (props) => (
  <Box>
    props.error.errorMsg
  </Box>
)

export default function SpotifySearchResults(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    
    
    const handleToggle = value => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    return( // TODO: FIX STYLING 
      <div className={classes.root}>
        <ArrowBackIcon onClick={props.backToSearch} className={classes.backIcon} color='primary' />
        { props.error.errorMsg !== '' && 
          <Error {...props}/>
        }
					<List className={classes.results}>
					{   props.error.errorMsg === '' &&
							props.tracks.map((track,index) => {
                  const labelId = `checkbox-request-song-label-${index}`;
									return(
                    <React.Fragment>
                      <ListItem alignItems="flex-start" key={track.id}>
                          <ListItemAvatar>
                          <Avatar alt={track.album.name}/* TO DO: CHECK if right way to access album name*/
                            variant="rounded" src={track.album.images[0].url} 
                            className={classes.albumImage}
                           />
                          </ListItemAvatar>
                          <ListItemText
                            primaryTypographyProps={{color: 'textPrimary'}}
                            classes={{secondary: classes.artistName}}
                            primary={track.name}
                            secondary={track.artists.map(artist => artist.name).join(", ")}
                            className={classes.listItem}
                          />
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="end"
                              disabled={false}
                              onChange={handleToggle(index)}
                              checked={checked.indexOf(index) !== -1}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemSecondaryAction>        
                      </ListItem>
                    </React.Fragment>
										
									)
							})
					}
					
					</List>
      </div>
    )   
}
