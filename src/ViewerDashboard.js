import React, { Component } from 'react';
import { makeStyles } from "@material-ui/styles";
import ViewerTab from './components/ViewerTab/ViewerTab';

const useStyles = makeStyles(theme => ({
	root: {
        background: '#191414',
        height: '100vh',
        width: '100vw',
        padding: '0',
        display: 'grid'
	},
}));

export default function ViewerDashboard(props){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ViewerTab/>
        </div>
    )  
}

