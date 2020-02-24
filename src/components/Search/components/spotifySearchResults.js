import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Button, Typography, Avatar, ListItemAvatar, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
  },
  results: {
    width: '100%',
    maxWidth: 360,
    paddingBottom: theme.spacing(2),
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    paddingLeft: '8px'
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
  },
  albumImage: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }, 
  listItem: {
    fontSize: '0.8rem'
  },
  request: {
    top: theme.spacing(1),
    right: theme.spacing(1)
  },
  requestButton: {
    borderRadius: theme.spacing(2),
    justifySelf: 'end',
    fontFamily: 'sofia_problack',
  },
  header: {
    position: 'sticky',
    top: '0px',
    backgroundColor: 'rgba(25,20,20,0.95)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '5px',
    zIndex: '10'
  }
}));

const Error = (props) => (
  <Box>
    props.error.errorMsg
  </Box>
)

export default function SpotifySearchResults(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(-1);
    
    
    const handleToggle = value => () => {
      setChecked(value);
    };

    return( // TODO: FIX STYLING 
      <div className={classes.root}>
      <div className={classes.header}>
      <ArrowBackIcon onClick={props.backToSearch} className={classes.backIcon} color='primary' />
        { props.error.errorMsg !== '' && 
          <Error {...props}/>
        }
       
            
        <Button variant="outlined" size="small" color="primary" className={classes.requestButton} disabled={checked.length === 0}>
          Request
        </Button>
      </div>
					<List className={classes.results}>
					{   props.error.errorMsg === '' &&
							props.tracks.map((track,index) => {
                  const labelId = `checkbox-request-song-label-${index}`;
									return(
                    <React.Fragment key={track.id}>
                      <ListItem alignItems="flex-start" >
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
                              checked={checked === index}
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
