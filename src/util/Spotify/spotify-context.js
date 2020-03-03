import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useAuth } from '../../auth/auth-context';

const API_URL = 'https://us-central1-trntable-twitch.cloudfunctions.net/api'
const SpotifyContext = React.createContext()
/**
 * Spotify Provider. This handles spotify token and api fetching.
 * @param {Object} props 
 */
function SpotifyProvider(props) {
  const auth = useAuth()
  const api  = new SpotifyWebApi();

  const refreshSpotifyToken = async (id) => {
    // fetch broadcaster data to make sure they are registered
    const token = await auth.makeAuthorizedCall(`${API_URL}/broadcaster/${id}`).then(res=>res.json())  
    console.log('token ->', token.access_token)
    const spotifyToken = token.access_token || null
    api.setAccessToken(spotifyToken)
  }

  useEffect(()=>{
    if (auth.data.channelId)
      refreshSpotifyToken(auth.data.channelId)
  }, [auth.data.channelId])

  return (
    <SpotifyContext.Provider value={[api, refreshSpotifyToken]} {...props}/>
  )
}
const useSpotify = () => React.useContext(SpotifyContext)
export {SpotifyProvider, useSpotify}
