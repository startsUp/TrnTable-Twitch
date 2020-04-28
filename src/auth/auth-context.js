import React, { useState } from 'react'
import LoadingCard from '../components/loader'
import { SpotifyLogin } from './SpotifyLogin'
import Authentication from '../util/Twitch/Authentication';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken'
import { ViewType } from '../util/Twitch/ViewType' 
import { Role, getRole } from './roles/roles';
import Dashboard from '../components/Dashboard/Dashboard';
import ViewerDashboard from '../ViewerDashboard';
import { SpotifyProvider } from '../util/Spotify/spotify-context';
import ErrorCard from '../components/errorCard';
import ConfigPage from "../components/ConfigPage/ConfigPage"

const VERSION_NO = "0.0.1";
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
  const twitchAuth = new Authentication()
/**
 * Auth Provider for auth context. This handles login/logout and fetching of user data
 * @param {Object} props 
 */
function AuthProvider(props) {
  const viewType = props.viewType
  const twitch = window.Twitch ? window.Twitch.ext : null

  const authToken = localStorage.getItem('token')
  const isTokenValid = validateToken(authToken) 
  
   

  // initFetchDone - for checking if refresh token is stored, 
  // data - twitch configuration
  const [ data, setData ] =  useState(null)
  const [ authorized, setAuthorized ] = useState(false)
  const [ spotifyAccountLinked, setLinked ] = useState(false)
  const [ bits, setBitsInfo ] = useState({enabled: false, products: {}}) 

  const setAuthData = () => {
    setData(prev => { // prevent ovewrites
      return {
        ...prev, 
        channelId: twitchAuth.getChannelId(),
        role: getRole(twitchAuth.getRole()),
        userId: twitchAuth.getOpaqueId()
      } 
    })
  }

	React.useEffect(() => {

		twitch.onAuthorized(auth => {
			if (auth.token) {
        setAuthorized(true)
        localStorage.setItem('token', auth.token)
        twitchAuth.setToken(auth.token)
        setAuthData() // set role, channelid and user id

          if (twitch.configuration.broadcaster){
            setData(prev => { // prevent ovewrites
              return {...prev, config: twitch.configuration.broadcaster} 
            })
            if (twitch.configuration.broadcaster.content){
              setLinked(true)
            }
          }
        
          // bits
          if (twitch.features.isBitsEnabled){
            twitch.bits.getProducts()
              .then((products) => setBitsInfo({enabled: true, products}))
              .catch(err => console.log('Unable to fetch extension products.', err))
          }
			}
		})
    
    // listen for configuration changes
    twitch.configuration.onChanged(()=> {
      setData(prev => { // prevent ovewrites
          return {...prev, config: twitch.configuration.broadcaster}
      })
      if (twitch.configuration.broadcaster && twitch.configuration.broadcaster.content){
        setLinked(true)
      }
    })

    }, [])


  const setTwitchConfig = (config) => {
    var versionNo = VERSION_NO
    if (!config){
      versionNo = '' 
    }
    twitch.configuration.set("broadcaster", versionNo, config);
    setData(prev => { // prevent ovewrites
      return {...prev, config: {content: config, segment: "broadcaster", version: versionNo}}
    })
  }

  const makeAuthorizedCall = (url, method="GET") => {
    return twitchAuth.makeCall(url, method)
  }

  // 🚨 If initial calls still loading show generic loading card.
  if (!authorized ||  !data || 
      // for different viewtypes, show loading card until appropriate data is available
      (viewType === ViewType.CONFIG && !data.hasOwnProperty('config') )
  ) {
    return <div style={{height: '100vh'}}><LoadingCard /></div>
  }

  
  const spotify = new SpotifyLogin()
  var r = getRole(twitchAuth.getRole())
  if (viewType === ViewType.CONFIG){
    const spotifyLogin = () => spotify.handleLogin(() => {
      setAuthData()
      setLinked(true)
    })
    const spotifyAuth = { login: spotifyLogin, logout: spotify.logout }
    const reset = (onSuccess, onError) => {
      spotifyAuth.logout()
        .then(() => {
          setLinked(false)
          onSuccess()
        })
        .catch(err => onError(err))
    }
    return (
      <AuthContext.Provider value={{ thirdPartyLogin: { spotify: spotifyAuth }, spotifyLinked: spotifyAccountLinked, makeAuthorizedCall: makeAuthorizedCall, resetAccount: reset, twitch: { setConfig: setTwitchConfig }, twitchAuth , data, bits }} {...props}>
        <SpotifyProvider>
          <ConfigPage />
        </SpotifyProvider>
      </AuthContext.Provider>
    )
  }
  else if (!data.config || !data.config.content){
    return(
      <div style={{height: '100vh'}}>
        <ErrorCard error={new Error('Extension not Configured')} reset={false}/>
      </div>
    )
  }
  else if (r === Role.BROADCASTER){ // TODO: Add Setting to allow moderators to control music
    return (
      <AuthContext.Provider value={{ twitchAuth, updateConfig: setTwitchConfig, spotifyLinked: true, data, makeAuthorizedCall: makeAuthorizedCall, bits }} {...props}>
          <SpotifyProvider>
            <Dashboard/>
          </SpotifyProvider>
      </AuthContext.Provider>
    )
  }
  else {
    return (
      <AuthContext.Provider value={{ twitchAuth, data, spotifyLinked: true, makeAuthorizedCall: makeAuthorizedCall, bits }} {...props}>
          <SpotifyProvider>
            <ViewerDashboard/>
          </SpotifyProvider>
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