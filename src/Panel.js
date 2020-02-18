import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ViewerDashboard from './App';
import registerServiceWorker from './registerServiceWorker';
import { TrnTableTheme } from './global-theme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import { GraphQLAuth } from './auth/GraphQLAuth';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const auth = new GraphQLAuth();
const GET_SESSIONS = gql`
	{
		extension_session {
				broadcaster_id
				created_at
				active
				session_id
				updated_at
				settings
		}
	}
`;



ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <ApolloProvider client={ auth.getClient() } >
    <ViewerDashboard />
  </ApolloProvider> 
</MuiThemeProvider>
, document.getElementById('root'));
// registerServiceWorker();
