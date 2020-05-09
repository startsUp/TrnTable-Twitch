import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';
import { Avatar, Paper } from '@material-ui/core';
import { getThemeProps } from '@material-ui/styles';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Role } from '../../../auth/roles/roles';
import { TextWithTitle } from '../../Misc/TextWithTitle';
import { VoteType, Vote } from '../../../util/Spotify/Model/Vote';
import { SpotifySessionService } from '../../../util/Spotify/SpotifySessionService';
import { readableNumber } from '../../../util/Misc/readable'
import { ContextLink } from '../../Misc/ContextLink';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems: 'center',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    gridGap: theme.spacing(2),
    maxHeight: '500px',

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
  },
  voting: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%'
  },
  like: {
    display: 'flex',
    paddingLeft: theme.spacing(3),
    justifySelf: 'start'
  },
  dislike: {
    display: 'flex',
    paddingRight: theme.spacing(3),
    justifySelf: 'end'
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
    fontFamily: 'sofia_problack',
    padding: `0 8px`
  },
  button: theme.button,
  warning: {
    marginTop: theme.spacing(4),
    color: theme.palette.warning.light,
    textAlign: 'center'
  }
}));

// const Votes = props => {
//   const {classes, vote, handleVote, likes, dislikes} = props
// 	return(
// 		<Box className={classes.voting}>
// 			<div className={classes.dislike}>
//         { dislikes ? <Typography className={classes.voteCount} variant="body2" color="primary">{readableNumber(dislikes)}</Typography> : <div></div> }
// 				<ThumbDownRoundedIcon className={vote === VoteType.DISLIKE ? classes.selectedVote : classes.vote} onClick={handleVote ? () => handleVote(VoteType.DISLIKE) : null}/>
// 			</div>
// 			<div className={classes.like}>
// 				<ThumbUpRoundedIcon className={vote === VoteType.LIKE ? classes.selectedVote : classes.vote} onClick={handleVote ? () => handleVote(VoteType.LIKE): null}/>
// 				{ likes ? <Typography className={classes.voteCount} variant="body2" color="primary">{readableNumber(likes)}</Typography> : <div></div>}
// 			</div>
// 		</Box>
// 	)
	
// }
const NowPlaying = props => {
	const {classes, track} = props
	return(
		<div className={classes.nowPlaying}>
      <Box boxShadow={3} style={{marginTop: '24px'}}>
        <Avatar alt={track.album.name}
          variant="rounded" src={track.album.images[0].url} 
          className={classes.albumImage}
        />
      </Box>
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
const getEmptyMsg = (role)=> {
    return `No songs being played right now. When ${role === Role.BROADCASTER ? 'you play' : 'the streamer plays'} a song from spotify it will appear here.`
}
export default function SpotifyNowPlaying(props) {
    const classes = useStyles();
    const role = props.role ? props.role : Role.VIEWER
    const { playlistId, nowPlaying, errored, resetError } = props

    const isExtensionPlaylistBeingPlayed = () => {
      if (nowPlaying && nowPlaying.context && nowPlaying.context.type==="playlist"){
        return playlistId === nowPlaying.context.uri.split('playlist:')[1]
      }
      return false
    }

    return(
        <div className={classes.root}>
          {/* <Refresh iconStyle={classes.icon} onClick={() => console.log('reresh')}/> */}
          { !nowPlaying && !errored && <TextWithTitle title='Not Available' text={getEmptyMsg(role)}/>}
          { !nowPlaying && errored && 
            <React.Fragment>
              <TextWithTitle title='Error' text="Unable to get currently playing track. Please refresh."/>}
              <Button variant="outlined" onClick={resetError} size="small" color="primary" className={classes.button}>
                Refresh
              </Button>
            </React.Fragment>
          }
          { nowPlaying && <NowPlaying classes={classes} track={nowPlaying}/> }
          { nowPlaying &&
          <React.Fragment>
            {!isExtensionPlaylistBeingPlayed() && <Typography variant="body2" className={classes.warning}>Extension playlist not being played right now!</Typography>}
            { nowPlaying.context && <ContextLink text="Find on Spotify:" 
              link={{url: nowPlaying.context.external_urls.spotify, text: nowPlaying.context.type}}
              title=''/>}
          </React.Fragment>
          }
        </div> 
    )
    
}


