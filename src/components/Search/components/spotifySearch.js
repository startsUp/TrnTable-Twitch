import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { SpotifyService } from '../../../util/Spotify/SpotifyService'
import Error from '../searchErrors';
import { Typography } from '@material-ui/core';

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

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off" onKeyPress={(e)=>(e.key==='Enter' && props.submit(e))}>
            <TextField id="spotify-search-input" label="Search For Song" 
            InputLabelProps={{
              classes: {root: classes.spotifySearch}
            }}/>
      </form>
    </div>
    
  );
}


export default function SpotifySearch(props){
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
        const spotifyApi = new SpotifyService();
        props.onLoad()
        spotifyApi.search(query)
					.then(
						(result) => {
              const tracks = result.body.tracks;
              if (tracks.items.length > 0){
                showResults(tracks.items)
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
