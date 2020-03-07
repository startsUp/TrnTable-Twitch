import React, { useState, useEffect } from "react"
import { Typography, Box, List, Button, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SettingComponent } from './model/Setting'
import { useSpotify } from "../../util/Spotify/spotify-context"
import SpotifyWebApi from 'spotify-web-api-js'
import { useAuth } from "../../auth/auth-context"

const PLAYLIST_OPTION = { CREATE: true, EXISTING: false}
const spotify  = new SpotifyWebApi();
const LIMIT = 50

export const PlaylistSelect = (props) => {
    const { classes } = props
	const [option, setOption] = useState(PLAYLIST_OPTION.CREATE)
    const auth = useAuth()
    const [token, refreshToken] = useSpotify()
    const [playlists, setPlaylists] = useState([])
    const [selected, setSelected] = useState(0)

    const updateToken = token => spotify.setAccessToken(token)

	const fetchPlaylists = (limit, offset, retry, callback=null) => {
		spotify.getUserPlaylists({limit, offset})
		.then(data => {
            var playlists = data.items ? data.items : []
            if (callback) callback(playlists)
		}, 
		err => {
			if (err.status === 401 && retry < 3){
				refreshToken().then(token => {
                    updateToken(token)
					fetchPlaylists(limit, offset, retry+1, callback)
				})
			}
		}) 
    }
    
	useEffect(() =>{
        spotify.setAccessToken(token)
        fetchPlaylists(50, offset, 1, data => {
            var playlists = []  
            if (props.userSettings) { // settings were saved before                
                setSelected(data.findIndex(p => (p.id === props.userSettings.playlistId)) + 1)
                playlists = data.filter(p => p.id !== props.userSettings.extensionPlaylistId)
            }
            else{
                playlists = data
            }
            setPlaylists(playlists)
        }) 
    }, [])
    
	const handleOptionChange = () => {
        setOption(!option)
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
                onChange={e => setSelected(e.target.value)}
                >
               { 
                    playlists.map((item, index) => 
                        <MenuItem key={item.id} value={index+1}>
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