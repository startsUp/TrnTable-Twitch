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
import { SettingsService } from './configurations'
import SettingsCard from './settingsCard'
import LoggedInCard from './loggedinCard'
import LoadingCard from '../loader'
import { useAuth } from '../../auth/auth-context';
import { ConfigStates } from './config-states'



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
		width: '450px',
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
		fontFamily: 'sofia_problack',
		justifySelf: 'center',
		width: theme.spacing(15),
		marginTop: theme.spacing(1)
    },
    loadingLogo: {
        width: '5rem'
    },
    
})); 




export default function ConfigPage() {
	const spotifyApi = new SpotifyWebApi();
	const settingsService = new SettingsService();
	const classes = useStyles();
	
	const auth = useAuth()
	const { spotifyTokenSaved, config, role } = auth.data

	var userSettings = settingsService.getUserSettings(config, role)
	console.warn(userSettings)
	const [error, setError] = useState(Error.NONE);
    
	const saveSpotifyInfo = (spotifyId, spotifyUser) => {
		localStorage.setItem('spotifyId',spotifyId);
		localStorage.setItem('spotifyUser',spotifyUser);
	}


	// const getUserInfoAndSave = () => {
	// 	return spotifyApi.getMe({}, (err, data)=>{
	// 		if(err) console.log(err);
	// 		else{
	// 			console.log(data)
	// 			setSpotifyId(data.id);
	// 			setSpotifyUser(data.display_name ? data.display_name : 'Your');
	// 			saveSpotifyInfo(data.id,data.display_name);
	// 		}
	// 	})
	// }
	const setDefaultConfiguration = () => {
		setConfig(settingsService.getJSONConfig())
	}
	

	const popupCallback = async (tokens) => {
		console.info({tokens}) 
		spotifyApi.setAccessToken(tokens.accessToken)
		// getUserInfoAndSave()
		//setTwitchConfiguration()
		setDefaultConfiguration()
	}

	var configState = ConfigStates.LOADING
	if (auth.data.hasOwnProperty('spotifyTokenSaved') && auth.data.hasOwnProperty('config')){
		if (spotifyTokenSaved){
			configState = ConfigStates.LOGGEDIN
			if (!config) configState = ConfigStates.SETTINGS 
		}
		else
			configState = ConfigStates.LOGGEDOUT
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
					{ configState === ConfigStates.LOADING && <LoadingCard/>}
					{ configState === ConfigStates.LOGGEDOUT && <Login callback={popupCallback}/> }
					{ configState === ConfigStates.SETTINGS  && error === Error.NONE && <SettingsCard classes={classes} settings={settingsService} saveConfigCallback={auth.twitch.setConfig}/>}
					{ configState === ConfigStates.LOGGEDIN && error === Error.NONE && <LoggedInCard classes={classes} />}	
				</Paper>
			</div>
		</div>
	</div>
	
  );
}
