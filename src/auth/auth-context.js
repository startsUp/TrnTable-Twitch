import React, { useState } from 'react'
import LoadingCard from '../components/loader'
import { SpotifyLogin } from './spotify-login'
import { SpotifyService } from '../util/Spotify/SpotifyService'
import Authentication from '../util/Twitch/Authentication';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken'

const GET_SESSION = gql`
query GetSession($channelId: String){
  extension_session(where: {session_id: {_eq: $channelId}}) {
    active
    broadcaster_id
    created_at
    session_id
    spotify_token
    updated_at
    settings
  }
}`

const AuthContext = React.createContext()
const validateToken = token => {
  if (token){
    let decoded = jwt.decode(token)
    let expiry = new Date(decoded.exp*1000)
    return new Date() < expiry
  }
  return false
  
}
function AuthProvider(props) {
	const tokenUpdateCallback = props.onTokenChange
  const twitch = Twitch.ext
  const authToken = localStorage.getItem('token')
  const isTokenValid = validateToken(authToken) 
	const twitchAuth = new Authentication()
  // const [ getSession, {loading, data} ] = useLazyQuery(GET_SESSION)
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] =  useState(null)
  const [ fetchDone, setFetchStatus ] = useState(false)

  const fetchInfo = ()=> {
    if (twitchAuth.isModerator()){
      setFetchStatus(true)
      fetchSession(twitchAuth.getUserId())
    }
  }
	React.useEffect(() => {
    if (isTokenValid) twitchAuth.setToken(authToken)
    // fetchInfo()

		twitch.onAuthorized(auth => {
			if (auth.token) {
        console.warn(twitch.configuration.broadcaster)
        twitchAuth.setToken(auth.token)
        // fetchInfo()
        if (tokenUpdateCallback) tokenUpdateCallback(auth.token)
			}
    })
    console.log(twitch)
    if (twitch.configuration) console.warn('exists')
    twitch.configuration.onChanged(()=> {
      setLoading(false)
      console.warn('CONFIG RECIEVED ->', twitch.configuration.broadcaster)
      setData(twitch.configuration.broadcaster)
    })
  }, [])
  
  const onSessionInfo = data => {
    console.log(data)
  }

  const fetchSession = channelId => {
    getSession({ variables: { channelId: 'test' }})
  }

  // code for pre-loading the user's information if we have their token in
  // localStorage goes here
  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  if (loading && !data) {
    return <div style={{height: '100vh'}}><LoadingCard /></div>
  }
	
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
    <AuthContext.Provider value={{ thirdPartyLogin: { spotify: spotifyAuth }, data }} {...props} />
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