import React from 'react'
import { Typography, Box, List, Button } from '@material-ui/core'
import { PlaylistSelect } from './playlistSelect'


export default function SettingsCard(props){
    const { classes, settings, saveConfigCallback, configSet } = props
    const initialSkipList = ['Stop taking Requests']
    return (
		<Box p={3}>
			<Typography variant="h4" className={classes.hostTitle}>
				Settings
			</Typography>
			<PlaylistSelect {...props}/>
			<List>
				{settings.map((setting, index) => {
                    if(!configSet && initialSkipList.includes(setting.name))
                        return <div></div>
                    else
                        return setting.getComponent(classes, index)
                   })
                }
			</List>
			<Button variant="outlined" size="small" color="primary" className={classes.button} onClick={saveConfigCallback}>
				Save
			</Button>
		</Box> 
    )
}