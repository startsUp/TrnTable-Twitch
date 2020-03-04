import React, { useState, useEffect } from 'react'

/// <reference path="../node_modules/spotify-web-api-js/src/typings/spotify-web-api.d.ts" />
import SpotifyWebApi from 'spotify-web-api-js'

import { useAuth } from '../../auth/auth-context';
import LoadingCard from '../../components/loader';

const API_URL = 'https://us-central1-trntable-twitch.cloudfunctions.net/api'
const SpotifyContext = React.createContext()
/**
 * Spotify Provider. This handles spotify token and api fetching.
 * @param {Object} props 
 */
function SpotifyProvider(props) {
  const auth = useAuth()
  const api  = new SpotifyWebApi();
  const [token, setToken] = useState(null)
  const [fetch, fetchDone] = useState(false)
  
  const refreshSpotifyToken = async (id) => {
    // fetch broadcaster data to make sure they are registered
    const token = await auth.makeAuthorizedCall(`${API_URL}/broadcaster/${id}`).then(res=>res.json())  
    console.log('token ->', token.access_token)
    const spotifyToken = token.access_token || null
    setToken(spotifyToken)
    fetchDone(true)
    api.setAccessToken(spotifyToken)
  }

  useEffect(()=>{
    if (auth.data.channelId){
      refreshSpotifyToken(auth.data.channelId)
    }
  }, [auth.data.channelId])

  if (fetch){    
    return (
      <SpotifyContext.Provider value={[api, token, refreshSpotifyToken]} {...props}/>
    )
  }
  else {
    return <div style={{height: '100vh'}}><LoadingCard /></div>
  }
}
const useSpotify = () => React.useContext(SpotifyContext)
export {SpotifyProvider, useSpotify}
