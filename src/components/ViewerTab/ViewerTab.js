import React from 'react';
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
      {value === index && <Box p={1}>{children}</Box>}
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
    overflow: 'auto'
  }
}));

const TrackSearchView  = { SEARCH: 'search', RESULTS: 'results', ERROR: 'error'};


export default function ViewerTab() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
	const [trackSearchView, setTrackSearchView] = React.useState(TrackSearchView.SEARCH);
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState({errorMsg: ''});

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    console.log(index);
    setValue(index);
  };

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
                {trackSearchView === TrackSearchView.SEARCH && <SpotifySearch onResult={showTracks} onError={showError}/>}
                {trackSearchView === TrackSearchView.RESULTS && <SpotifySearchResults tracks={results} backToSearch={showSearch} error={error}/>}
                {trackSearchView === TrackSearchView.ERROR && <SpotifySearchResults error={error}/>}
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
