import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography, Avatar, ListItemAvatar, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
  },
  results: {
    width: '100%',
    maxWidth: 360,
    paddingBottom: theme.spacing(2),
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    paddingLeft: '8px'
  },
  artistName:{
    fontSize: '0.75rem'
  },
  albumImage: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }, 
  listItem: {
    fontSize: '0.8rem'
  },
}));

const Error = (props) => (
  <Box>
    props.error.errorMsg
  </Box>
)

export default function TrackList(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const { tracks } = props
    
    const handleToggle = value => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    return( // TODO: FIX STYLING 

			<List className={classes.results}>
			{ tracks.map((track,index) => {
				const labelId = `checkbox-request-song-label-${index}`;
				return(
					<React.Fragment key={track.id}>
						<ListItem alignItems="flex-start" >
								<ListItemAvatar>
								<Avatar alt={track.album.name}/* TO DO: CHECK if right way to access album name*/
									variant="rounded" src={track.album.images[0].url} 
									className={classes.albumImage}
									/>
								</ListItemAvatar>
								<ListItemText
									primaryTypographyProps={{color: 'textPrimary'}}
									classes={{secondary: classes.artistName}}
									primary={track.name}
									secondary={track.artists.map(artist => artist.name).join(", ")}
									className={classes.listItem}
								/>
								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										disabled={false}
										onChange={handleToggle(index)}
										checked={checked.indexOf(index) !== -1}
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								</ListItemSecondaryAction>        
						</ListItem>
					</React.Fragment>
					
				)
				})
			}
			</List>

    )   
}
