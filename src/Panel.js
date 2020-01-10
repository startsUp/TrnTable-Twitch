import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ViewerDashboard from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  


const theme = createMuiTheme({
    
     typography: {
        fontFamily: [
            'sofia_proregular',
            
        ].join(','),
        h1: {
            fontFamily: 'sofia_problack'
        },
        h5: {
            fontFamily: 'sofia_problack'
        },
        body2: {
            fontFamily: 'sofia_prolight',
        }
   },
 });
firebase.initializeApp({
    apiKey: "AIzaSyC9zba9_9VW7_9EIvTjU5e_MllyfapJ9iQ",
    authDomain: "jukebox-2952e.firebaseapp.com",
    databaseURL: "https://jukebox-2952e.firebaseio.com",
    projectId: "jukebox-2952e",
    storageBucket: "jukebox-2952e.appspot.com",
  });

// var getHashParams = () => {
//     var hashParams = {}
//     var e, r = /([^&=]+)=?([^&]*)/g,
//         q = window.location.hash.substring(1)

//     e = r.exec(q)
//     while (e) {
//         hashParams[e[1]] = decodeURIComponent(e[2])
//         e = r.exec(q)
//     }
//     return hashParams
// }
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

//   if(window.location.hash.substring(1)){
//     var params = getHashParams()
//     const firebaseToken = params.token
//     const token = params.access_token
//     const refreshToken = params.refresh_token
//   }
  // Disable deprecated features

ReactDOM.render(
<MuiThemeProvider theme={ theme }>
    <ViewerDashboard dbRef={db} firebase={firebase} />
</MuiThemeProvider>
, document.getElementById('root'));
// registerServiceWorker();
