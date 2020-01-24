import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {  Button } from '@material-ui/core'; 
import Login from '../../pages/login';
import SpotifyWebApi from 'spotify-web-api-js'


const spotifyApi = new SpotifyWebApi();

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
  }
})); 



export default function ConfigPage() {
	const classes = useStyles();
	const [spotifyId, setSpotifyId] = useState(localStorage.getItem('spotifyId'));
	const [spotifyUser, setSpotifyUser] = useState(localStorage.getItem('spotifyUser'));
	
	const saveSpotifyInfo = (spotifyId, spotifyUser) => {
		localStorage.setItem('spotifyId',spotifyId);
		localStorage.setItem('spotifyUser',spotifyUser);
	}
	 
	const getUserInfoAndSave = () => {
		return spotifyApi.getMe({}, (err, data)=>{
			if(err) console.log(err);
			else{
				setSpotifyId(data.id);
				setSpotifyUser(data.display_name ? data.display_name : 'Your');
				saveSpotifyInfo(data.id,data.display_name);
			}
		})
	}

	const popupCallback = async (tokens) => {
		console.info({tokens}) 
		spotifyApi.setAccessToken(tokens.accessToken)
		getUserInfoAndSave()
	}

  return (
    <div className={classes.root}>
      <Button variant="outlined" size="small" color="primary" href="http://jukebox-2952e.firebaseapp.com/login">
        Login
			</Button>
			<Login callback={popupCallback}/>
    </div>
  );
}
