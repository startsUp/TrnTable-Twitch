import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Tab, Tabs, AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SpotifyNowPlaying from '../NowPlaying/components/spotifyNowPlaying';
import { Toolbar } from '@material-ui/core';
import { SpotifySessionService } from '../../util/Spotify/SpotifySessionService';
import { useAuth } from '../../auth/auth-context';
import { useSpotify } from '../../util/Spotify/spotify-context';
import { PubSubMessage, PubSubMessageType } from '../../util/Twitch/Model/PubSubMessage';
import { SettingsService } from '../ConfigPage/settings-service';
import { Role } from '../../auth/roles/roles';
import { SpotifyService } from '../../util/Spotify/SpotifyService';
import { Toast, HIDE_TOAST, ToastNotification } from '../../util/Misc/toast';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
  },
  swipeView: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  scrollView: {
    overflow: 'auto',
    height: 'inherit',
    '&::-webkit-scrollbar': {
      width: '0.2em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(255,255,255,0.01)',
      webkitBoxShadow: 'inset 0 0 6px rgba(255,255,255,0.01)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(25,20,20,.2)',
      outline: '1px solid grey'
    }
  },
  loading: {
    display: 'grid',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
    overflow:'hidden' 
  }
}));

const TracksView  = { REQUESTED: 'requests', ERROR: 'error', LOADING: 'loading'};

export default function Dashboard() {
  const classes = useStyles()
  const spotifyService = new SpotifyService()
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [, setTracksView] = useState(TracksView.REQUESTED);
  const [, setResults] = useState([]);
  const [toast, setToast] = useState(HIDE_TOAST)
	const [error, setError] = useState({errorMsg: ''});
	const [, setRequests] = useState([]);
	const twitch = window.Twitch ? window.Twitch.ext : null
	const auth = useAuth()
	const [, spotify, makeCall] = useSpotify()
  const nowPlayingRef = useRef(null)
  const [nowPlaying, setNowPlaying] = useState(null)
	const [votes, setVotes] = useState({likes: 0, dislikes: 0})
	const sessionService = new SpotifySessionService(twitch, auth.twitchAuth.getOpaqueId()) 
	const settingsService = new SettingsService() 
  const { config } = auth.data
  const [totalTracks, setTotalTracks] = useState(null)
  const [offset, setOffset] = useState(null)
  const [, setLoading] = useState(false)
  const [nowPlayingPoll, resetNowPlaying] = useState(false)

  var userSettings = settingsService.getUserSettings(config, Role.BROADCASTER)
  // listen for requests here
	useEffect(() => {
    // var stopListeningForMessages = sessionService.listenForPubSubMessages(handlePubSubMessage) 
    // fetchPlaylistTracks()
    // if(userSettings.channelTopic !== auth.twitchAuth.getOpaqueId()){ // if opaque id changed broadcast update for whispers 
    //   userSettings.channelTopic = auth.twitchAuth.getOpaqueId()
    //   auth.updateConfig(settingsService.toJSON(userSettings))
    //   sessionService.broadcastSettingsUpdate(userSettings, true)
    // }
    // return () => {
    //   stopListeningForMessages()
    // }
  }, [])
  
  useEffect(() => {
    var stopPolling = sessionService.pollApi(spotify.getMyCurrentPlayingTrack, makeCall, updateNowPlaying, nowPlayingError, 4000)
    return () => {
      stopPolling()
    }
	}, [nowPlayingPoll])

  function fetchPlaylistTracks(){
    setLoading(true)
    var p = Promise.resolve({total: totalTracks, limit: 100})
    if (totalTracks === null){
      p = sessionService.getTotalTracksForPlaylist(makeCall, spotify.getPlaylistTracks, userSettings.playlistId)
    }
    p.then(info => {
      const { total } = info
      setTotalTracks(total)
      var newOffset = offset !== null ? offset - 100  : total - 100
      if (newOffset < 0) newOffset = 0
      return sessionService.getTracksForPlaylist(makeCall, spotify.getPlaylistTracks, userSettings.playlistId, newOffset)
    })
    .then(data=>{
      setOffset(data.offset)
      setLoading(false)
      setRequests(prev => [...prev, ...spotifyService.getTrackObjects(data.items.length > 0 ? data.items.map(item =>item.track).reverse() : [])])
    })
    .catch(() => {
      setLoading(false)
      setToast(new Toast('error', 'Failed to get Playlist'))
    })
  }

  function handlePubSubMessage(pubSubMessage){
    if (pubSubMessage.type === PubSubMessageType.TRACK)
      updateTrackList(pubSubMessage.content)
    if (pubSubMessage.type === PubSubMessageType.VOTE)
      handleVote(pubSubMessage.content)
  }

	function updateNowPlaying(track){
    console.log(track)
    // closure prevents this function to get latest nowPlaying value, hence use useRef
    const currentTrack = nowPlayingRef.current
    
    if((track && currentTrack && track.id !== currentTrack.id) || (track === null || currentTrack === null))
      setVotes({likes: 0, dislikes: 0}) // reset likes and dislikes on track change       
    
      //broadcast a song change
    sessionService.sendPubSubMessage(new PubSubMessage(track, PubSubMessageType.TRACK))

    setNowPlaying(track) // update state
    nowPlayingRef.current = track // update ref
	}

  function handleVote(vote){
    // closure prevents this function to get latest nowPlaying value, hence use useRef
    const currentTrack = nowPlayingRef.current

    if(vote && currentTrack && currentTrack.id === vote.trackId){
      setVotes(prev => ({
        likes: prev.likes + vote.likeIncrement,
        dislikes: prev.dislikes + vote.dislikeIncrement
     }))
    }
  }

	const nowPlayingError = () => {
      setError({errorMsg: 'Error updating now playing'})
	}

	const updateTrackList = (tracks) => { // called when new songs added
			addRequests(tracks)
	}

	const addRequests = (tracks) => {
			setRequests(prev => [...tracks, ...prev])
	}
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };


  

  const removeTracksFromPlaylist = (trackIds) => {
    setRequests(prev => {
      let updatedRequests = prev.filter(track => trackIds.indexOf(track.id) === -1)
      return updatedRequests
    })  
  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(prev=> {return {...prev, show: false}});
  }

  
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {/* <Tab label="Requested Songs" {...a11yProps(0)} /> */}
          <Tab label="Now Playing" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
     
      <SwipeableViews 
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* <div className={classes.swipeView}>
          <Toolbar/>
          <TabPanel value={value} index={0} dir={theme.direction} className={classes.scrollView}>
            <SpotifySongRequests 
              requests={requests} 
              setRequestTakingStatus={setRequestTaking} 
              onRemove={handleRemove} 
              loadMore={fetchPlaylistTracks}
              loadMoreOption={offset !== 0 && offset !== null}
              loading={loading}
              onPlaylistReset={handlePlaylistReset}/>
          </TabPanel>
        </div>    */}
        <div className={classes.swipeView}>
          <Toolbar/>   
          <TabPanel value={value} index={0} dir={theme.direction} className={classes.scrollView}>
            <SpotifyNowPlaying nowPlaying={nowPlaying} role={auth.data.role} likes={votes.likes} dislikes={votes.dislikes}
            resetError={() => {setError({errorMsg: ''}); resetNowPlaying(!nowPlayingPoll)}}
            errored={error && error.errorMsg === 'Error updating now playing'} playlistId={userSettings.playlistId}/> 
          </TabPanel>
        </div>   
      </SwipeableViews>
      <ToastNotification toast={toast} onClose={handleClose}/> 
    </div>
  );
}
