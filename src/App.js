import React, { Component } from 'react';
import { makeStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { width } from '@material-ui/system';
import ViewerTab from './components/ViewerTab/ViewerTab';

const useStyles = makeStyles(theme => ({
	root: {
        background: '#191414',
        height: '100vh',
        padding: '10px'
	},
    title: {
		fontFamily: '"Playfair Display", serif',    
	},
	box: {
		maxHeight: '100%',
        overflow: 'auto',
        background: theme.palette.background.default
    },
    icons: {
        paddingTop: '0.3em',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '10px',
        width: '100px'
    },
	titleContainer: {
		padding: '5em 0 5em 0'
	},
	image: {
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center"
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
		},
	link: {
		margin: 'auto'
	}
    }));


function Title(){
    const classes = useStyles();
    return(
        <Box className={classes.titleContainer}>
            <div className="title-bar">
                <div id="name-div">
                    <Typography variant="h3" color="primary" className={classes.title}>Shardool Patel</Typography>
                
                </div>
        
            </div>
            	
        </Box>
    )

}
export default function ViewerDashboard(props){
    const classes = useStyles();
  
    return (
     
        <Container className={classes.root}>
            <ViewerTab/>
        </Container>
        
			
      
    )
  
}

