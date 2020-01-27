import React, { useState, Component } from 'react'
import { SvgIcon, Button, Typography, Paper, Avatar, Box, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	hostCard: {
		width: '400px',
		padding: theme.spacing(1),
		textAlign: 'center'
	},
	hostTitle: {
		textDecoration: 'underline',
		fontFamily: 'sofia_problack'
	},
	desc: {
		textAlign: 'justify',
		fontFamily: 'sofia_prolight',
		padding: `${theme.spacing(2)}px 0 ${theme.spacing(4)}px 0`
	},
	title:{
		fontWeight: 'bold',
		fontFamily: 'sofia_problack'
	},
	titleContainer: {
		display: 'inline-flex',
		alignItems: 'center',
	},
	loginButton: {
	borderRadius: theme.spacing(2),
		fontFamily: 'sofia_problack',
		justifySelf: 'center',
		width: theme.spacing(15),
		marginTop: theme.spacing(1)
	},
	appLogo: {
		width: '25px',
	}
}))

const patternURL = "url(" + window.location.href + "#a)"
const AppLogo = (props) => {
		const classes = useStyles();
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200" className={classes.appLogo}>
			<defs>
				<pattern patternUnits="userSpaceOnUse" width="462.222" height="265" patternTransform="translate(747.778 285)" id="a">
					<path fill="#1ed660" strokeWidth="25.116" d="M747.778 285H1210v265H747.778z" transform="translate(-747.778 -285)"/>
					<path fill="#1ed660" d="M751 300.859h283.08v214.234H751z" transform="translate(-747.778 -285)"/>
					<path d="M1058 330c-2.471 2.483-6.172 1.586-9 3-.843.422-1.264 1.411-2 2-.939.75-1.925 1.463-3 2-3.892 1.946-2.514.078-7 2-8.765 3.757 2.428.592-6 3-1.321.378-2.77.385-4 1-.843.422-1.192 1.515-2 2-.904.542-2.021.609-3 1-.692.277-1.36.617-2 1-1.03.618-1.956 1.404-3 2-1.294.74-2.76 1.173-4 2-.784.523-1.192 1.515-2 2-.904.542-2.096.458-3 1-1.617.97-2.491 2.869-4 4-1.98 1.485-3.02.515-5 2-.596.447-.473 1.473-1 2-1.054 1.054-3.106.807-4 2-.632.843-.368 2.157-1 3-.062 2.816-2.255.255-3 1-.527.527-.473 1.473-1 2-.527.527-1.473.473-2 1-.236.236.15.702 0 1-.21.422-.739.608-1 1-.413.62-.473 1.473-1 2-.527.527-1.38.587-2 1-.392.261-.667.667-1 1-.333.333-.739.608-1 1-.413.62-.473 1.473-1 2-2.429 2.429-1.468-.297-3 2-.413.62-.587 1.38-1 2-.261.392-.79.578-1 1-.298.596.21 1.368 0 2-2.414 7.243.288-1.577-2 3-.131.263 0 3.477 0 4v52c0 .667.162 1.353 0 2-.18.723-.82 1.277-1 2-.323 1.294.261 2.693 0 4-.207 1.034-.793 1.966-1 3-.13.654.162 1.353 0 2-.18.723-.82 1.277-1 2-.162.647.162 1.353 0 2-.18.723-.82 1.277-1 2-.323 1.294.323 2.706 0 4-.18.723-.82 1.277-1 2-.162.647.162 1.353 0 2-.18.723-.764 1.293-1 2-.105.316.105.684 0 1-.236.707-.764 1.293-1 2-.21.632.298 1.404 0 2-.21.422-.79.578-1 1-.15.298.105.684 0 1-.236.707-.764 1.293-1 2-.354 1.063.354 2.937 0 4-.298.894-1.578 1.157-2 2-.298.596.298 1.404 0 2-2.08 4.162.069-1.069-2 1-.236.236 0 .667 0 1 0 .45-.152 2.696 0 3 .21.422.79.578 1 1 .15.298-.236.764 0 1s.764-.236 1 0-.236.764 0 1c.5.5 2.5-.5 3 0 .236.236-.236.764 0 1 .471.471 1.404-.298 2 0 .843.422 1.157 1.578 2 2 .629.314 3.371-.314 4 0 .422.21.578.79 1 1 .396.198 2.796-.204 3 0 .236.236-.236.764 0 1 .032.032 2.757 0 3 0h6c.45 0 2.696-.152 3 0 .422.21.578.79 1 1 .607.304 5.393-.304 6 0 .422.21.578.79 1 1 .298.15.764-.236 1 0s-.236.764 0 1 .702-.15 1 0c.422.21.578.79 1 1 .298.15.702-.15 1 0 .422.21.578.79 1 1 .298.15.764-.236 1 0 2.069 2.069-3.162-.08 1 2 .298.15.764-.236 1 0 .032.032 0 2.757 0 3v15c0 .471-.045 4.955 0 5 .045.045 4.529 0 5 0h6c.45 0 2.696.152 3 0 .843-.422 1.157-1.578 2-2 .63-.315 4.37.315 5 0 .843-.422 1.157-1.578 2-2 .298-.15.764.236 1 0s-.298-.85 0-1c.647-.323 3.64.36 4 0 .236-.236-.236-.764 0-1s.702.15 1 0c.422-.21.578-.79 1-1 .596-.298 1.404.298 2 0 .422-.21.667-.667 1-1 .333-.333.79-.578 1-1 .298-.596-.471-1.529 0-2 .236-.236.764.236 1 0s-.15-.702 0-1c.382-.764 2.774-2.323 3-3 .21-.632-.298-1.404 0-2 .15-.298.702.15 1 0a2.28 2.28 0 0 0 1-1c.265-.53-.227-4.32 0-5 .298-.894 1.578-1.157 2-2 .298-.596-.298-1.404 0-2 .21-.422.79-.578 1-1 .132-.263 0-3.477 0-4v-46c0-1.333-.189-2.68 0-4 .15-1.044.827-1.96 1-3 .164-.986 0-2 0-3v-7c0-1-.196-2.02 0-3 1.298-6.49 1 2.229 1-4v-26c0-1-.316-2.051 0-3 .15-.447.79-.578 1-1 .15-.298-.236-.764 0-1s.85.298 1 0c.298-.596-.21-1.368 0-2 .15-.447.79-.578 1-1 .15-.298-.15-.702 0-1 2.288-4.577-.414 4.243 2-3 .616-1.847-1.526-.474 1-3 .527-.527 1.38-.587 2-1 .392-.261.667-.667 1-1 .333-.333.739-.608 1-1 2.667-4-1-.333 3-3 .784-.523 1.157-1.578 2-2 2.463-1.231-.903 2.903 3-1 .236-.236-.15-.702 0-1 .21-.422.667-.667 1-1 .333-.333.608-.739 1-1 .62-.413 1.38-.587 2-1 .784-.523 1.157-1.578 2-2 .298-.15.702.15 1 0 .266-.133 2.867-2.734 3-3 .132-.263 0-3.477 0-4 0-.696.18-4.638 0-5-.422-.843-1.578-1.157-2-2-.198-.396.204-2.796 0-3-.236-.236-.764.236-1 0-.471-.471.298-1.404 0-2-.21-.422-.79-.578-1-1-.298-.596.471-1.529 0-2-.236-.236-.764.236-1 0s.236-.764 0-1-.85.298-1 0c-.298-.596.21-1.368 0-2-.15-.447-.79-.578-1-1-.298-.596.298-1.404 0-2-.21-.422-.79-.578-1-1-.15-.298 0-.667 0-1 0-.969.199-5.404 0-6-.236-.707-.764-1.293-1-2-.21-.632.298-1.404 0-2-.21-.422-.79-.578-1-1-.13-.259 0-5.291 0-6v-1c0-.333.236-.764 0-1s-.667 0-1 0c-.242 0-2.968-.032-3 0-.236.236.236.764 0 1s-.702-.15-1 0c-.422.21-.538.908-1 1-1.307.261-2.667 0-4 0z" fill="#3fcc72" transform="translate(-747.778 -285)"/>
					<path d="M855 455c-2.034 1.845-4.786-.738-7 0-1.414.471-2.586 1.529-4 2-1.21.403-4.638-.34-6 0-.723.18-1.277.82-2 1-.647.162-1.368-.21-2 0-.447.15-.553.85-1 1-1.265.422-2.735-.422-4 0-.447.15-.578.79-1 1-.298.15-.702-.15-1 0-.422.21-.578.79-1 1-.298.15-.702-.15-1 0-.422.21-.553.85-1 1-.005.002-2.999 0-3 0-.236.236.236.764 0 1s-.684-.105-1 0c-.707.236-1.293.764-2 1-.316.105-.702-.15-1 0-.422.21-.553.85-1 1-.005.002-2.999 0-3 0-.236.236.236.764 0 1s-.684-.105-1 0a8.46 8.46 0 0 0-2 1c-1.154.77-1.846 2.23-3 3-2.3 1.533-2.7.467-5 2-1.154.77-1.846 2.23-3 3-.62.413-1.38.587-2 1-.784.523-1.216 1.477-2 2-.504 2.203-2.057.529-3 1-.422.21-.608.739-1 1-1.24.827-2.76 1.173-4 2-2.044 1.363.016 2.328-2 3-.632.21-1.368-.21-2 0-.894.298-1.157 1.578-2 2-2.463 1.231.903-2.903-3 1-.236.236.236.764 0 1s-.702-.15-1 0c-.422.21-.578.79-1 1-.596.298-1.404-.298-2 0-4.162 2.08 1.069-.069-1 2-.236.236-.702-.15-1 0-.422.21-.578.79-1 1-.396.198-2.796-.204-3 0-.236.236.236.764 0 1s-.764-.236-1 0 .15.702 0 1c-.21.422-.79.578-1 1-.15.298.236.764 0 1s-.702-.15-1 0c-.843.422-1.157 1.578-2 2-1.38.69-.894-1.211-2 1-.271.542.274 3.726 0 4-.236.236-.764-.236-1 0s.236.764 0 1-.764-.236-1 0 .15.702 0 1c-.21.422-.79.578-1 1-.298.596.471 1.529 0 2-.236.236-.764-.236-1 0s.236.764 0 1-.764-.236-1 0c-.04.04 0 3.633 0 4v15c0 .243-.032 2.968 0 3 .471.471 1.529-.471 2 0 .236.236-.236.764 0 1s.764-.236 1 0-.236.764 0 1 .764-.236 1 0-.236.764 0 1 .702-.15 1 0c.843.422 1.157 1.578 2 2 .263.131 3.477 0 4 0h17c.45 0 2.696-.152 3 0 .843.422 1.157 1.578 2 2 .8.4 2.2-.4 3 0 .422.21.578.79 1 1 .596.298 1.368-.21 2 0 .707.236 1.293.764 2 1 .632.21 1.404-.298 2 0 .422.21.667.667 1 1 .667 0 1.368-.21 2 0 .447.15.553.85 1 1 .632.21 1.333 0 2 0 .333 0 .702-.15 1 0 .422.21.578.79 1 1 .298.15.684-.105 1 0 .707.236 1.293.764 2 1 .6.2 4.202 0 5 0h25c.709 0 5.741.13 6 0 .422-.21.578-.79 1-1 .63-.315 4.37.315 5 0 .422-.21.578-.79 1-1 .596-.298 1.529.471 2 0 .236-.236-.236-.764 0-1 .274-.274 3.458.271 4 0 .422-.21.578-.79 1-1 .596-.298 1.404.298 2 0 .422-.21.578-.79 1-1 .596-.298 1.404.298 2 0 .422-.21.578-.79 1-1 .298-.15.764.236 1 0s-.236-.764 0-1c.471-.471 1.404.298 2 0 .422-.21.578-.79 1-1 .8-.4 2.2.4 3 0 .422-.21.578-.79 1-1 .298-.15.667 0 1 0h6c.333 0 .702.15 1 0 .422-.21.578-.79 1-1 .263-.131 3.477 0 4 0h19c1.04 0 5.213-.197 6 0 .723.18 1.277.82 2 1 1.294.323 2.693-.261 4 0 1.034.207 1.966.793 3 1 1.603.32 3.397-.32 5 0 .73.146 1.277.82 2 1 .647.162 1.353-.162 2 0 .723.18 1.277.82 2 1 .647.162 1.333 0 2 0h31c.333 0 .764.236 1 0s-.236-.764 0-1c.5-.5 2.5.5 3 0 .032-.032 0-2.757 0-3 0-1.917.452-1.548-1-3-.333-.333-.578-.79-1-1-.298-.15-.764.236-1 0s.236-.764 0-1-.764.236-1 0 .236-.764 0-1c-.31-.31-4.69.31-5 0-.236-.236.15-.702 0-1-1.106-2.211-.62-.31-2-1-.422-.21-.578-.79-1-1-.298-.15-.702.15-1 0-.422-.21-.608-.739-1-1-.62-.413-1.38-.587-2-1-.784-.523-1.216-1.477-2-2-.62-.413-1.38-.587-2-1-.784-.523-1.333-1.333-2-2-.03-.03-3.798-3.596-4-4-1.26-2.519 3.798.865-2-3-.277-.185-.702.15-1 0-.422-.21-.667-.667-1-1l-1-1c-.64-.64-3.376-3.064-4-4-.413-.62-.587-1.38-1-2-1.658-2.487-.23-.115-2-1-.422-.21-.667-.667-1-1l-2-2c-.781-.781-2.425-2.137-3-3-.413-.62-.473-1.473-1-2-.471-.471-1.529.471-2 0-.527-.527-.473-1.473-1-2-.236-.236-.702.15-1 0-.843-.422-1.216-1.477-2-2-.62-.413-1.473-.473-2-1-.236-.236.15-.702 0-1-.21-.422-.667-.667-1-1-.333-.333-.578-.79-1-1-.298-.15-.764.236-1 0-2.429-2.429.297-1.468-2-3-.62-.413-1.473-.473-2-1-.236-.236.15-.702 0-1-.133-.266-2.734-2.867-3-3-.298-.15-.702.15-1 0-.422-.21-.667-.667-1-1-.333-.333-.79-.578-1-1-.15-.298.15-.702 0-1-.21-.422-.667-.667-1-1-.333-.333-.578-.79-1-1-.596-.298-1.529.471-2 0-.236-.236.15-.702 0-1-.422-.843-1.578-1.157-2-2-.15-.298.15-.702 0-1-1.106-2.211-.62-.31-2-1-.191-.096-3.904-3.809-4-4-.15-.298.236-.764 0-1s-.764.236-1 0c-.471-.471.471-1.529 0-2-.236-.236-.764.236-1 0s.15-.702 0-1c-.422-.843-1.578-1.157-2-2-.15-.298.236-.764 0-1s-.764.236-1 0 .236-.764 0-1-.764.236-1 0 .236-.764 0-1c-.045-.045-4.529 0-5 0h-17c-.333 0-1 .333-1 0s1.333 0 1 0c-1.075 0-2.874.225-4 0-1.348-.27-2.667-.667-4-1z" fill="#7dcb9a" transform="translate(-747.778 -285)"/>
					<path d="M795 331c-1.667 1-3.383 1.922-5 3-.392.261-.667.667-1 1l-5 5-2 2c-.667.667-1.434 1.246-2 2-.447.596-.473 1.473-1 2-.527.527-1.473.473-2 1-1.054 1.054-.946 2.946-2 4-.527.527-1.473.473-2 1-.064.064-1.876 3.814-2 4-.784 1.177-2.151 1.869-3 3-2.203.504-.529 2.057-1 3-.21.422-.739.608-1 1-.413.62-.587 1.38-1 2-.523.784-1.578 1.157-2 2-.15.298.15.702 0 1-.6 1.2-2.4 1.8-3 3-.15.298.236.764 0 1s-.764-.236-1 0 .236.764 0 1-.764-.236-1 0c-.471.471.471 1.529 0 2-.236.236-.764-.236-1 0s.236.764 0 1-.764-.236-1 0 .15.702 0 1c-.21.422-.79.578-1 1-.889 1.778.556.556 1 1 .236.236-.236.764 0 1s.764-.236 1 0c.471.471-.471 1.529 0 2 .236.236.764-.236 1 0s-.236.764 0 1 .764-.236 1 0-.236.764 0 1 .764-.236 1 0-.15.702 0 1c.21.422.79.578 1 1 .15.298-.15.702 0 1 .21.422.79.578 1 1 .15.298-.15.702 0 1 .21.422.79.578 1 1 .298.596-.298 1.404 0 2 .21.422.79.578 1 1 .15.298-.15.702 0 1 .21.422.79.578 1 1 .15.298-.15.702 0 1 .422.843 1.578 1.157 2 2 .15.298-.236.764 0 1s.764-.236 1 0c.471.471-.471 1.529 0 2 2.069 2.069-.08-3.162 2 1 .314.629-.314 3.371 0 4 .422.843 1.578 1.157 2 2 .15.298-.15.702 0 1 .21.422.79.578 1 1 .198.396-.204 2.796 0 3 .236.236.764-.236 1 0s-.236.764 0 1 .764-.236 1 0c.471.471-.471 1.529 0 2 .236.236.764-.236 1 0 .471.471-.471 1.529 0 2 .236.236.764-.236 1 0s-.236.764 0 1c.471.471 1.404-.298 2 0 1.388.694 1 1.78 1 3 0 .333-.236.764 0 1s.764.236 1 0-.236-.764 0-1 .764.236 1 0c.471-.471-.471-1.529 0-2 .236-.236.764.236 1 0 .5-.5-.5-2.5 0-3 .236-.236.764.236 1 0s-.15-.702 0-1c.21-.422.79-.578 1-1 .15-.298-.236-.764 0-1s.764.236 1 0c.274-.274-.271-3.458 0-4 .21-.422.79-.578 1-1 .15-.298-.236-.764 0-1s.764.236 1 0-.15-.702 0-1c.422-.843 1.477-1.216 2-2 2.203-.504.529-2.057 1-3 .21-.422.739-.608 1-1 .413-.62.587-1.38 1-2 .523-.784 1.578-1.157 2-2 .15-.298-.15-.702 0-1 .6-1.2 2.4-1.8 3-3 .15-.298-.15-.702 0-1 .21-.422.79-.578 1-1 .198-.396-.204-2.796 0-3 .236-.236.764.236 1 0s-.236-.764 0-1 .764.236 1 0-.236-.764 0-1 .764.236 1 0-.236-.764 0-1 .764.236 1 0-.236-.764 0-1 .764.236 1 0c.471-.471-.471-1.529 0-2 .471-.471 1.529.471 2 0 .236-.236-.15-.702 0-1 .21-.422.79-.578 1-1 .298-.596-.298-1.404 0-2 .21-.422.79-.578 1-1 .15-.298 0-.667 0-1v-2 2c0-1 .316-2.051 0-3-.105-.316-.764.236-1 0s.15-.702 0-1c-2.08-4.162.069 1.069-2-1-.236-.236.15-.702 0-1-.422-.843-1.578-1.157-2-2-.15-.298.15-.702 0-1-.422-.843-1.578-1.157-2-2-.15-.298.15-.702 0-1-.21-.422-.79-.578-1-1-.4-.8.4-2.2 0-3-.422-.843-1.578-1.157-2-2-.15-.298.236-.764 0-1s-.764.236-1 0 .15-.702 0-1c-.21-.422-.79-.578-1-1-.298-.596.471-1.529 0-2-.236-.236-.764.236-1 0s.15-.702 0-1c-.21-.422-.79-.578-1-1-.15-.298.105-.684 0-1-.236-.707-.764-1.293-1-2-.199-.596 0-5.031 0-6 0-.333.236-.764 0-1s-.764.236-1 0 0-.667 0-1c0-.523-.131-3.737 0-4 .21-.422.757-.596 1-1 .767-1.278 1.333-2.667 2-4z" fill="#7ece9c" transform="translate(-747.778 -285)"/>
					<path d="M1030 443c3.089 5.696 4.358 12.13 7 18 1.408 3.13 3.624 5.856 5 9 .973 2.223 1.044 4.77 2 7 2.337 5.452 4.518 7.036 7 12 .471.943.529 2.057 1 3 .537 1.075 1.527 1.895 2 3 .541 1.263.238 2.856 1 4 .667 1 2.25 1.062 3 2 .658.823.609 2.021 1 3 .277.692.667 1.333 1 2l3 6c.333.667.764 1.293 1 2 .105.316-.15.702 0 1 .21.422.85.553 1 1 .152.457-.223 3.555 0 4 .21.422.79.578 1 1 .15.298-.15.702 0 1 .21.422.79.578 1 1 .15.298-.15.702 0 1 .422.843 1.578 1.157 2 2 .15.298-.15.702 0 1 .422.843 1.578 1.157 2 2 .298.596-.471 1.529 0 2 .236.236.667 0 1 0 .523 0 3.737.131 4 0a2.28 2.28 0 0 0 1-1c.15-.298-.298-.85 0-1 .596-.298 1.367.21 2 0 .447-.15.578-.79 1-1 .298-.15.684.105 1 0 .707-.236 1.293-.764 2-1 .316-.105.702.15 1 0 4.577-2.288-4.243.414 3-2 .632-.21 1.404.298 2 0 .422-.21.578-.79 1-1 .596-.298 1.529.471 2 0 .236-.236-.15-.702 0-1 .21-.422.667-.667 1-1 .333-.333.578-.79 1-1 .298-.15.702.15 1 0 .422-.21.578-.79 1-1 .298-.15.764.236 1 0s-.236-.764 0-1c.471-.471 1.529.471 2 0 .236-.236-.15-.702 0-1 .422-.843 1.578-1.157 2-2 .15-.298-.15-.702 0-1 .21-.422.79-.578 1-1 .15-.298-.236-.764 0-1s.764.236 1 0c.5-.5-.5-2.5 0-3 .236-.236.764.236 1 0s-.15-.702 0-1c.21-.422.79-.578 1-1 .068-.137.068-5.863 0-6-.21-.422-.79-.578-1-1-.298-.596.298-1.404 0-2-.241-.482-3.973-3.98-4-4-.596-.447-1.36-.617-2-1-2.061-1.237-3.939-2.763-6-4-1.278-.767-2.76-1.173-4-2-.392-.261-.608-.739-1-1-1.24-.827-2.76-1.173-4-2-.392-.261-.608-.739-1-1-.62-.413-1.333-.667-2-1-.667-.333-1.308-.723-2-1-.979-.391-2.057-.529-3-1-5.057-3.371-.825-.93-6-3-4.532-1.813-.139-.092-3-2-.62-.413-1.473-.473-2-1-.236-.236.298-.85 0-1-.596-.298-1.367.21-2 0-.447-.15-.578-.79-1-1-.298-.15-.702.15-1 0-.422-.21-.608-.739-1-1-.62-.413-1.38-.587-2-1-.392-.261-.608-.739-1-1-.62-.413-1.38-.587-2-1-.91-.607-2.114-2.557-3-3-.298-.15-.702.15-1 0-4.162-2.08 1.069.069-1-2-.236-.236-.702.15-1 0-.422-.21-.578-.79-1-1-.298-.15-.702.15-1 0-.422-.21-.667-.667-1-1-.333-.333-.79-.578-1-1-.15-.298.236-.764 0-1s-.764.236-1 0c-.24-.24.24-3.76 0-4-.236-.236-.764.236-1 0s.15-.702 0-1c-.21-.422-.79-.578-1-1-.152-.304 0-2.55 0-3 0-.709.13-5.741 0-6-.21-.422-.79-.578-1-1-.298-.596.298-1.404 0-2-.21-.422-.79-.578-1-1-.15-.298.236-.764 0-1s-.667 0-1 0h-1c-4.029 0-2.447-.415-7 3z" fill="#60de8f" transform="translate(-747.778 -285)"/>
					<path d="M1011 484c-44.263 14.754 28.733-8.926-29 7-4.177 1.152-7.854 3.738-12 5-3.565 1.085-7.346 1.27-11 2-1.348.27-2.634.848-4 1-1.656.184-3.35-.236-5 0-.738.105-1.333.667-2 1l-4 2c-.667.333-1.293.764-2 1-.316.105-.684-.105-1 0-1.414.471-2.554 1.638-4 2-.647.162-1.353-.162-2 0-.723.18-1.277.82-2 1-.647.162-1.404-.298-2 0-.298.15.236.764 0 1s-.667 0-1 0c-.696 0-4.638-.18-5 0-.422.21-.578.79-1 1-.596.298-1.529-.471-2 0-.236.236.236.764 0 1-.5.5-2.5-.5-3 0-.236.236.236.764 0 1s-.764-.236-1 0 0 .667 0 1v5c0 .523-.131 3.737 0 4 .21.422.79.578 1 1 .15.298-.15.702 0 1 .21.422.79.578 1 1 .18.362 0 4.304 0 5 0 .333-.236.764 0 1 .471.471 1.404-.298 2 0 .422.21.578.79 1 1 .298.15.764-.236 1 0s-.236.764 0 1 .702-.15 1 0c.422.21.578.79 1 1 .298.15.764-.236 1 0s-.15.702 0 1c.6 1.2 2.4 1.8 3 3 .15.298-.236.764 0 1s.702-.15 1 0c4.162 2.08-1.069-.069 1 2 .236.236.764-.236 1 0s-.15.702 0 1c.21.422.79.578 1 1 .15.298-.236.764 0 1 .471.471 1.529-.471 2 0 .471.471-.471 1.529 0 2 .236.236.702-.15 1 0 .422.21.667.667 1 1 .333.333.578.79 1 1 .362.18 4.304 0 5 0h10c.333 0 .764.236 1 0s-.298-.85 0-1c.8-.4 2.2.4 3 0 .422-.21.578-.79 1-1 .298-.15.684.105 1 0 .707-.236 1.293-.764 2-1 .316-.105.764.236 1 0s-.298-.85 0-1c.846-.423 3.931.356 5 0 7.243-2.414-1.577.288 3-2 .596-.298 1.404.298 2 0 .422-.21.578-.79 1-1 .298-.15.702.15 1 0 .422-.21.578-.79 1-1 .396-.198 2.796.204 3 0 .236-.236-.236-.764 0-1 .204-.204 2.604.198 3 0 .422-.21.578-.79 1-1 .298-.15.764.236 1 0s-.236-.764 0-1 .764.236 1 0-.236-.764 0-1 .764.236 1 0-.236-.764 0-1c2.069-2.069-.08 3.162 2-1 .15-.298-.236-.764 0-1s.702.15 1 0c.422-.21.578-.79 1-1 .298-.15.764.236 1 0 .471-.471-.471-1.529 0-2 .236-.236.764.236 1 0s0-.667 0-1v-13c0-.367-.04-3.96 0-4 .236-.236.764.236 1 0 .204-.204-.198-2.604 0-3 .21-.422.79-.578 1-1 .15-.298 0-.667 0-1v-15c0-.333-.236-.764 0-1s.667 0 1 0h6c1 0 2.051.316 3 0 .447-.15.578-.79 1-1 .263-.131 3.477 0 4 0h1c.333 0 .92.323 1 0 .323-1.294-1.315-3.78 0-4 2.206-.368 3.85 2.386 6 3 1.174.335 1.205-2.795 1-3-.236-.236-.667 0-1 0-.333 0-.764-.236-1 0s.236.764 0 1-.673.065-1 0c-1.348-.27-2.667-.667-4-1zm-12-148l7 3c1.667 1.333 3.091 3.045 5 4 2.17 1.085 4.777 1.027 7 2 3.144 1.376 5.89 3.549 9 5 1.91.892 4.144 1 6 2 2.525 1.36 4.435 3.718 7 5 22.67 11.335-6.873-7.211 12 6 6.954 4.868 2.813 1.406 10 5 1.738.87 3.261 2.13 5 3 3.465 1.732 5.819 1.88 9 4 1.776 1.184 3.315 2.69 5 4 1.316 1.023 2.667 2 4 3 1.333 1 2.553 2.173 4 3 .915.523 2.096.458 3 1 .808.485 1.216 1.477 2 2 14.803 9.869-6.103-5.92 7 5 4.092 3.41 2.11.74 7 4 .784.523 1.246 1.434 2 2 .596.447 1.404.553 2 1 3.958 2.969.064 1.064 4 5 .527.527 1.404.553 2 1 .754.566 1.192 1.515 2 2 .904.542 2.123.415 3 1 .277.185-.15.702 0 1 .573 1.146 2.087 1.391 3 2 2.487 1.658.115.23 1 2 .21.422.667.667 1 1 .333.333.578.79 1 1 .298.15.764-.236 1 0s-.15.702 0 1c2.08 4.162-.069-1.069 2 1 .236.236-.236.764 0 1s.764-.236 1 0-.236.764 0 1 .667 0 1 0c.333 0 .764.236 1 0s.236-.764 0-1-.702.15-1 0a2.292 2.292 0 0 1-1-1c-.15-.298.15-.702 0-1-.21-.422-.79-.578-1-1-.298-.596.471-1.529 0-2-.236-.236-.764.236-1 0-.032-.032 0-2.757 0-3v-45c0-.667.21-1.368 0-2-.15-.447-.85-.553-1-1 0-4.552.471-.057-1-3-.15-.298.236-.764 0-1s-.85.298-1 0c-.146-.293 0-5.181 0-6v-1c0-.333.236-.764 0-1-.032-.032-2.757 0-3 0h-6c-.667 0-1.353.162-2 0-.723-.18-1.27-.854-2-1-.98-.196-2 0-3 0-1.333 0-2.677.165-4 0-1.364-.17-2.634-.848-4-1-1.657-.184-3.373.362-5 0-1.455-.323-2.545-1.677-4-2-1.627-.362-3.344.184-5 0-1.366-.152-2.667-.667-4-1-1.667 0-3.34.15-5 0-3.435 1.25-5.95-1.619-9-2-1.654-.207-3.344.184-5 0-1.366-.152-2.667-.667-4-1-1.333-.333-2.679-.622-4-1-1.014-.29-1.966-.793-3-1-1.603-.32-3.397.32-5 0-.73-.146-1.277-.82-2-1-.647-.162-1.367.21-2 0-.447-.15-.553-.85-1-1-4.552 0-.057.471-3-1-.596-.298-1.404.298-2 0-.422-.21-.578-.79-1-1-.298-.15-.684.105-1 0-.707-.236-1.293-.764-2-1-.632-.21-1.367.21-2 0-7.243-2.414 1.577.288-3-2-.298-.15-.684.105-1 0-.707-.236-1.293-.764-2-1-.632-.21-1.404.298-2 0-.422-.21-.578-.79-1-1-.63-.315-4.37.315-5 0-.422-.21-.578-.79-1-1-.596-.298-1.404.298-2 0-.843-.422-1.157-1.578-2-2-.596-.298-1.404.298-2 0-.422-.21-.578-.79-1-1-.304-.152-2.55 0-3 0h-6c-.333 0-1 .333-1 0s1-.333 1 0c0 .471-.79.578-1 1-.15.298.236.764 0 1-.471.471-1.404-.298-2 0a2.28 2.28 0 0 0-1 1c-.15.298.065.673 0 1-.27 1.348-.667 2.667-1 4z" fill="#55dc88" transform="translate(-747.778 -285)"/>
					<path d="M1205 302h-82c-.667 0-1.367-.21-2 0-.447.15-.578.79-1 1-.298.15-.684-.105-1 0-.707.236-1.293.764-2 1-.316.105-.702-.15-1 0-.422.21-.578.79-1 1-.298.15-.702-.15-1 0-.422.21-.578.79-1 1-.397.198-2.796-.204-3 0-.236.236.236.764 0 1s-.702-.15-1 0c-4.162 2.08 1.069-.069-1 2-.236.236-.764-.236-1 0s.15.702 0 1c-.21.422-.79.578-1 1-.15.298.236.764 0 1s-.764-.236-1 0c-.471.471.298 1.404 0 2-.21.422-.79.578-1 1-.15.298.105.684 0 1-.236.707-.764 1.293-1 2-.105.316.236.764 0 1s-.85-.298-1 0c-.31.621.249 5.004 0 6-.18.723-.82 1.277-1 2-.162.647.162 1.353 0 2-.18.723-.82 1.277-1 2-.162.647.162 1.353 0 2-.18.723-.82 1.277-1 2-.242.97.316 2.051 0 3-.236.707-.764 1.293-1 2-.105.316.236.764 0 1s-.85-.298-1 0c-.423.846.356 3.931 0 5-2.414 7.243.288-1.577-2 3-.298.596.298 1.404 0 2-.21.422-.667.667-1 1 0 .667.21 1.368 0 2-.298.894-1.578 1.157-2 2-.112.224 0 3.762 0 4v11c0 1-.316 2.051 0 3 .15.447.79.578 1 1 .15.298-.236.764 0 1s.764-.236 1 0c.471.471-.471 1.529 0 2 .236.236.764-.236 1 0s-.15.702 0 1c.21.422.79.578 1 1 .298.596-.298 1.404 0 2 .21.422.667.667 1 1 .333.333.578.79 1 1 .263.131 3.477 0 4 0 .45 0 2.696.152 3 0 .422-.21.578-.79 1-1 .596-.298 1.529.471 2 0 .236-.236-.236-.764 0-1 .471-.471 1.404.298 2 0 .422-.21.578-.79 1-1 .298-.15.702.15 1 0 .843-.422 1.157-1.578 2-2 .298-.15.702.15 1 0 .422-.21.578-.79 1-1 .298-.15.764.236 1 0s-.236-.764 0-1c.204-.204 2.603.198 3 0 .422-.21.578-.79 1-1 .298-.15.702.15 1 0 .422-.21.578-.79 1-1 .596-.298 1.404.298 2 0 .422-.21.578-.79 1-1 .362-.18 4.304 0 5 0h6c.667 0 1.404-.298 2 0 .298.15-.236.764 0 1 .471.471 1.367-.21 2 0 1.816.605 1.856.856 3 2 .333.333.578.79 1 1 .298.15.702-.15 1 0 .886.443 2.09 2.393 3 3 .62.413 1.293.764 2 1 1.241.414 1.09-.82 2 1 .15.298-.15.702 0 1 .096.191 3.809 3.904 4 4 1.38.69.894-1.211 2 1 .298.596-.298 1.404 0 2 .92 1.841 2.08.159 3 2 .15.298-.15.702 0 1 .21.422.79.578 1 1 .298.596-.21 1.368 0 2 .236.707.764 1.293 1 2 .105.316-.15.702 0 1 .21.422.79.578 1 1 .15.298-.15.702 0 1 .21.422.79.578 1 1 .317.634-.325 4.35 0 5 .21.422.85.553 1 1 .19.569 0 4.058 0 5v2c0 .333.333 1 0 1s0-.667 0-1v-1c0-2.345-.236.471 1-2 .15-.298-.236-.764 0-1s.85.298 1 0c.298-.596-.298-1.404 0-2 .15-.298.764.236 1 0 .471-.471-.21-1.368 0-2 .605-1.816.856-1.856 2-3 2.054-2.054.176.295 1-3 .162-.649 2.575-5.363 3-6 .262-.392.739-.608 1-1 .827-1.24 1.173-2.76 2-4 .262-.392.79-.578 1-1 .15-.298 0-.667 0-1 .333-.667.587-1.38 1-2 1.282-1.923 1.718-.077 3-2 1.15-1.724 1-1.512 1-3 0-.333-.15-.702 0-1 .21-.422.739-.608 1-1 .413-.62.473-1.473 1-2 .236-.236.702.15 1 0 .422-.21.667-.667 1-1 .333-.333.79-.578 1-1 .15-.298-.15-.702 0-1 .21-.422.79-.578 1-1 .298-.596-.471-1.529 0-2 .236-.236.764.236 1 0 .471-.471-.471-1.529 0-2 .236-.236.764.236 1 0s-.236-.764 0-1 .764.236 1 0-.236-.764 0-1 .764.236 1 0c2.069-2.069-3.162.08 1-2 .298-.15.764.236 1 0s-.15-.702 0-1c.422-.843 1.578-1.157 2-2 .298-.596-.298-1.404 0-2 2.08-4.162-.069 1.069 2-1 .471-.471-.298-1.404 0-2 2.08-4.162-.069 1.069 2-1 .236-.236 0-.667 0-1v-1c0-.709-.13-5.741 0-6 .21-.422.79-.578 1-1 .18-.362 0-4.304 0-5v-19c0-.333-.15-.702 0-1 .21-.422.79-.578 1-1 .15-.298-.15-.702 0-1 .21-.422.79-.578 1-1 .314-.629-.314-3.371 0-4 .21-.422.79-.578 1-1 .298-.596-.298-1.404 0-2 .21-.422.79-.578 1-1 .298-.596-.298-1.404 0-2 .21-.422.79-.578 1-1 .152-.304 0-2.55 0-3" fill="#49e584" transform="translate(-747.778 -285)"/>
					<path d="M1190 453v-12c0-.667.162-1.353 0-2-.725-2.9-.78-1.17-2-3-.827-1.24-1.173-2.76-2-4-.262-.392-.739-.608-1-1-.827-1.24-1.106-2.807-2-4-.566-.754-1.333-1.333-2-2-1-1-1.869-2.151-3-3-.962-.721-2.062-1.25-3-2-.736-.589-1.246-1.434-2-2-.596-.447-1.333-.667-2-1-1.333-.667-2.787-1.134-4-2-1.15-.822-1.914-2.095-3-3-2.658-2.215-3.888-2.222-7-4-1.044-.596-1.895-1.527-3-2-1.263-.541-2.857-.238-4-1-1-.667-1.077-2.23-2-3-1.145-.954-2.667-1.333-4-2-.667-.333-1.308-.723-2-1-.979-.391-2.021-.609-3-1-.692-.277-1.277-.82-2-1-.647-.162-1.346.13-2 0-1.034-.207-1.986-.71-3-1-2.643-.755-5.426-1.035-8-2-1.396-.523-2.604-1.477-4-2-1.287-.483-2.679-.622-4-1-1.014-.29-1.96-.827-3-1-1.973-.329-4.039.392-6 0-.73-.146-1.277-.82-2-1-.647-.162-1.353.162-2 0-.723-.18-1.277-.82-2-1-.647-.162-1.333 0-2 0h-10c-.871 0-5.63-.185-6 0-.422.21-.578.79-1 1-.298.15-.667 0-1 0-.667 0-1.367-.21-2 0-2.01.67.01 2.33-2 3-.632.21-1.367-.21-2 0-.447.15-.578.79-1 1-.298.15-.702-.15-1 0-.534.267-2.474 2.474-3 3l-1 1c-.333.333-.79.578-1 1-.15.298.236.764 0 1-.68.68-1.989-1.022-3 1-.15.298 0 .667 0 1-.333.667-.587 1.38-1 2-.262.392-.79.578-1 1-.298.596.298 1.404 0 2-.21.422-.79.578-1 1-.15.298.15.702 0 1-.21.422-.79.578-1 1-.15.298.105.684 0 1-.236.707-.764 1.293-1 2-.105.316 0 .667 0 1v45c0 .894-.16 4.681 0 5 .21.422.79.578 1 1 .15.298-.15.702 0 1 .21.422.79.578 1 1 .298.596-.21 1.368 0 2 .236.707.764 1.293 1 2 .354 1.063-.354 2.937 0 4 .15.447.79.578 1 1 .15.298-.15.702 0 1 .21.422.85.553 1 1 .21.632-.298 1.404 0 2 .15.298.764-.236 1 0s-.15.702 0 1c.21.422.85.553 1 1 .152.457-.223 3.555 0 4 .422.843 1.578 1.157 2 2 .325.65-.317 4.366 0 5 .21.422.79.578 1 1 .315.63-.315 4.37 0 5 .267.534 2.474 2.474 3 3 .526.526 2.466 2.733 3 3 .298.15.702-.15 1 0 .422.21.578.79 1 1 .304.152 2.55 0 3 0h32c.667 0 1.404-.298 2 0 .843.422 1.216 1.477 2 2 .277.185.667 0 1 0 .849 0 5.449-.184 6 0 .447.15.578.79 1 1 .298.15.684-.105 1 0 .707.236 1.293.764 2 1 .316.105.764-.236 1 0 1.333 1.333-1.667 1 1 1 .667 0 1.367-.21 2 0 .89.297 2.11 2.703 3 3 .632.21 1.404-.298 2 0 .298.15-.236.764 0 1s.684-.105 1 0c.707.236 1.38.587 2 1 .784.523 1.157 1.578 2 2 1.38.69.894-1.211 2 1 .69 1.38-1.211.894 1 2 .298.15.702-.15 1 0 .422.21.578.79 1 1 .298.15.702-.15 1 0 2.211 1.106.31.62 1 2 .133.266 2.735 2.867 3 3 .596.298 1.404-.298 2 0 4.162 2.08-1.069-.069 1 2 .236.236.764-.236 1 0s-.236.764 0 1 .764-.236 1 0c2.069 2.069-3.162-.08 1 2 .137.068 5.863.068 6 0 .422-.21.578-.79 1-1 .298-.15.764.236 1 0s-.236-.764 0-1 .702.15 1 0c.422-.21.578-.79 1-1 .298-.15.702.15 1 0 .422-.21.578-.79 1-1 .397-.198 2.796.204 3 0 2.069-2.069-3.162.08 1-2 .298-.15.702.15 1 0 .422-.21.608-.739 1-1 .62-.413 1.38-.587 2-1 .392-.261.578-.79 1-1 .298-.15.764.236 1 0 2.069-2.069-3.162.08 1-2 .298-.15.702.15 1 0 .843-.422 1.157-1.578 2-2 .298-.15.764.236 1 0 .68-.68-1.022-1.989 1-3 .298-.15.702.15 1 0 .422-.21.578-.79 1-1 .298-.15.764.236 1 0s-.15-.702 0-1c.422-.843 1.477-1.216 2-2 2.203-.504.529-2.057 1-3 2.288-4.577-.414 4.243 2-3 .21-.632-.21-1.368 0-2 .236-.707.764-1.293 1-2 .105-.316-.236-.764 0-1 2.667-2.667-.333 3 1-1 .236-.707.764-1.293 1-2 .188-.564 0-2.343 0-3v-5c0-.45.152-2.696 0-3-.422-.843-1.578-1.157-2-2-.198-.396.204-2.796 0-3-.236-.236-.764.236-1 0s.15-.702 0-1c-.21-.422-.79-.578-1-1-.298-.596.21-1.368 0-2-.236-.707-.764-1.293-1-2-.105-.316.236-.764 0-1s-.764.236-1 0c-.471-.471.298-1.404 0-2-.21-.422-.79-.578-1-1-.15-.298.15-.702 0-1-.21-.422-.79-.578-1-1-.132-.263 0-3.477 0-4v-6c0-.667-.13-1.346 0-2 .27-1.348.667-2.667 1-4z" fill="#00c54a" transform="translate(-747.778 -285)"/>
				</pattern>
			</defs>
			<circle r="90" stroke="#1ed660" strokeWidth="12"/>
			<g id={props.animate ? 'record-label' : ''}>
			<circle r="60" stroke="#1ed660" fill="#191414" strokeWidth="2.5"/>
			<circle r="25" fill={patternURL}/>
			<circle r="5" stroke="#fff"/>
		</g>
			<g strokeLinejoin="round" stroke="#60de8f">
				<path d="M42.813-82.723h3.355v78.261h-3.355z" strokeWidth="1.8"/>
				<path d="M40.633-13.593h8.015V4.01h-8.015z" strokeWidth="2.076"/>
			</g>
		</svg>

	)
}
const SettingsCard = () => {
	const classes = useStyles()
	return(
		<Paper className={classes.hostCard}>
			<div className={classes.titleContainer}>
				<SvgIcon component={AppLogo}/> 
				<Typography variant="h5" className={classes.title} color='primary'>TrnTable</Typography>
			</div>
			<Divider/>
			<Box p={3}>
				<Typography variant="h4" className={classes.hostTitle}>
					Host a Session
				</Typography>
				<Typography color="textSecondary" className={classes.desc}>
						Login to setup a TrnTable playlist. This will create a spotify playlist and let your viewers: request music and vote on currently playing music.  
				</Typography>
				<Box className={classes.login}>
					<Typography color='textPrimary'>Let's Get Started</Typography>
					<Button variant="outlined" onClick={props.handleLogin} size="small" color="primary" className={classes.loginButton}>
						Login
					</Button>
				</Box>
			</Box>
		</Paper>
	)
}

export default function HostCard(props){
	const classes = useStyles()
	console.log(props)
	return(
		<Paper className={classes.hostCard}>
			<div className={classes.titleContainer}>
				<SvgIcon component={AppLogo}/> 
				<Typography variant="h5" className={classes.title} color='primary'>TrnTable</Typography>
			</div>
			<Divider/>
			<Box p={3}>
				<Typography variant="h4" className={classes.hostTitle}>
					Host a Session
				</Typography>
				<Typography color="textSecondary" className={classes.desc}>
						Login to setup a TrnTable playlist. This will create a spotify playlist and let your viewers: request music and vote on currently playing music.  
				</Typography>
				<Box className={classes.login}>
					<Typography color='textPrimary'>Let's Get Started</Typography>
					<Button variant="outlined" onClick={props.handleLogin} size="small" color="primary" className={classes.loginButton}>
						Login
					</Button>
				</Box>
			</Box>
		</Paper>
	)
	
}