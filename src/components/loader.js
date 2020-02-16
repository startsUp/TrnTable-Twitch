import React from 'react'
import AppLogo from './logo'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.default,
        height: '100%'
    },
    card: {
        height: '15rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '5rem',
        marginBottom: '1rem'
    },
    progress: {
        height: '2px'
    }
}))
export default function LoadingCard(){
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <LinearProgress className={classes.progress}/>
            <Box p={3} className={classes.card}>
                <AppLogo appLogo={classes.logo} animate={true}/>
            </Box> 
        </div>
    )
}