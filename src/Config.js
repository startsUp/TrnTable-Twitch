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

// const authContext = React.CreateContext(auth);
ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <AuthProvider viewType={ViewType.CONFIG}>
    <ConfigPage />
  </AuthProvider>
</MuiThemeProvider>,
  document.getElementById("root")
) 