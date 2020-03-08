import React, { useState, useEffect } from "react"
import { Typography, Box, List, Button, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SettingComponent } from './model/Setting'
import { useSpotify } from "../../util/Spotify/spotify-context"
import { useAuth } from "../../auth/auth-context"

const PLAYLIST_OPTION = { CREATE: true, EXISTING: false}
// const spotify  = new SpotifyWebApi();
const PLAYLIST_LIMIT = 50

export const PlaylistSelect = (props) => {
	const { classes } = props
	const [option, setOption] = useState(PLAYLIST_OPTION.CREATE)
	const auth = useAuth()
	const [token, spotify, makeCall] = useSpotify()
	const [playlists, setPlaylists] = useState([])
	const [selected, setSelected] = useState(0)

	const updateToken = token => spotify.setAccessToken(token)

	const fetchPlaylists = (limit, offset, callback) => {
		makeCall(spotify.getUserPlaylists, [{limit, offset}], 
			(data) =>{
				var playlists = data.items ? data.items : []
				callback(playlists)
			},
			err => {
				console.log(err)
			})
	}           
	
  
	useEffect(() =>{
		// spotify.setAccessToken(token)
		fetchPlaylists(PLAYLIST_LIMIT, 0, data => {
				var playlists = []  
				if (props.configSet) { // settings were saved before                
						setSelected(data.findIndex(p => (p.id === props.userSettings.playlistId)))
						playlists = data.filter(p => p.id !== props.userSettings.extensionPlaylistId)
				}
				else{
						playlists = data
				}
				setPlaylists(playlists)
		}) 
	}, [])
    
	const handleOptionChange = () => {
			props.userSettings.playlistId = option === PLAYLIST_OPTION.CREATE ? playlists[selected].id : null
			setOption(!option)
			console.log(props.userSettings)
	}
    
	const updateSelected = (e) => {
			setSelected(e.target.value)
			props.userSettings.playlistId = playlists[e.target.value].id // update user settings 
			console.log(props.userSettings)
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
		</List>
	)
}