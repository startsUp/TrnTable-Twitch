import React, { useState, useEffect } from "react"
import { Typography, Box, List, Button, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { SettingComponent } from './model/Setting'
import { useSpotify } from "../../util/Spotify/spotify-context"
import SpotifyWebApi from 'spotify-web-api-js'

const PLAYLIST_OPTION = { CREATE: true, EXISTING: false}
const spotify  = new SpotifyWebApi();

export const PlaylistSelect = (props) => {
	const [option, setOption] = useState(PLAYLIST_OPTION.CREATE)
    const [token, refreshToken] = useSpotify()
    
	const { classes } = props
    const [playlists, setPlaylists] = useState([])
    const [selected, setSelected] = useState(0)

	const fetchPlaylists = (retry) => {
		spotify.getUserPlaylists()
		.then(data => {
			setPlaylists(data.items ? data.items : [])
		}, 
		err => {
			if (err.status === 401 && retry < 3){
				refreshToken().then(token => {
                    spotify.setAccessToken(token)
					fetchPlaylists(retry+1)
				})
			}
		})
    }
    
	useEffect(() =>{
        spotify.setAccessToken(token)
		fetchPlaylists(1)
    },[])
    
	const handleOptionChange = () => {
        setOption(!option)
    }

    const handleSelectionChange = e => {
        console.log(e)
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
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selected}
                onChange={e => setSelected(e.target.value)}
                >
               { 
                    playlists.map((item, index) => 
                        <MenuItem value={index+1}>
                            {item.name}
                        </MenuItem>
                    )
                }   
                </Select>
            </FormControl>
        </div>
        }
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