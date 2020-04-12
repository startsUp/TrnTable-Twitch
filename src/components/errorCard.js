import React from 'react'
import AppLogo from './logo'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextWithTitle } from './Misc/TextWithTitle';

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.default,
        height: '100%'
    },
    card: {
        height: '15rem',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '5rem',
        marginBottom: '1rem'
    },
    progress: {
        height: '2px'
    },
    button: theme.button
}))
export default function ErrorCard(props){
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Box p={3} className={classes.card}>
                <TextWithTitle title="Error" text={props.error.message}/>
                { props.reset }
            </Box>
        </div>
    )
}