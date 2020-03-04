import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ViewerDashboard from './ViewerDashboard';
import registerServiceWorker from './registerServiceWorker';
import { TrnTableTheme } from './global-theme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import { GraphQLAuth } from './auth/GraphQLAuth';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AuthProvider } from './auth/auth-context';
import { ViewType } from './util/Twitch/ViewType';

var twitch = window.Twitch.ext
twitch.onAuthorized(auth => {
if (twitch.viewer) {
    // setTimeout(setupListener(), 1000)
    console.log(twitch.viewer)
    twitch.listen(`whisper-${twitch.viewer.opaqueId}`, (t,c,m)=> {})
            // get user data to check if it exist, only need to this in config view
}
})


ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <AuthProvider viewType={ViewType.PANEL}>
    {/* <ViewerDashboard /> LET AUTH DECIDE WHAT TO RENDER */}
  </AuthProvider>	
</MuiThemeProvider>
, document.getElementById('root'));
// registerServiceWorker();
