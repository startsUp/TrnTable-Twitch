import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
export default function LoggedInCard(props){
    const { classes, settingsCallback, logoutCallback } = props
    return (
        <Box p={3}>
            <Typography variant="h4" className={classes.hostTitle}>
                Settings
            </Typography>
            <Typography>
                All good to go! You are ready to start using TrnTable.
            </Typography>
            <Button variant="outlined" size="small" color="primary" className={classes.button} onClick={settingsCallback}>
                Settings
            </Button>
            <Typography>
                To reset you account, you can logout. This will reset all your current session and settings.
            </Typography>
            <Button variant="outlined" size="small" color="primary" className={classes.button} onClick={logoutCallback}>
                Logout
            </Button>
        </Box> 
    )
}