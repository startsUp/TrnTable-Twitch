import React, { Component, useState, useEffect } from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Button, Typography, Avatar, ListItemAvatar, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import { TrackList } from '../Misc/trackList';
import Collapse from '@material-ui/core/Collapse';
import { TextWithTitle } from '../Misc/TextWithTitle';

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
  stopRequestButton: {
		color: theme.palette.error.light,
		borderColor: theme.palette.error.light,
		...theme.button
	},
	resumeRequestButton: {
		color: theme.palette.primary.main,
		borderColor: theme.palette.primary.main,
		...theme.button
  },
  collapseHeader: {
    position: 'sticky',
    top: '0px',
    backgroundColor: 'rgba(25,20,20,0.98)',
    zIndex: '15',
  },
  header: {
    padding: '8px',
    display: 'inline-flex',
  },
  settingsIcon: {
    transition: 'all 0.8s ease',
    cursor: 'pointer',
    position: 'absolute',
    right: '3px',
    zIndex: '20',
    padding: theme.spacing(1)
  },
  activeSettingsIcon: {
    cursor: 'pointer',
    position: 'absolute',
    right: '3px',
    zIndex: '20',
    padding: theme.spacing(1),
    transform: 'rotate(135deg)',
    transition: 'all 0.8s ease'
  }
}));

const Error = (props) => (
  <Box>
    props.error.errorMsg
  </Box>
)

export default function SpotifySongRequests(props) {
	const classes = useStyles();
	const resetChecked = React.useRef(null);
	const currentTracks = props.requests
	const [isTakingRequests, setRequestStatus] = React.useState(true);
  const [selected, setSelected] = React.useState([]);
  const [showingSettings, showSettings] = React.useState(false)


	const handleStatusChange = () => {
    const willTakeRequests = !isTakingRequests
    setRequestStatus(willTakeRequests)
		props.setRequestTakingStatus(willTakeRequests)
  }
  
  const handleSelect = (values, resetCallback) => {
    console.log(values)
    setSelected(values)
    resetChecked.current = resetCallback
  }

  const handleRemove = () => {
    let reset = resetChecked.current // get the current callback
    reset() // reset selected songs
    setSelected([])
    props.onRemove(selected)
  }
  
	return( // TODO: FIX STYLING 
		<div className={classes.root}>
      <SettingsIcon className={showingSettings ? classes.activeSettingsIcon : classes.settingsIcon} style={{cursor: 'pointer'}} onClick={() => showSettings(!showingSettings)} color="primary" fontSize="small"/>          
				<Collapse in={showingSettings} className={classes.collapseHeader}>
        { currentTracks && currentTracks.length > 0 &&
          <div className={classes.header}>
            <Button variant="outlined" size="small" onClick={handleStatusChange} className={isTakingRequests ? classes.stopRequestButton : classes.resumeRequestButton}>
              { isTakingRequests ? 'Stop Requests' : 'Resume Requests' }
            </Button>
            <Button style={{marginLeft:'8px'}} variant="outlined" size="small" onClick={handleRemove} className={classes.stopRequestButton} disabled={selected.length === 0}>
              Remove
            </Button> 
          </div>
        }
      </Collapse>
      { !isTakingRequests && <TextWithTitle title="Not Taking Requests" text=""/> }
			<TrackList indeterminate tracks={currentTracks} selectable={showingSettings} emptyMsg="No Songs Requested" hint="Once your viewers request songs, they will show up here." onChange={handleSelect}/>
		</div>
	)   
}
