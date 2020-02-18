import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ViewerDashboard from './App';
import registerServiceWorker from './registerServiceWorker';
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

ReactDOM.render(
<MuiThemeProvider theme={ theme }>
    <ViewerDashboard  />
</MuiThemeProvider>
, document.getElementById('root'));
// registerServiceWorker();