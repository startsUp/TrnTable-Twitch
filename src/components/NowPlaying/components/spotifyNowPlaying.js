import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { getThemeProps } from '@material-ui/styles';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Role } from '../../../auth/roles/roles';
import { TextWithTitle } from '../../Misc/TextWithTitle';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems: 'center',
    paddingTop: theme.spacing(1),
    gridGap: theme.spacing(2),
    maxHeight: '500px'
	},
	nowPlaying: {
		display: 'contents', 
		textAlign: 'center'
	},
  icon: {
		cursor: 'pointer',
	},
  albumImage: {
    width: theme.spacing(10),
		height: theme.spacing(10),
		marginTop: theme.spacing(3)
  },
  voting: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'center',
    width: '100%'
  },
  like: {
    paddingLeft: theme.spacing(3)
  },
  dislike: {
    paddingRight: theme.spacing(3)
  },
  vote: {
    fill: 'none',
    stroke: theme.palette.primary.main,
    cursor: 'pointer'
  },
  selectedVote: {
    fill: theme.palette.primary.main
  },
  voteCount: {
    fontFamily: 'sofia_problack'
  }
}));

const Votes = props => {
	const {classes, vote, handleVote} = props
	return(
		<Box className={classes.voting}>
			<div className={classes.dislike}>
				<ThumbDownRoundedIcon className={vote === Vote.DISLIKE ? classes.selectedVote : classes.vote} onClick={() => handleVote(Vote.DISLIKE)}/>
				{/* <Typography className={classes.voteCount} variant="body2" color={vote === Vote.DISLIKE ? 'primary' : 'secondary'}>3.3k</Typography> */}
			</div>
			<div className={classes.like}>
				<ThumbUpRoundedIcon className={vote === Vote.LIKE ? classes.selectedVote : classes.vote} onClick={() => handleVote(Vote.LIKE)}/>
				{/* <Typography className={classes.voteCount} variant="body2" color={vote === Vote.LIKE ? 'primary' : 'secondary'}>3.3k</Typography> */}
			</div>
		</Box>
	)
	
}
const NowPlaying = props => {
	const {classes, track} = props
	return(
		<div className={classes.nowPlaying}>
			<Avatar alt={track.album.name}
				variant="rounded" src={track.album.images[0].url} 
				className={classes.albumImage}
			/>
			<div>
				<Typography variant="h6" color='textPrimary' align='center'>{track.name}</Typography>
				<Typography variant="body2" color='textSecondary' align='center'>{track.artists}</Typography>
			</div>
		</div>
	)
}
const Refresh = props => (
	<RefreshIcon className={props.iconStyle} color='primary' onClick={props.onClick}/>
)
const Vote = { NONE: 1, LIKE: 2, DISLIKE: 3}
const NO_SONG_PLAYING_MSG = 'No songs being played right now. When you play a song from spotify it will appear here.'

export default function SpotifyNowPlaying(props) {
    const classes = useStyles();
    const [vote, setVote] = React.useState(Vote.NONE);
    console.log(props)
    const handleVote = (newVote) => { 
			if (props.role !== Role.BROADCASTER){ // disabled if role === Broadcaster
				if (vote === newVote)
					setVote(Vote.NONE)
				else
					setVote(newVote);
			}
    }


    return(
        <div className={classes.root}>
            {/* <Refresh iconStyle={classes.icon} onClick={() => console.log('reresh')}/> */}
            { !props.nowPlaying && <TextWithTitle title='Not Available' text={NO_SONG_PLAYING_MSG}/>}
            { props.nowPlaying && <NowPlaying classes={classes} track={props.nowPlaying}/> }
            { props.nowPlaying && props.role &&
                <Votes classes={classes} vote={vote} handleVote={handleVote}/>
            }
        </div> 
    )
    
}


