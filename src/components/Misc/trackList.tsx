import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography, Avatar, ListItemAvatar, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import { Track } from '../../util/Spotify/Model/Track';
import { TextWithTitle } from './TextWithTitle';

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
	paddingLeft: '8px',
	paddingTop: 0
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

export function TrackList(props: {tracks: Track[], maxSelection: number, onChange: Function, emptyMsg: string, hint: string, selectable: boolean, indeterminate? : boolean}) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
	const { tracks } = props
	
	const resetChecked = () => {
		setChecked([])
	}

    const handleToggle = value => () => {
		
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
			if(props.maxSelection && newChecked.length > props.maxSelection){
				newChecked.splice(0, 1); // delete the first element
			}
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
		if(props.onChange){
			props.onChange(newChecked, resetChecked)
		}
    };

    return( // TODO: FIX STYLING 

		<List className={classes.results}>
		{ tracks.length === 0 && props.emptyMsg && props.hint && <TextWithTitle title={props.emptyMsg} text={props.hint} />}
		{ tracks.map((track,index) => {
			const labelId = `checkbox-request-song-label-${index}`;
			return(
				<React.Fragment key={`${track.id}-${index}`}>
					<ListItem alignItems="flex-start" >
							<ListItemAvatar>
							<Avatar alt={track.album.name}/* TO DO: CHECK if right way to access album name*/
								variant="rounded" src={track.image} 
								className={classes.albumImage}
								/>
							</ListItemAvatar>
							<ListItemText
								primaryTypographyProps={{color: 'textPrimary'}}
								classes={{secondary: classes.artistName}}
								primary={track.name}
								secondary={track.artists}
								className={classes.listItem}
							/>
							<ListItemSecondaryAction>
								{props.selectable && 
									<Checkbox
										edge="end"
										color="primary"
										indeterminate={props.indeterminate}
										disabled={false}
										onChange={handleToggle(track.id)}
										checked={checked.indexOf(track.id) !== -1}
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								}
							</ListItemSecondaryAction>        
					</ListItem>
				</React.Fragment>
				
			)
			})
		}
		</List>

    )   
}
