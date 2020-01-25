import React from "react"
import ReactDOM from "react-dom"
import './index.css'
import ConfigPage from "./components/ConfigPage/ConfigPage"
import { TrnTableTheme } from './global-theme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import { AuthProvider } from './auth/AuthProvider';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const auth = new AuthProvider(Twitch);
ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <ApolloProvider client={ auth.getClient() } >
    <ConfigPage />
  </ApolloProvider> 
</MuiThemeProvider>,
  document.getElementById("root")
) 