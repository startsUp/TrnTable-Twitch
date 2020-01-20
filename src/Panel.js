import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ViewerDashboard from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { TrnTableTheme } from './global-theme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import { AuthProvider } from './auth/AuthProvider';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const auth = new AuthProvider(Twitch);
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
firebase.initializeApp({
    apiKey: "AIzaSyC9zba9_9VW7_9EIvTjU5e_MllyfapJ9iQ",
    authDomain: "jukebox-2952e.firebaseapp.com",
    databaseURL: "https://jukebox-2952e.firebaseio.com",
    projectId: "jukebox-2952e",
    storageBucket: "jukebox-2952e.appspot.com",
  });


ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <ApolloProvider client={ auth.getClient() } >
    <ViewerDashboard />
  </ApolloProvider> 
</MuiThemeProvider>
, document.getElementById('root'));
// registerServiceWorker();
