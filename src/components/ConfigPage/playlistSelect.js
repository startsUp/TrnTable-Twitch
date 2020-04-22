import React, { useState, useEffect } from "react"
import { Typography, Box, List, Button, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SettingComponent } from './model/Setting'
import { useSpotify } from "../../util/Spotify/spotify-context"
import { SpotifyService } from "../../util/Spotify/SpotifyService"

const PLAYLIST_OPTION = { CREATE: true, EXISTING: false}
// const spotify  = new SpotifyWebApi();
const PLAYLIST_LIMIT = 50

export const PlaylistSelect = (props) => {
	const { classes } = props
	const [option, setOption] = useState(PLAYLIST_OPTION.CREATE)
	const [token, spotify, makeCall] = useSpotify()
	const [playlists, setPlaylists] = useState([])
	const [selected, setSelected] = useState(0)
	const updateToken = token => spotify.setAccessToken(token)
	const spotifyService = new SpotifyService()

	const fetchPlaylists = (limit, offset) => {
		spotifyService.getUserPlaylists(makeCall, spotify.getUserPlaylists,{limit, offset})
			.then(data => {
				var playlists = data.items ? data.items : []
				if (props.configSet) { // settings were saved before  
					if (props.userSettings.extensionPlaylistId !== props.userSettings.playlistId){
						setOption(PLAYLIST_OPTION.EXISTING)
					}
					playlists = playlists.filter(p => p.id !== props.userSettings.extensionPlaylistId)
					let selectIndex = playlists.findIndex(p => (p.id === props.userSettings.playlistId))              
					setSelected(selectIndex !== -1 ? selectIndex : 0)
				}
				setPlaylists(playlists)
			})
			.catch(err => console.log(err))
	}           
	
  
	useEffect(() =>{
		// spotify.setAccessToken(token)

		fetchPlaylists(PLAYLIST_LIMIT, 0)
		return () => {
			console.log('Unmounting Playlist select')
		} 
	}, [])
    
	const handleOptionChange = () => {
		if (playlists.length > 0){
			props.userSettings.playlistId = option === PLAYLIST_OPTION.CREATE ? playlists[selected].id : props.userSettings.extensionPlaylistId
		}
		setOption(!option)
	}
    
	const updateSelected = (e) => {
			setSelected(e.target.value)
			props.userSettings.playlistId = playlists[e.target.value].id // update user settings 
			console.log(props.userSettings)
	}

	return(
		<React.Fragment>

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
        { option === PLAYLIST_OPTION.EXISTING && 
            <div style={{textAlign: 'end'}}>
				<FormControl variant="filled" size="small" style={{width: '150px'}} >
					<InputLabel id="demo-simple-select-filled-label">Playlist</InputLabel>
					<Select
					style={{textAlign: 'start'}}
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
					value={selected}
					onChange={updateSelected}
					>
				{ 
						playlists.map((item, index) => 
							<MenuItem key={item.id} value={index}>
								{item.name}
							</MenuItem>
						)
					}   
					</Select>
				</FormControl>
        	</div>
        }
		</React.Fragment>
	)
}