import { createMuiTheme } from '@material-ui/core/styles'; 

export const TrnTableTheme = createMuiTheme({
    
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
        },
   },
   palette: {
        type: 'dark',
        primary: {
            main: '#1ED660',
            contrastText: "#fff"
        },
        secondary: {
            main: '#FFFFFF'
        },
        background: {
            paper: '#191414',
            default: "#191414"
        }
  },
 });