import React from "react"
import ReactDOM from "react-dom"
import './index.css'

import { TrnTableTheme } from './global-theme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import { GraphQLAuth } from './auth/GraphQLAuth';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AuthProvider } from './auth/auth-context'
import { ViewType } from './util/Twitch/ViewType'
import { SpotifyProvider } from "./util/Spotify/spotify-context"

ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <AuthProvider viewType={ViewType.CONFIG}>
  </AuthProvider>
</MuiThemeProvider>,
  document.getElementById("root")
) 