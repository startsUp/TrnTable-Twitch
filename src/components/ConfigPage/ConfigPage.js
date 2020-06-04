import React, { useEffect, useState } from 'react';
import '../../App.css'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Divider } from '@material-ui/core'; 
import Login from './login';
import SpotifyWebApi from 'spotify-web-api-js'
import { Error } from './ConfigErrors'
import AppLogo from '../logo'
import Bg from '../../res/images/stockBG.jpeg'
import { SettingsService } from './settings-service'
import LoggedInCard from './loggedinCard'
import { useAuth } from '../../auth/auth-context';
import { ConfigStates } from './config-states'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSpotify } from '../../util/Spotify/spotify-context';
import { SpotifySessionService } from '../../util/Spotify/SpotifySessionService';

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
	inline: {
		display: 'inline-grid'
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
        textAlign: 'center',
        marginBottom: theme.spacing(5)
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
	formControl: {
		marginRight: '0'
	},
	settingStyle: {
		maxWidth: theme.spacing(9),
	},
	listItem: {
		paddingRight: theme.spacing(8)
	},
	listItemPadded: {
		paddingRight: theme.spacing(12)
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



const spotifyApi = new SpotifyWebApi();

export default function ConfigPage() {
	
	const twitch = window.Twitch ? window.Twitch.ext : null 
	const auth = useAuth()
    const settingsService = new SettingsService();
	const sessionService = new SpotifySessionService(twitch, auth.twitchAuth.getOpaqueId())
	const classes = useStyles();
	
	const [spotifyToken, api, makeCall] = useSpotify()

	const { config, role } = auth.data

	const getInitialState = () => {
		return spotifyToken && config ? ConfigStates.LOGGEDIN : ConfigStates.LOGGEDOUT
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
	}, [auth.data,spotifyToken])

	const setDefaultConfiguration = () => {
		setConfig(settingsService.getJSONConfig())
	}
    
    const updateConfig = async () => {
        // update user settings
        settingsService.updateUserSettings(userSettings, settingComponents)
				userSettings.channelTopic = auth.twitchAuth.getOpaqueId()
        // convert to json
        

        // create trntable playlist if it doesn't exist
        // if (!userSettings.extensionPlaylistId){
        //     makeCall(api.getMe, [], 
        //         data => {
        //             makeCall(api.createPlaylist, [data.id, {name: 'Twitch Song Requests'}], 
        //                 (playlist) => {
        //                     // set twitch config
        //                     console.log('playlist created', playlist)
				// 			userSettings.extensionPlaylistId = playlist.id
        //                     if (!userSettings.playlistId)
        //                         userSettings.playlistId = playlist.id
        //                     // get json string and set config
        //                     var jsonSettings = settingsService.toJSON(userSettings)
        //                     auth.twitch.setConfig(jsonSettings)
        //                     sessionService.broadcastSettingsUpdate(userSettings, true)
        //                     setConfigState(ConfigStates.LOGGEDIN)
        //                 },
        //                 (err) => {
                            
        //                 })
        //         },
        //         err => {
        //             console.error(err)
        //         }
        //     )
        // }
        // else { 
            var jsonSettings = settingsService.toJSON(userSettings)
            auth.twitch.setConfig(jsonSettings)
            // sessionService.broadcastSettingsUpdate(userSettings, true)
            setConfigState(ConfigStates.LOGGEDIN)
        // }
        
        
    }

	
	const popupCallback = async (tokens) => {
		console.info({tokens}) 
		// getUserInfoAndSave()
		//setTwitchConfiguration()
		setDefaultConfiguration()
	}

	const handleAccountReset = () => {
		// sessionService.removePlaylist(makeCall, api.unfollowPlaylist, userSettings.playlistId)
		// 	.catch(() => {})

		auth.resetAccount(
			(success) => {
				auth.twitch.setConfig('')
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
					{/* { configState === ConfigStates.SETTINGS  && error === Error.NONE && 
						<SettingsCard 
							classes={classes} 
							userSettings={userSettings} 
							configSet={config} 
							settings={settingComponents} 
							saveConfigCallback={updateConfig}
							bits={auth.bits}/>
					} */}
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
