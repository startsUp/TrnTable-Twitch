import React, { useState, Component } from 'react'
import { SvgIcon, Button, Typography, Paper, Avatar, Box, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	hostTitle: {
		textDecoration: 'underline',
		fontFamily: 'sofia_problack'
	},
	desc: {
		textAlign: 'justify',
		fontFamily: 'sofia_prolight',
		padding: `${theme.spacing(2)}px 0 ${theme.spacing(5)}px 0`
	},
	button: {
    	borderRadius: theme.spacing(2),
		fontFamily: 'sofia_problack',
		justifySelf: 'center',
		width: theme.spacing(15),
		marginTop: theme.spacing(1)
	},
}))


const cardDetails = () => {
	
}


export default function HostCard(props){
	const classes = useStyles()
	console.log(props)
	return(
		<Box p={3}>
			<Typography variant="h4" className={classes.hostTitle}>
				Host a Session
			</Typography>
			<Typography color="textSecondary" className={classes.desc}>
					Login to setup a TrnTable playlist. This will create a spotify playlist and let your viewers: request music and vote on currently playing music.  
			</Typography>
			<Box className={classes.login}>
				<Typography color='textPrimary'>Let's Get Started</Typography>
				<Button variant="outlined" onClick={props.handleLogin} size="small" color="primary" className={classes.button}>
					Login
				</Button>
			</Box>
		</Box>
		
	)
	
}