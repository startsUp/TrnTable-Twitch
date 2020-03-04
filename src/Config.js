import React from "react"
import ReactDOM from "react-dom"
import './index.css'
import ConfigPage from "./components/ConfigPage/ConfigPage"
import { TrnTableTheme } from './global-theme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import { GraphQLAuth } from './auth/GraphQLAuth';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AuthProvider } from './auth/auth-context'
import { ViewType } from './util/Twitch/ViewType'
import { SpotifyProvider } from "./util/Spotify/spotify-context"

var twitch = window.Twitch.ext
twitch.onAuthorized(auth => {
if (twitch.viewer) {
    // setTimeout(setupListener(), 1000)
    console.log(twitch.viewer)
    twitch.listen(`whisper-${twitch.viewer.opaqueId}`, (t,c,m)=> {})
            // get user data to check if it exist, only need to this in config view
}
})
// const authContext = React.CreateContext(auth);
ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <AuthProvider viewType={ViewType.CONFIG}>
    <SpotifyProvider>
    <ConfigPage />
    </SpotifyProvider>
  </AuthProvider>
</MuiThemeProvider>,
  document.getElementById("root")
) 