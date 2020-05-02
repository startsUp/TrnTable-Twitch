import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Error } from '../searchErrors';
import { Typography } from '@material-ui/core';
import { SpotifyService } from '../../../util/Spotify/SpotifyService';
import { TextWithTitle } from '../../Misc/TextWithTitle';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    justifyContent: 'center',
    paddingTop: theme.spacing(3) 
  },
  spotifySearch: {
    fontFamily: 'sofia_problack'
  }
}));

export function SearchInput(props) {
  const classes = useStyles();
  const { isTakingRequests } = props
  return (
    <div>
      
      { isTakingRequests ?
        <div>
          <TextWithTitle title="Request a Song" text="Find a song to be played on stream. Requested songs will be added to the current spotify playlist."/>
          <form className={classes.root} noValidate autoComplete="off" onKeyPress={(e)=>(e.key==='Enter' && props.submit(e))}>
              <TextField variant="outlined" id="spotify-search-input" label="Search..." 
              InputLabelProps={{
                classes: {root: classes.spotifySearch}
              }}/>
          </form>
        </div> :
        <TextWithTitle title="Not Taking Requests" text="The streamer has disabled requests temporarily."/>
      }
    </div>
    
  );
}


export default function SpotifySearch(props){
		const spotifyService = new SpotifyService()
    const onSearch = (e) => {
        e.preventDefault();
        const query = document.getElementById('spotify-search-input').value
        if (query === "") return
        getSearchResults(query)
    }

		const showResults = tracks => {
			props.onResult(tracks)
		}

		const showError = error => {
			props.onError(error)
		}

    const getSearchResults = (query) => {
        
        props.onLoad()
        spotifyService.search(query)
					.then(
						(tracks) => {
              if (tracks.length > 0){
                showResults(tracks)
              }
              else{
                showError(Error.NOTRACKSFOUND);
              }
						},
						// Note: it's important to handle errors here
						// instead of a catch() block so that we don't swallow
						// exceptions from actual bugs in components.
						(error) => {
							showError(Error[error.statusCode])
						}
						
					)
    }

   
    return(
        <SearchInput submit={onSearch} inputID='spotify-search-input' {...props}/>
    )
  
}
