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

const auth = new GraphQLAuth();
// const authContext = React.CreateContext(auth);
ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <ApolloProvider client={ auth.getClient() } >
      <AuthProvider onTokenChange={token => auth.resetAuthWithToken(token)} viewType={ViewType.CONFIG}>
        <ConfigPage />
      </AuthProvider>
  </ApolloProvider> 
</MuiThemeProvider>,
  document.getElementById("root")
) 