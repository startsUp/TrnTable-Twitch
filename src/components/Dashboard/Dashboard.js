import React, { useEffect } from 'react';
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
import { TrackList } from '../Misc/trackList';
import SpotifySongRequests from '../Requests/spotifySongRequests';
import { Track } from '../../util/Spotify/Model/Track';
import { RequestType } from '../../util/Spotify/Model/Request';


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
    height: 'inherit'
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

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [tracksView, setTracksView] = React.useState(TracksView.REQUESTED);
  const [results, setResults] = React.useState([]);
	const [error, setError] = React.useState({errorMsg: ''});
	const [requests, setRequests] = React.useState([]);
	const twitch = window.Twitch ? window.Twitch.ext : null
	const auth = useAuth()
	const sessionService = new SpotifySessionService(twitch, auth.twitch.getOpaqueId())  
		
	
	// listen for requests here
	useEffect(()=>{
		sessionService.listenForSongRequests(updateTrackList)
  }, [])


	const updateTrackList = (request) => { // called when new songs added
		if(request.type === RequestType.TRACK){
			var track = request.content
			addRequest(track)
		}
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
            <SpotifySongRequests requests={requests}/>
          </TabPanel>
        </div>   
        <div className={classes.swipeView}>
          <Toolbar/>   
          <TabPanel value={value} index={1} dir={theme.direction} className={classes.scrollView}>
            <SpotifyNowPlaying/> 
          </TabPanel>
        </div>   
      </SwipeableViews>
    </div>
  );
}
