import React, { useState } from 'react'
import LoadingCard from '../components/loader'
import { SpotifyLogin } from './spotify-login'
import { SpotifyService } from '../util/Spotify/SpotifyService'
import Authentication from '../util/Twitch/Authentication';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken'
import { ViewType } from '../util/Twitch/ViewType' 
import { Role } from './roles/roles';
const VERSION_NO = "0.0.1";

const API_URL = 'https://us-central1-trntable-twitch.cloudfunctions.net/api'
const AuthContext = React.createContext()

/**
 * Checks if token has expired or not.
 * @param {string} token Token passed by Twitch
 */
const validateToken = token => {
  if (token){
    let decoded = jwt.decode(token)
    let expiry = new Date(decoded.exp*1000)
    return new Date() < expiry
  }
  return false
  
}

/**
 * Auth Provider for auth context. This handles login/logout and fetching of user data
 * @param {Object} props 
 */
function AuthProvider(props) {
  const viewType = props.viewType
  const twitch = Twitch.ext
  const tokenUpdateCallback = props.onTokenChange

  const authToken = localStorage.getItem('token')
  const isTokenValid = validateToken(authToken) 
  
  const twitchAuth = new Authentication(isTokenValid && authToken)

  // initFetchDone - for checking if refresh token is stored, 
  // data - twitch configuration
  const [ initFetchDone, setInitFetch ] = useState(false)
  const [ data, setData ] =  useState(null)


  const getBroadcasterData = async (channelId) => {
    // fetch broadcaster data to make sure they are registered
    const token = await twitchAuth.makeCall(`${API_URL}/broadcaster/${channelId}`).then(res=>res.text())  
    
    setData(prev => { // prevent overwrites from other setData calls 
        return {...prev, spotifyTokenSaved: (token !== null || token !== undefined), role: Role.BROADCASTER}
    })
    setInitFetch(true)
  }

	React.useEffect(() => {

		twitch.onAuthorized(auth => {
			if (auth.token) {
					twitchAuth.setToken(auth.token)
					localStorage.setItem('token', auth.token)
					
					// get user data to check if it exist, only need to this in config view
					if ((viewType === ViewType.CONFIG || viewType === ViewType.LIVE_CONFIG) && twitchAuth.isModerator()) 
					getBroadcasterData(auth.channelId)
			
					// update any parent props expecting token updates
					if (tokenUpdateCallback) tokenUpdateCallback(auth.token)
			}
		})
    

        // listen for configuration changes
        twitch.configuration.onChanged(()=> {
					setData(prev => { // prevent ovewrites
							return {...prev, config: twitch.configuration.broadcaster}
					})
        })

    }, [])


  const setTwitchConfig = (config) => {
    twitch.configuration.set("broadcaster", VERSION_NO, config);
  }

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
    <AuthContext.Provider value={{ thirdPartyLogin: { spotify: spotifyAuth }, twitch: { setConfig: setTwitchConfig }, data }} {...props} />
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