import React, { useState } from "react"
import { Typography, Box, List, Button, Checkbox, FormControlLabel	 } from '@material-ui/core'
import { SettingComponent } from './model/Setting'
import { useSpotify } from "../../util/Spotify/spotify-context"
const PLAYLIST_OPTION = { CREATE: 0, EXISTING: 1}
export const PlaylistSelect = (props) => {
	const [option, setOption] = useState(PLAYLIST_OPTION.CREATE)
	const [spotify, token, refreshToken] = useSpotify()
	const { classes } = props
	const [playlists, setPlaylists] = useState([])

	const fetchPlaylists = (retry) => {
		spotify.getUserPlaylists()
		.then(data => {
			console.log(data)
		}, 
		err => {
			if (err.status === 401 && retry < 3){
				refreshToken().then(() => {
					fetchPlaylists(retry+1)
				})
			}
		})
	}
	useEffect(() =>{
		fetchPlaylists(1)
	},[])
	const handleOptionChange = () => {
		spotify.getPlaylist
	}

	return(
		<List>
			<SettingComponent key='playlistSelect' 
				name='Playlist' 
				details='Your requests will go into a playlist. You can either create a new or use an existing '
				{...classes}
				listItem={classes.listItemPadded} 
			>
			<div className={classes.inline}>

				<FormControlLabel
					className={classes.formControl}
					control={
						<Checkbox
							style={{padding: '3px'}}
							checked={option === PLAYLIST_OPTION.CREATE}
							onChange={handleOptionChange}
							value="checkedB"
							color="primary"
						/>
					}
					label="New"
				/>

			<FormControlLabel
			className={classes.formControl}
					control={
						<Checkbox
							style={{padding: '3px'}}
							checked={option === PLAYLIST_OPTION.EXISTING}
							onChange={handleOptionChange}
							value="checkedB"
							color="primary"
						/>
					}
					label="Existing"
				/>
			</div>

		</SettingComponent>
		</List>
			
	
		// <Box>
		// 	<Typography color="textPrimary">
		// 		Your requests will go into a playlist. You can either create a new or use an existing 
		// 	</Typography>
		// 	<Setting
		// 	<FormControlLabel
    //     control={
    //       <Checkbox
    //         checked={option === PLAYLIST_OPTION.CREATE}
		// 			onChange={() => 
		// 					setOption(option === PLAYLIST_OPTION.CREATE ? PLAYLIST_OPTION.EXISTING : PLAYLIST_OPTION.CREATE
		// 				)}
    //         value="checkedB"
    //         color="primary"
    //       />
    //     }
    //     label="Create New"
    //   />

		// <FormControlLabel
    //     control={
    //       <Checkbox
    //         checked={option === PLAYLIST_OPTION.EXISTING}
    //         onChange={() => 
		// 					setOption(option === PLAYLIST_OPTION.EXISTING ? PLAYLIST_OPTION.CREATE : PLAYLIST_OPTION.EXISTING
		// 				)}
    //         value="checkedB"
    //         color="primary"
    //       />
    //     }
    //     label="Use Existing"
    //   />
		// </Box>
	)
}
