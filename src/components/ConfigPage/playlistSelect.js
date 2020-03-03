import React, { useState } from "react"

const PLAYLIST_OPTION = { CREATE: 0, EXISTING: 1}
export const PlaylistSelect = (props) => {
	const [option, setOption] = useState(PLAYLIST_OPTION.CREATE)
	
	

	return(
		<Box>
			<Typography color="textPrimary">
					Your requests will go into a playlist. You can either create a new or use an existing 
			</Typography>

		</Box>
	)
}
