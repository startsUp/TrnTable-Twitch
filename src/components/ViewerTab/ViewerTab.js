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
import SpotifySearch from '../Search/spotifySearch'

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
      {value === index && <Box p={3}>{children}</Box>}
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
    height: '100%'
  }
}));

const TrackSearchView  = { SEARCH: 'search', RESULTS: 'results', ERROR: 'error'};

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
	const [trackSearchView, setTrackSearchView] = React.useState(TrackSearchView.SEARCH);
	const [results, setResults] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

	const showTracks = tracks => {
		setTrackSearchView(TrackSearchView.RESULTS);
		setResults()
	}
  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Request" {...a11yProps(0)} />
          <Tab label="Now Playing" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <SwipeableViews 
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <Box height="100%">
							{trackSearchView === TrackSearchView.SEARCH && <SpotifySearch onResult={showTracks} onError={showError}/>}
							{trackSearchView === TrackSearchView.RESULTS && <SpotifySearch/>}
							{trackSearchView === TrackSearchView.ERROR && <SpotifySearch/>}
                
            </Box>
        </TabPanel>
        <TabPanel className={classes.swipeView} value={value} index={1} dir={theme.direction}>
          Now Playing <AudiotrackIcon/>
        </TabPanel>
   
      </SwipeableViews>
    </div>
  );
}
