import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
export default function LoggedInCard(props){
    const { classes, settingsCallback, logoutCallback } = props
    return (
        <Box p={3}>
            <Typography variant="h4" className={classes.hostTitle}>
                All Setup!
            </Typography>
            <Typography>
                You are ready to start using TrnTable. Once you start the stream, viewers will be able to vote on currently playing songs and request new ones.
            </Typography>
            <Button variant="outlined" size="small" color="primary" className={classes.button} onClick={settingsCallback}>
                Settings
            </Button>
            <Button variant="outlined" size="small" color="primary" className={classes.button} onClick={logoutCallback}>
                Logout
            </Button>
        </Box> 
    )
}