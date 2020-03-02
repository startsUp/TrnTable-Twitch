import React, { useState } from 'react'
import LoadingCard from '../components/loader'
import { SpotifyLogin } from './spotify-login'
import { SpotifyService } from '../util/Spotify/SpotifyService'
import Authentication from '../util/Twitch/Authentication';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken'
import { ViewType } from '../util/Twitch/ViewType' 
import { Role, getRole } from './roles/roles';
import Dashboard from '../components/Dashboard/Dashboard';
import ViewerDashboard from '../ViewerDashboard';
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
  const twitch = window.Twitch ? window.Twitch.ext : null
  const tokenUpdateCallback = props.onTokenChange

  const authToken = localStorage.getItem('token')
  const isTokenValid = validateToken(authToken) 
  
  const twitchAuth = new Authentication(isTokenValid && authToken)

  // initFetchDone - for checking if refresh token is stored, 
  // data - twitch configuration
  const [ data, setData ] =  useState(null)
  const [ authorized, setAuthorized ] = useState(false)

  const getBroadcasterData = async (channelId) => {
    // fetch broadcaster data to make sure they are registered
    const token = await twitchAuth.makeCall(`${API_URL}/broadcaster/${channelId}`).then(res=>res.json())  
    console.log('token ->', token)
    const spotifyToken = token.access_token || null
    setData(prev => { // prevent overwrites from ot her setData calls 
        return {...prev, spotifyToken, role: Role.BROADCASTER}
    })
  }


	React.useEffect(() => {

		twitch.onAuthorized(auth => {
			if (auth.token) {
          setAuthorized(true)
					twitchAuth.setToken(auth.token)
					localStorage.setItem('token', auth.token)
          // twitch.listen('whisper-'+auth.userId, (e, c, t)=>{
          //   console.log(e,c,t)
          // })
					// get user data to check if it exist, only need to this in config view
					if ((viewType === ViewType.CONFIG || viewType === ViewType.LIVE_CONFIG) && twitchAuth.isModerator()){
            if (twitch.configuration.broadcaster){
              setData(prev => { // prevent ovewrites
                return {...prev, config: twitch.configuration.broadcaster}
              })
            }
					  getBroadcasterData(auth.channelId)
          } 
			
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
    if (config)
      twitch.configuration.set("broadcaster", VERSION_NO, config);
    else
      twitch.configuration.set("broadcaster", '', config);
  }

  
  

  // 🚨 If initial calls still loading show generic loading card.
  if (!authorized ||  !data || 
      // for different viewtypes, show loading card until appropriate data is available
      (viewType === ViewType.CONFIG && (!data.hasOwnProperty('spotifyToken') || !data.hasOwnProperty('config')) )
  ) {
    return <div style={{height: '100vh'}}><LoadingCard /></div>
  }

  
  const spotify = new SpotifyService()
  var r = getRole(twitchAuth.getRole())
  console.warn(r)
  if (viewType === ViewType.CONFIG){
    const spotifyLogin = () => spotify.handleLogin(() => getBroadcasterData(twitchAuth.getChannelId()))
    const spotifyAuth = { login: spotifyLogin, logout: spotify.logout }
    const reset = (onSuccess, onError) => {
      spotifyAuth.logout()
        .then(() => {
          setTwitchConfig('')
          onSuccess()
        })
        .catch(err => onError(err))
    }
    return (
      <AuthContext.Provider value={{ thirdPartyLogin: { spotify: spotifyAuth }, resetAccount: reset, twitch: { setConfig: setTwitchConfig }, data }} {...props} />
    )
  }
  else if (r === Role.BROADCASTER){ // TODO: Add Setting to allow moderators to control music
    return (
      <AuthContext.Provider value={{ twitch: twitchAuth , data }} {...props}>
        <Dashboard/>
      </AuthContext.Provider>
    )
  }
  else {
    return (
      <AuthContext.Provider value={{ twitch: twitchAuth , data }} {...props}>
        <ViewerDashboard/>
      </AuthContext.Provider>
    )
  }
}
const useAuth = () => React.useContext(AuthContext)
export {AuthProvider, useAuth}
// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:
// const useUser = () => React.useContext(UserContext)