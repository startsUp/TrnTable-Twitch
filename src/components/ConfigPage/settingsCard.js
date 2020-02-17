import React from 'react'
import { Typography, Box, List, Button } from '@material-ui/core'
export default function SettingsCard(props){
    const { classes, settings, saveConfigCallback } = props
    return (
        <Box p={3}>
            <Typography variant="h4" className={classes.hostTitle}>
                Settings
            </Typography>
            <List>
            {settings.map((setting, index) => setting.getComponent(classes, index))}
            </List>
            <Button variant="outlined" size="small" color="primary" className={classes.button} onClick={saveConfigCallback}>
                Save
            </Button>
        </Box> 
    )
}