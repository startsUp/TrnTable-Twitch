import React from 'react'

export default function SettingsCard(props){
    const { classes, settings, saveConfigCallback } = props
    return (
        <Box p={3}>
            <Typography variant="h4" className={classes.hostTitle}>
                Settings
            </Typography>
            <List>
            {settings.BroadcasterSettings.map((setting, index) => setting.getComponent(classes, index))}
            </List>
            <Button variant="outlined" size="small" color="primary" className={classes.button} onClick={saveConfigCallback}>
                Save
            </Button>
        </Box> 
    )
}