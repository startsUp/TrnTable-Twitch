import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Button, Typography, Avatar, ListItemAvatar, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import { TrackList } from '../../Misc/trackList';

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
      cursor: 'pointer'
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
    cursor: 'pointer'
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
    const [selected, setSelected] = React.useState(-1);
    
    
    const handleChange = values => {
      setSelected(values[0]); // TODO: Support multiple song requests
    };

    return( // TODO: FIX STYLING 
      <div className={classes.root}>
      <div className={classes.header}>
      <ArrowBackIcon onClick={props.onNavigateBack} className={classes.backIcon} color='primary' />
        { props.error.errorMsg !== '' && 
          <Error {...props}/>
        }
       
            
        <Button variant="outlined" size="small" color="primary" onClick={() => props.onRequest(props.tracks[selected])} className={classes.requestButton} disabled={selected === -1 || selected === null || selected === undefined }>
          Request
        </Button>
      </div>
        <TrackList tracks={props.tracks} emptyMsg="No Songs Found" hint="" maxSelection={1} onChange={handleChange}/>  
      </div>
    )   
}


