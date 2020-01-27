import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core'; 
import Login from '../../pages/login';
import SpotifyWebApi from 'spotify-web-api-js'
import Error from './ConfigErrors'

const spotifyApi = new SpotifyWebApi();

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
  }
})); 



export default function ConfigPage() {
	const classes = useStyles();
	const [spotifyId, setSpotifyId] = useState(localStorage.getItem('spotifyId'));
	const [spotifyUser, setSpotifyUser] = useState(localStorage.getItem('spotifyUser'));
	const [config, setConfig] = useState(Twitch ? Twitch.ext.configuration.broadcaster : null);
	const [error, setError] = useState(Error.NONE);

	const saveSpotifyInfo = (spotifyId, spotifyUser) => {
		localStorage.setItem('spotifyId',spotifyId);
		localStorage.setItem('spotifyUser',spotifyUser);
	}
	 
	const getUserInfoAndSave = () => {
		return spotifyApi.getMe({}, (err, data)=>{
			if(err) console.log(err);
			else{
				console.log(data)
				setSpotifyId(data.id);
				setSpotifyUser(data.display_name ? data.display_name : 'Your');
				saveSpotifyInfo(data.id,data.display_name);
			}
		})
	}

	const setTwitchConfiguration = () => {
		if (Twitch){
			JSON
			Twitch.ext.configuration.set()
		}
		else {
			setError(Error.NOTSET);
		}
	}

	const popupCallback = async (tokens) => {
		console.info({tokens}) 
		spotifyApi.setAccessToken(tokens.accessToken)
		getUserInfoAndSave()
		setTwitchConfiguration()
	}

  return (
	<div className={classes.root}>
		{ !config && <Login callback={popupCallback}/> }	
	</div>
	
  );
}
