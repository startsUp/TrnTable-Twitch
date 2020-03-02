import React, { useState, useEffect } from 'react'
import LoadingCard from '../components/loader'
import { SpotifyLogin } from './spotify-login'
import { SpotifyService } from '../util/Spotify/SpotifyService'
import Authentication from '../util/Twitch/Authentication';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken'
import { ViewType } from '../util/Twitch/ViewType' 
import { Role } from './roles/roles';
import { SpotifyWebApi } from 'spotify-web-api-js'

const VERSION_NO = "0.0.1";

const SpotifyContext = React.createContext()



/**
 * Auth Provider for auth context. This handles login/logout and fetching of user data
 * @param {Object} props 
 */
function SpotifyProvider(props) {
  const auth = useAuth()
  const api  = new SpotifyWebApi();
  useEffect(()=>{
    api.setAccessToken(auth.data.spotifyToken)
  }, [auth.data])
  return (
    <SpotifyContext.Provider value={} />
  )
}
const useSpotify = () => React.useContext(SpotifyContext)
export {SpotifyProvider, useSpotify}
