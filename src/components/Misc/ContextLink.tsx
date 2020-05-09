import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        padding: theme.spacing(2)
    },
    title: {
        textDecoration: 'underline',
        fontFamily: 'sofia_problack',
    },
    link: {
        textTransform: 'capitalize'
    }
}))
export const ContextLink = (props: {link: {text: string, url: string}, title: string, text: string}) => {
    const classes = useStyles()
    const { title, text, link } = props
    return(
        <div className={classes.root}>
            <Typography variant="h6" color="textPrimary" className={classes.title}>{title}</Typography>
            <Typography variant="body2" color="textSecondary">{props.text}</Typography>
            <Typography>
                <Link href={link.url} className={classes.link} target="_blank" rel="noopener">
                    {link.text}
                </Link>
            </Typography>
        </div>
    )
}