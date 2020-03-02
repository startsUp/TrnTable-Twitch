import React, { useEffect, useState } from 'react';
import '../../App.css'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Box, Paper, Typography, SvgIcon, Divider, List, Button } from '@material-ui/core'; 
import Login from './login';
import SpotifyWebApi from 'spotify-web-api-js'
import { Error } from './ConfigErrors'
import AppLogo from '../logo'
import Bg from '../../res/images/stockBG.jpeg'
import { SettingType } from './model/Setting'
import { SettingsService } from './settings-service'
import SettingsCard from './settingsCard'
import LoggedInCard from './loggedinCard'
import LoadingCard from '../loader'
import { useAuth } from '../../auth/auth-context';
import { ConfigStates } from './config-states'
import { UserSettings } from './model/UserSettings'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  	root: {
		height: '100vh',
		background: `url(${Bg}) no-repeat center center fixed`,
		backgroundSize: 'cover'
    },
	cover:{
		background: theme.palette.background.cover,
		height: '100vh',
		overflow: 'auto'
	},
	hostTitle: {
		textDecoration: 'underline',
		fontFamily: 'sofia_problack',
		background: theme.palette.background.paper,
		width: '100%',
		zIndex: '10',
		paddingBottom: theme.spacing(1),
		position: 'sticky',
		top: '0px'
	},
	grid: {
		display: 'grid',
		paddingTop: theme.spacing(10),
		gridTemplateRows: '1fr',
		justifyContent: 'center',
		minWidth: '100px',
		alignItems: 'center'
	},
	hostCard: {
		width: '500px',
		justifySelf: 'center',
		padding: theme.spacing(1),
		textAlign: 'center'
	},
	titleContainer: {
		display: 'inline-flex',
		alignItems: 'center',
	},
	title:{
		fontWeight: 'bold',
		fontFamily: 'sofia_problack'
	},
	appLogo: {
		width: '25px',
	},
	numberSetting:{
		width: '30px'
	},
	settingStyle: {
		maxWidth: theme.spacing(9),
	},
	listItem: {
		paddingRight: theme.spacing(8)
	},
	button: {
		borderRadius: theme.spacing(2),
		minWidth: theme.spacing(15),
		marginTop: theme.spacing(1),
		...theme.button
	},
	loadingLogo: {
			width: '5rem'
	},
	resetBox: {
		paddingTop: theme.spacing(5)
	}
    
})); 




export default function ConfigPage() {
	const spotifyApi = new SpotifyWebApi();
	const settingsService = new SettingsService();
	const classes = useStyles();
	
	const auth = useAuth()
	const { spotifyToken, config, role } = auth.data
	console.warn(auth.data)
	const getInitialState = () => {
		return spotifyToken ? config ? ConfigStates.LOGGEDIN : ConfigStates.SETTINGS : ConfigStates.LOGGEDOUT
	}

	var userSettings = settingsService.getUserSettings(config, role)
	var settingComponents = settingsService.getSettingComponents(userSettings)
	var [configState, setConfigState] = useState(getInitialState())
	
	const [error, setError] = useState(Error.NONE);
    
	const saveSpotifyInfo = (spotifyId, spotifyUser) => {
		localStorage.setItem('spotifyId',spotifyId);
		localStorage.setItem('spotifyUser',spotifyUser);
	}

	useEffect(()=> {
		setConfigState(getInitialState())
	}, [auth.data])

	const setDefaultConfiguration = () => {
		setConfig(settingsService.getJSONConfig())
    }
    
    const updateConfig = () => {
        // update user settings
        settingsService.updateUserSettings(userSettings, settingComponents)

        // convert to json
        var jsonSettings = settingsService.toJSON(userSettings)

        //set twitch config
		auth.twitch.setConfig(jsonSettings)
		setConfigState(ConfigStates.LOGGEDIN)
    }
	

	const popupCallback = async (tokens) => {
		console.info({tokens}) 
		// getUserInfoAndSave()
		//setTwitchConfiguration()
		setDefaultConfiguration()
	}

	const handleAccountReset = () => {
		auth.resetAccount(
			(success) => {
				setConfigState(ConfigStates.LOGGEDOUT);
			},
			(error) => {
				setError(Error.RESETFAIL)
			}
		)
	}

  return (
	<div className={classes.root}>
		<div className={classes.cover}> 
			<div className={classes.grid}>
				<Paper className={classes.hostCard}>
					<div className={classes.titleContainer}>
						<AppLogo appLogo={classes.appLogo}/> 
						<Typography variant="h5" className={classes.title} color='primary'>TrnTable</Typography>
					</div>
					<Divider/>
					{ configState === ConfigStates.LOGGEDOUT && <Login callback={popupCallback}/> }
					{ configState === ConfigStates.SETTINGS  && error === Error.NONE && <SettingsCard classes={classes} configSet={config} settings={settingComponents} saveConfigCallback={updateConfig}/>}
					{ configState === ConfigStates.LOGGEDIN && error === Error.NONE && <LoggedInCard classes={classes} 
						settingsCallback={()=> setConfigState(ConfigStates.SETTINGS)} 
						resetCallback={handleAccountReset} />
					}	
					<Snackbar open={error !== Error.NONE} autoHideDuration={3000} onClose={() => setError(Error.NONE)}>
						<Alert onClose={() => setError(Error.NONE)} severity="error">
							{error.errorMsg}
						</Alert>
					</Snackbar>
				</Paper>
			</div>
		</div>
	</div>
	
  );
}
