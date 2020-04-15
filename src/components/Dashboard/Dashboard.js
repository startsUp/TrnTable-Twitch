import React, { useEffect, useState, useRef } from 'react';
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
import { SpotifySessionService } from '../../util/Spotify/SpotifySessionService';
import { useAuth } from '../../auth/auth-context';
import LoadingCard from '../loader';
import SpotifySongRequests from '../Requests/spotifySongRequests';
import { Track } from '../../util/Spotify/Model/Track';
import { useSpotify } from '../../util/Spotify/spotify-context';
import { PubSubMessage, PubSubMessageType } from '../../util/Twitch/Model/PubSubMessage';
import { SettingsService } from '../ConfigPage/settings-service';
import { Role } from '../../auth/roles/roles';
import { VoteType } from '../../util/Spotify/Model/Vote';
import { SpotifyService } from '../../util/Spotify/SpotifyService';
import ErrorCard from '../errorCard';


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
const MAX_SONGS_BEFORE_DELETING_OLD = 200; // after this limit has been reached, the older songs will be deleted from the request list 
const BATCH_ADD_LIMIT = 5;

export default function Dashboard() {
  const classes = useStyles()
  const spotifyService = new SpotifyService()
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [tracksView, setTracksView] = useState(TracksView.REQUESTED);
  const [results, setResults] = useState([]);
	const [error, setError] = useState({errorMsg: ''});
	const [requests, setRequests] = useState([]);
	const twitch = window.Twitch ? window.Twitch.ext : null
	const auth = useAuth()
	const [token, spotify, makeCall] = useSpotify()
  const nowPlayingRef = useRef(null)
  const [nowPlaying, setNowPlaying] = useState(null)
	const [votes, setVotes] = useState({likes: 0, dislikes: 0})
	const sessionService = new SpotifySessionService(twitch, auth.twitchAuth.getOpaqueId()) 
	const settingsService = new SettingsService() 
	const { config } = auth.data

  var userSettings = settingsService.getUserSettings(config, Role.BROADCASTER)
  // listen for requests here
	useEffect(() => {
    var stopListeningForMessages = sessionService.listenForPubSubMessages(handlePubSubMessage) 
    var stopPolling = sessionService.pollApi(spotify.getMyCurrentPlayingTrack, makeCall, updateNowPlaying, nowPlayingError, 4000)
    fetchPlaylistTracks()
    return () => {
      stopListeningForMessages()
      stopPolling()
    }
	}, [])

  function fetchPlaylistTracks(){
    makeCall(spotify.getPlaylistTracks, [userSettings.extensionPlaylistId, {fields:'items(track(album(!available_markets), name, id, artists))'}], 
      data => {
        setRequests(spotifyService.getTrackObjects(data.items.length > 0 ? data.items.map(item =>item.track) : []))
      },
      err => {
        setError(new Error('Unable to get Playlist'))
      })    
  }

  function handlePubSubMessage(pubSubMessage){
    if (pubSubMessage.type === PubSubMessageType.TRACK)
      updateTrackList(pubSubMessage.content)
    if (pubSubMessage.type === PubSubMessageType.VOTE)
      handleVote(pubSubMessage.content)
  }

	function updateNowPlaying(track){
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

	const nowPlayingError = (err) => {
			setError({errorMsg: 'Error updating now playing'})
	}

	const updateTrackList = (track) => { // called when new songs added
			addRequest(track)
	}

	const addRequest = (track) => {
			setRequests(prev => [...prev, track])
	}
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const showSearch = () => {
    setTracksView(TracksView.SEARCH);
  }

	const showTracks = tracks => {
    setResults(tracks);
    setTracksView(TracksView.RESULTS);
  }
  
  const showError = error => {
    setError(error);
    setTracksView(TracksView.ERROR);
  }

  const removeTracksFromPlaylist = (trackIds) => {
    setRequests(prev => {
      let updatedRequests = prev.filter(track => trackIds.indexOf(track.id) === -1)
      return updatedRequests
    })  
  }

  const handleRemove = trackIds => {
    var urisToRemove = []
    trackIds.forEach(id => {
      urisToRemove.push(`spotify:track:${id}`)
    })
    makeCall(spotify.removeTracksFromPlaylist, [userSettings.extensionPlaylistId, urisToRemove], success => {
      removeTracksFromPlaylist(trackIds)
    },
    err => {

    })
  }

  function setRequestTaking(willTakeRequests){
		const stop = !willTakeRequests
		var updatedUserSettings = settingsService.getUpdatedSettings(config, Role.BROADCASTER, 'Stop taking Requests', stop)
		auth.updateConfig(settingsService.toJSON(updatedUserSettings))
		sessionService.broadcastSettingsUpdate(updatedUserSettings, true)
  }
  
  if (!config){
    return(
      <div className={classes.root}>
        <ErrorCard error={new Error('Extension not Configured')} reset={false}/>
      </div>
    )
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
          <Tab label="Requested Songs" {...a11yProps(0)} />
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
            <SpotifySongRequests requests={requests} setRequestTakingStatus={setRequestTaking} onRemove={handleRemove}/>
          </TabPanel>
        </div>   
        <div className={classes.swipeView}>
          <Toolbar/>   
          <TabPanel value={value} index={1} dir={theme.direction} className={classes.scrollView}>
            <SpotifyNowPlaying nowPlaying={nowPlaying} role={auth.data.role} likes={votes.likes} dislikes={votes.dislikes}/> 
          </TabPanel>
        </div>   
      </SwipeableViews>
    </div>
  );
}
