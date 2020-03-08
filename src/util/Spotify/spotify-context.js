import React, { useState, useEffect } from 'react'

/// <reference path="../node_modules/spotify-web-api-js/src/typings/spotify-web-api.d.ts" />
import SpotifyWebApi from 'spotify-web-api-js'

import { useAuth } from '../../auth/auth-context';
import LoadingCard from '../../components/loader';

const API_URL = 'https://us-central1-trntable-twitch.cloudfunctions.net/api'
const SpotifyContext = React.createContext()
const api  = new SpotifyWebApi();
/**
 * Spotify Provider. This handles spotify token and api fetching.
 * @param {Object} props 
 */
function SpotifyProvider(props) {
  const auth = useAuth()
  
  const [token, setToken] = useState(null)
  const [fetch, fetchDone] = useState(false)
  
  const updateToken = (token) => {
    api.setAccessToken(token)
    setToken(token)
  }

  const refreshSpotifyToken = async (id=auth.data.channelId) => {
    // fetch broadcaster data to make sure they are registered
    const token = await auth.makeAuthorizedCall(`${API_URL}/broadcaster/${id}`).then(res=>res.json())  
    console.log('token ->', token)
    const spotifyToken = token.access_token || null
    updateToken(spotifyToken)
    fetchDone(true)
    return spotifyToken
  }

  /**
   * 
   */
  const makeCall = async (f, args, onSuccess, onError) =>{
		f(...args)
			.then(
				data => {
					onSuccess(data)
				},
				err => {
					if(err.status === 401){
						refreshSpotifyToken()
							.then(() => makeCall(f, args, callback, err))
					}
					else{
						onError(err)
					}
				}
			)
  }

  useEffect(()=>{
    if (auth.data.channelId){
      refreshSpotifyToken(auth.data.channelId)
        .then()
    }
  }, [auth.data.channelId])

  if (fetch){    
    return (
      <SpotifyContext.Provider value={[token, api, makeCall]} {...props}/>
    )
  }
  else {
    return <div style={{height: '100vh'}}><LoadingCard /></div>
  }
}
const useSpotify = () => React.useContext(SpotifyContext)
export {SpotifyProvider, useSpotify}
