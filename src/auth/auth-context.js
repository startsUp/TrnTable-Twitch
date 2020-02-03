import React from 'react'
import LoadingCard from '../components/loader'
import { SpotifyLogin } from './spotify-login'
import { SpotifyService } from '../util/Spotify/SpotifyService'
import Authentication from '../util/Twitch/Authentication';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USER = gql`{
  extension_session(where: {session_id: {_eq: "1"}}) {
    active
    broadcaster_id
    created_at
    session_id
    settings
    updated_at
  }
}`

const AuthContext = React.createContext()

function AuthProvider(props) {
	const tokenUpdateCallback = props.onTokenChange
	const twitch = Twitch.ext
	const twitchAuth = new Authentication()
	const getUser = useQuery(GET_USER)

	React.useEffect(() => {
		twitch.onAuthorized(auth => {
			if (auth.token) {
				twitchAuth.setToken(auth.token)
				if (tokenUpdateCallback) tokenUpdateCallback(auth.token)
			}
		})
	}, [])
  // code for pre-loading the user's information if we have their token in
  // localStorage goes here
  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  // if (weAreStillWaitingToGetTheUserData) {
  //   return <LoadingCard />
  // }
	
	const spotifyCallback = () => {

	}

  const spotify = new SpotifyService()
  const spotifyAuth = { login: spotify.handleLogin, logout: spotify.logout }

  const register = () => {} // register the user
  const logout = () => {} // clear the token in localStorage and the user data
  // note, I'm not bothering to optimize this `value` with React.useMemo here
  // because this is the top-most component rendered in our app and it will very
  // rarely re-render/cause a performance problem.
  return (
    <AuthContext.Provider value={{ thirdPartyLogin: { spotifyAuth } }} {...props} />
  )
}
const useAuth = () => React.useContext(AuthContext)
export {AuthProvider, useAuth}
// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:
// const useUser = () => React.useContext(UserContext)