import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AddIcon from '@material-ui/icons/Add';
import SpotifySearch from '../Search/components/spotifySearch'
import SpotifySearchResults from '../Search/components/spotifySearchResults';
import SpotifyNowPlaying from '../NowPlaying/components/spotifyNowPlaying';
import { Toolbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingCard from '../loader';
import { useAuth } from '../../auth/auth-context';
import { SpotifySessionService } from '../../util/Spotify/SpotifySessionService';
import { Track } from '../../util/Spotify/Model/Track'
import Snackbar from '@material-ui/core/Snackbar';
import { UserSettings } from '../ConfigPage/model/UserSettings';
import { PubSubMessageType, PubSubMessage } from '../../util/Twitch/Model/PubSubMessage';
import { SettingsService } from '../ConfigPage/settings-service';
import { Role } from '../../auth/roles/roles';
import { VoteType, Vote } from '../../util/Spotify/Model/Vote';
import { useSpotify } from '../../util/Spotify/spotify-context';
import { Toast, HIDE_TOAST, ToastNotification } from '../../util/Misc/toast';
import { StorageService } from '../../util/Misc/storage';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
    flexDirection: 'column',
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

const TrackSearchView  = { SEARCH: 'search', RESULTS: 'results', ERROR: 'error', LOADING: 'loading'};
const SettingMap = {isTakingRequests: 'Stop taking Requests'}

export default function ViewerTab() {
  const classes = useStyles();
  const theme = useTheme();
  const twitch = window.Twitch ? window.Twitch.ext : null
  const auth = useAuth()
  const [token, spotify, makeCall] = useSpotify()
  const { config } = auth.data
  const settingsService = new SettingsService()
  const storageService = new StorageService()
  const sessionSettings = settingsService.getSessionSettings(config)
  const sessionService = new SpotifySessionService(twitch, auth.twitchAuth.getChannelId())
  const [channelTopic, setChannelTopic] = useState(sessionSettings.channelTopic)
  const [toast, setToast] = useState(HIDE_TOAST)
  const [value, setValue] = useState(0);
  const [trackSearchView, setTrackSearchView] = useState(TrackSearchView.SEARCH);
  const [results, setResults] = useState([]);
  const [error, setError] = useState({errorMsg: ''});
  const [nowPlaying, setNowPlaying] = React.useState(null)
  const nowPlayingRef = useRef(null)
  const [vote, setVote] = React.useState(VoteType.NONE)
  const [sentVote, setSentVote] = React.useState(new Vote('', 0, 0))
  const [settings, setSettings] = React.useState({
    isTakingRequests: !settingsService.getSettingValue(sessionSettings, SettingMap.isTakingRequests)
  })

  const songRequestSuccess = res => {
    setToast(new Toast('success', 'Song Requested!'))
  }

  const songRequestFail = err => {
    console.err(err)
  }
  
  const handleVote = (newVote) => { 
    var voteUpdate = null
    var likeIncrement = sentVote.likeIncrement === 1 ? -1 : 0
    var dislikeIncrement = sentVote.dislikeIncrement === 1 ? -1 : 0
    var trackId = nowPlaying ? nowPlaying.id : ''
    if (vote === newVote){ // dismiss last vote
      voteUpdate = new Vote(trackId, likeIncrement, dislikeIncrement)
      setVote(VoteType.NONE) // update ui right away
    }
    else{
      if (newVote === VoteType.LIKE)
        voteUpdate = new Vote(trackId, likeIncrement + 1, dislikeIncrement) 
      else
        voteUpdate = new Vote(trackId, likeIncrement, dislikeIncrement + 1)
      setVote(newVote);
    }
    console.warn('Vote -->', voteUpdate)
    const sentVoteCallback = () => {
      if (nowPlaying && trackId === nowPlayingRef.current.id){
        setSentVote(voteUpdate)
      }
    }
    sessionService.sendVote(voteUpdate, sentVoteCallback, () => {}) 
  }

  // listen for pubsub messages
	useEffect(() => {
		var stopListeningForBroadcasts = sessionService.listenForBroadcasts(onBroadcastRecieved)
		return () => {
			stopListeningForBroadcasts()
		}
	}, [])

	const onBroadcastRecieved = (pubsubMsg) => {
		if(pubsubMsg.type === PubSubMessageType.SETTINGS)
      handleSettingsChange(pubsubMsg.content)
    if(pubsubMsg.type === PubSubMessageType.TRACK)
      handleNowPlayingUpdate(pubsubMsg.content)
  }
	
	const handleSettingsChange = (settings) => {
		setSettings({
      isTakingRequests: !settingsService.getSettingValue(settings, SettingMap.isTakingRequests)
    })
    setChannelTopic(settings.channelTopic) 
	}
	
  const handleNowPlayingUpdate = (nowPlayingTrack) => {
    const currentTrack = nowPlayingRef.current

    setNowPlaying(nowPlayingTrack)
    if (currentTrack && nowPlayingTrack && currentTrack.id !== nowPlayingTrack.id){
      setVote(VoteType.NONE)
      setSentVote(new Vote('', 0, 0))
    }
    nowPlayingRef.current = nowPlayingTrack
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const hasNotBeenRequested = (track) => !storageService.hasSongBeenRequested(track.id, auth.twitchAuth.getChannelId())
    
  const sendSongRequest = track => {
    const MAX_REQUESTED_AMOUNT = 15
    makeCall(spotify.addTracksToPlaylist, [sessionSettings.playlistId, [`spotify:track:${track.id}`]], 
      success => {
        storageService.addRequestedSong(track.id, auth.twitchAuth.getChannelId())
        var recentlyRequested = storageService.getRequestSongsList(auth.twitchAuth.getChannelId())
        var requestedAmount = recentlyRequested.length
        if (requestedAmount >= MAX_REQUESTED_AMOUNT)
          storageService.removeRequestedSong([0]) // remove the first added song

        sessionService.sendSongRequest([track], channelTopic, songRequestSuccess, songRequestFail)
        setTrackSearchView(TrackSearchView.SEARCH)
      },
      err => {
        setToast(new Toast('error', 'Server down. Request not sent.'))
      })
  }
      
  const isUnderLimit = () => {
    var channelId = auth.twitchAuth.getChannelId()
    var lastRequestedAt = storageService.lastRequestedAt(channelId)
    var diffMs = (new Date()) - lastRequestedAt
    var diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffMins > 30) {
      storageService.setRequestedAmount(channelId, 0) // reset requested after
      return true
    } 
    return storageService.getRequestedAmount(channelId) < settingsService.getSettingValue(sessionSettings, 'Max Requests')
  }
  
  const handleRequest = id => {
    let track = results.find(track => track.id === id)
    var notRequested = hasNotBeenRequested(track)
    var underLimit = isUnderLimit()
    if(notRequested && underLimit){
      if (auth.bits.enabled){
        twitch.bits.useBits(sessionSettings.requestProductSKU)
        twitch.bits.onTransactionComplete(transaction => {
          sendSongRequest(track)
        })
        twitch.bits.onTransactionCancelled(cancelled => {
          setToast(new Toast('warning', 'Request Cancelled.'))
        })
      }
      else{
        sendSongRequest(track)
      }
    }
    else{
      if (!notRequested)
        setToast(new Toast('error', 'Song Already Requested.'))
      if (!underLimit)
        setToast(new Toast('error', 'Max song requested. Please try again in 15mins.'))
      }
  }



  const showSearch = () => {
    setTrackSearchView(TrackSearchView.SEARCH);
  }

	const showTracks = tracks => {
    setResults(tracks);
    setTrackSearchView(TrackSearchView.RESULTS);
  }
  
  const showError = error => {
    setError(error);
    setTrackSearchView(TrackSearchView.ERROR);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(prev=> {return {...prev, show: false}});
  };



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
          <Tab label="Request Songs" {...a11yProps(0)} />
          <Tab label="Now Playing" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
     
      <SwipeableViews 
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <div className={classes.swipeView}>
          <Toolbar/>
          <TabPanel value={value} index={0} dir={theme.direction} className={classes.scrollView}>
                {trackSearchView === TrackSearchView.SEARCH && 
                  <SpotifySearch playlistId={sessionSettings.playlistId} isTakingRequests={settings.isTakingRequests} onResult={showTracks} onError={showError} onLoad={() => setTrackSearchView(TrackSearchView.LOADING)}/>}
                {trackSearchView === TrackSearchView.LOADING && <div className={classes.loading}><LoadingCard /></div>}
                {trackSearchView === TrackSearchView.RESULTS && <SpotifySearchResults tracks={results} requiresBits={auth.bits.enabled} onRequest={handleRequest} onNavigateBack={showSearch} error={error}/>}
                {trackSearchView === TrackSearchView.ERROR && <SpotifySearchResults error={error} />}
          </TabPanel>
        </div>   
        <div className={classes.swipeView}>
          <Toolbar/>   
          <TabPanel value={value} index={1} dir={theme.direction} className={classes.scrollView}>
            <SpotifyNowPlaying nowPlaying={nowPlaying} role={auth.data.role} handleVote={handleVote} vote={vote} playlistId={sessionSettings.playlistId}/> 
          </TabPanel>
        </div>   
      </SwipeableViews>
      <ToastNotification toast={toast} onClose={handleClose}/> 
    </div>
  );
}
