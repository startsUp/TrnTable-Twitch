import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing(1),
        padding: theme.spacing(3)
    },
    title: {
        textDecoration: 'underline',
        fontFamily: 'sofia_problack',
    },
}))
export const TextWithTitle = (props: {title: string, text: string}) => {
    const classes = useStyles()
    const { title, text } = props
    return(
        <div className={classes.root}>
            <Typography variant="h6" color="textPrimary" className={classes.title}>{title}</Typography>
            <Typography variant="body2" color="textSecondary">{props.text}</Typography>
        </div>
    )
}