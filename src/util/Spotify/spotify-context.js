import React, { useState, useEffect } from 'react'

/// <reference path="../node_modules/spotify-web-api-js/src/typings/spotify-web-api.d.ts" />
import SpotifyWebApi from 'spotify-web-api-js'
import { useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useAuth } from '../../auth/auth-context';
import LoadingCard from '../../components/loader';
import ErrorCard from '../../components/errorCard';

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
  const [error, setError] = useState(null)
  const theme = useTheme()
  const updateToken = (newToken) => {
    api.setAccessToken(newToken)
    if (!token){
      setToken(newToken)
    }
  }

  const getToken = async (url) => {
    const token = await auth.makeAuthorizedCall(url)
        .then(res=>{
          if(res.status === 200)
            return res.json()
          else
            return {access_token: null}
        })
        .catch(err=> {
          console.log('Error calling ebs -->', err)
          let error = new Error('Unable to connect with spotify service.')
          setError(error)
        })

    const spotifyToken = token ? token.access_token : null
    updateToken(spotifyToken)
    fetchDone(true)
    return spotifyToken
  }

  const fetchAccessToken = async (id=auth.data.channelId) => {
    return getToken(`${API_URL}/spotify/${id}`)
  }
  const refreshSpotifyToken = async (id=auth.data.channelId) => {
    return getToken(`${API_URL}/refreshSpotify/${id}`)
  }

  /**
   * 
   */
  const makeCall = async (f, args, onSuccess, onError, retries = 0) =>{
		f(...args)
			.then(
				data => {
					onSuccess(data)
				},
				err => {
          console.log('Error when making call--->', err)
					if(err.status === 401){
            if (retries < 4){
              refreshSpotifyToken()
                .then(() => makeCall(f, args, onSuccess, onError, retries+1))
                .catch(err => onError(err))
            }
            else{
              let error = new Error('Unable to connect with spotify service. Try reconnecting your spotify account again.')
              setError(error)
              onError(error)
            }
					}
					else{
						onError(err)
					}
				}
			)
  }

  //initial access token fetch
  useEffect(()=> {
    if(auth.data.channelId || auth.twitchAuth){
      var channelId = auth.data.channelId ? auth.data.channelId : auth.twitchAuth.getChannelId()
      fetchAccessToken(channelId)
    }
  },[])
  
  useEffect(()=>{
    if ((auth.data.channelId || auth.twitchAuth) && fetch && auth.spotifyLinked){
      var channelId = auth.data.channelId ? auth.data.channelId : auth.twitchAuth.getChannelId()
      refreshSpotifyToken(channelId)
    }
    if (!auth.spotifyLinked && token){ // if spotify account if unlinked then remove token from state
      setToken(null)
      api.setAccessToken(null)
    }
  }, [auth.data.channelId, auth.spotifyLinked])

  const resetError = () => {
    var channelId = auth.data.channelId ? auth.data.channelId : auth.twitchAuth.getChannelId()
    fetchAccessToken(channelId)
    setError(null)
    fetchDone(false)
  }

  if (error){
    return( 
    <div style={{height: '100vh'}}><ErrorCard error={error} reset={
        <Button variant="outlined" onClick={resetError} size="small" color="primary" className={theme.button}>
          Retry
        </Button>
      }
    />
    </div>
  )}
  if (fetch){    
    return (
      <SpotifyContext.Provider value={[token, api, makeCall]} {...props}/>
    )
  }
  else {
    return <div style={{height: '100vh'}}><LoadingCard progressbar /></div>
  }
}
const useSpotify = () => React.useContext(SpotifyContext)
export {SpotifyProvider, useSpotify}
