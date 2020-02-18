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

ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <AuthProvider viewType={ViewType.PANEL}>
    {/* <ViewerDashboard /> LET AUTH DECIDE WHAT TO RENDER */}
  </AuthProvider>	
</MuiThemeProvider>
, document.getElementById('root'));
// registerServiceWorker();
