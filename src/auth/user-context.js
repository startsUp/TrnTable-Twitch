import React from 'react'
import LoadingCard from '../components/loader'
import { SpotifyLogin } from './spotify-login'
import SpotifyService from '../util/Spotify/SpotifyService'
import { gql } from 'apollo-boost';
import Authentication from '../util/Twitch/Authentication'


const UserContext = React.createContext()

function UserProvider(props) {
	const {
		data = { spotifyUser: null, twitchUser: null }
	}

	const twitchAuth = new Authentication()
	const spotify = new SpotifyService()
	const spotifyAuth = { login: spotify.handleLogin, logout: spotify.logout }

	React.useEffect(() => {
		twitch.onAuthorized(auth => {
			console.warn(auth)
		})
	}, [])
  // code for pre-loading the user's information if we have their token in
  // localStorage goes here
  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  if (weAreStillWaitingToGetTheUserData) {
    return <LoadingCard />
  }
	
	const spotifyCallback = () => {
		
	}
  
  

  const register = () => {} // register the user
  const logout = () => {} // clear the token in localStorage and the user data
  // note, I'm not bothering to optimize this `value` with React.useMemo here
  // because this is the top-most component rendered in our app and it will very
  // rarely re-render/cause a performance problem.
  return (
    <UserContext.Provider value={{ thirdPartyLogin: { spotifyAuth } }} {...props} />
  )
}
const useUser = () => React.useContext(AuthContext)
