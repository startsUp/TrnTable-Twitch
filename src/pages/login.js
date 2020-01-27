import React, { useState, Component } from 'react'
import '../App.css'
import { SvgIcon, Button, Typography, Paper } from '@material-ui/core';
import ConfirmActionPopup from '../components/confirmPopup'
import {ReactComponent as InfoLogo} from '../res/images/round-info.svg'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Bg from '../res/images/stockBG.jpeg'
import HostCard from '../components/ConfigPage/hostCard'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
		background: `url(${Bg}) no-repeat center center fixed`,
		backgroundSize: 'cover'
	},
	cover:{
		background: theme.palette.background.cover,
		height: '100vh',
	},
  grid: {
		height: '100%',
		display: 'grid',
		paddingTop: theme.spacing(10),
		gridTemplateRows: '0.5fr 1fr',
		justifyContent: 'center',
		minWidth: '100px',
		alignItems: 'center'
	}
}));

export default function Login(props){
	const classes = useStyles();	
	const handleLogin = () => {
			popupCenter('https://jukebox-2952e.firebaseapp.com/login', 'Spotify Auth', 350, 550);
	}

	const popupCenter = (url, title, w, h) => {
			// Fixes dual-screen position                         Most browsers      Firefox
			var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
			var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
	
			var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
			var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
	
			var systemZoom = width / window.screen.availWidth;
			var left = (width - w) / 2 / systemZoom + dualScreenLeft
			var top = (height - h) / 2 / systemZoom + dualScreenTop
			var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
			
			// Puts focus on the newWindow
		//  if (window.focus) newWindow.focus();
		window.addEventListener('message', event => {
			// IMPORTANT: check the origin of the data! 
			if (event.origin.startsWith('https://trntable.live')) { 
					// The data was sent from your site.
					// Data sent with postMessage is stored in event.data:
					newWindow.close()
					props.callback(event.data)
			} else {
					// The data was NOT sent from your site! 
					// Be careful! Do not use it. This else branch is
					// here just for clarity, you usually shouldn't need it.
					return; 
			} 
		}); 
	}

	return (
		<div className={classes.root}>
			<div className={classes.cover}> 
				<div className={classes.grid}>
					<HostCard handleLogin={handleLogin} {...props}/>
				</div>
			</div>
		</div> 
	)
}
