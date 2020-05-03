import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TrnTableTheme } from './global-theme'
import { MuiThemeProvider } from '@material-ui/core/styles';  
import { AuthProvider } from './auth/auth-context';
import { ViewType } from './util/Twitch/ViewType';

ReactDOM.render(
<MuiThemeProvider theme={ TrnTableTheme }>
  <AuthProvider viewType={ViewType.PANEL}>
    {/* <ViewerDashboard /> LET AUTH DECIDE WHAT TO RENDER */}
  </AuthProvider>	
</MuiThemeProvider>
, document.getElementById('root'));