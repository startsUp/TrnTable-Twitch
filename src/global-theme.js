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
                default: "#191414",
                cover: 'rgba(25, 36, 26, 0.8)' // 9th midpoint 
            }
    },
    button: {
        borderRadius: '16px',
        fontFamily: 'sofia_problack',
        justifySelf: 'center',
        cursor: 'pointer',
    },
    smallButton: {
        borderRadius: '16px',
        fontFamily: 'sofia_problack',
        justifySelf: 'center',
        cursor: 'pointer',
        fontSize: '0.65rem'
    }
 });