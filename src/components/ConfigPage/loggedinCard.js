import React, {useState, useEffect} from 'react'
import { Box, Typography, Button } from '@material-ui/core'
export default function LoggedInCard(props){
	const [resetPending, setResetPending] = useState(false)
	const { classes, settingsCallback, resetCallback } = props

    return (
			<Box p={3}>
				<Typography variant="h4" className={classes.hostTitle}>
						All Setup!
				</Typography>
				<Typography>
						You are ready to start using TrnTable. Once you start the stream, viewers will be able to vote on currently playing songs and request new ones.
				</Typography>

				<Box p={2} className={classes.resetBox}>
					<Typography>Change the current TrnTable settings</Typography>
					<Button variant="outlined" size="small" color="primary" className={classes.button} onClick={settingsCallback}>
							Settings
					</Button>
				</Box>
				<Box p={2} className={classes.resetBox}>
					<Typography>Logout to reset playlist and use a different account.</Typography>
					<Button variant="outlined" size="small" color="primary" className={classes.button}
					disabled={resetPending} 
					onClick={() => {
						setResetPending(true)
						resetCallback()
					}}>
						{ resetPending ? 'Resetting ...' : 'Reset Account' }
					</Button>
				</Box>
			</Box> 
    )
}