import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SpotifyService from '../../util/Spotify/SpotifyService';
import '../../App.css'

// const SearchInput = props => (
//     // <div className='search-container' style={props.center && {margin: '0.5em auto'}}>
//     //     <input className='search-input' autoComplete='off' onKeyPress={(e)=>(e.key==='Enter' && props.submit())} id={props.inputID} placeholder='Search... '/>
//     //     <div className='search-button' onClick={props.submit}>Search</div>
//     // </div>
    
// )

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
   
    //   width: 200,
    
        padding: theme.spacing(1)
    },
  },
}));

export function SearchInput(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off" onKeyPress={(e)=>(e.key==='Enter' && props.submit(e))}>
      <TextField id="spotify-search-input" label="Search For Song" />
    </form>
  );
}


class SpotifySearch extends Component {
    onSearch = (e) => {
        e.preventDefault();
        const query = document.getElementById('spotify-search-input').value
        if (query === "") return
        this.getSearchResults(query)
    }

		showResults = tracks => {
			props.onResult(tracks)
		}

		showError = error => {
			props.onError(error)
		}

    getSearchResults = (query) => {
        const spotifyApi = new SpotifyService();

        spotifyApi.search(query)
					.then(
						(result) => {
							console.log(result)
						},
						// Note: it's important to handle errors here
						// instead of a catch() block so that we don't swallow
						// exceptions from actual bugs in components.
						(error) => {
							console.log(error)
						}
						
					)
        // const {apiRef, songsOnly } = this.props

        // var searchType = ['track', 'album', 'playlist', 'artist']
        // if (songsOnly)
        //     searchType = ['track']
        // apiRef.search(query, searchType)
        //            .then((res)=> {
        //                 document.getElementById('spotify-search-input').value = ""
        //                 this.props.onSearchResults(query, res)
        //             })
        //             .catch(err => {
        //                 if(err.status === 401){
        //                     this.props.updateToken()
        //                         .then(this.getSearchResults(query))
        //                 }
        //             })

        console.log(query);
    }

    render(){
        
        return(
            <SearchInput submit={this.onSearch} inputID='spotify-search-input' {...this.props}/>
        )
    }
}

export default SpotifySearch
