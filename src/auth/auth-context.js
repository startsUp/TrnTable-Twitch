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
const API_URL = 'https://us-central1-trntable-twitch.cloudfunctions.net/api'
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
  const twitch = Twitch.ext
  const tokenUpdateCallback = props.onTokenChange

  const authToken = localStorage.getItem('token')
  const isTokenValid = validateToken(authToken) 
  
  const twitchAuth = new Authentication(authToken || null)

  // initFetchDone - for checking if refresh token is stored, 
  // data - twitch configuration
  const [ initFetchDone, setInitFetch ] = useState(false)
  const [ data, setData ] =  useState(null)


  const getBroadcasterData = async (channelId) => {
    // fetch broadcaster data to make sure they are registered
    const res = await twitchAuth.makeCall(`${API_URL}/broadcaster/${channelId}`)
    // setData()
    setInitFetch(true)
    return console.log(res);
  }

	React.useEffect(() => {
    if (isTokenValid) twitchAuth.setToken(authToken)

		twitch.onAuthorized(auth => {
			if (auth.token) {
        twitchAuth.setToken(auth.token)
        
        // get user data to check if it exist
        getBroadcasterData(auth.channelId)

        // update any parent props expecting token updates
        if (tokenUpdateCallback) tokenUpdateCallback(auth.token)
			}
    })
    

    // listen for configuration changes
    twitch.configuration.onChanged(()=> {
      setData(twitch.configuration.broadcaster)
    })
  }, [])


  // 🚨 If initial calls still loading show generic loading card.
  if (!initFetchDone && !data) {
    return <div style={{height: '100vh'}}><LoadingCard /></div>
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