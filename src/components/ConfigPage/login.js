import React from 'react'
import HostCard from './hostCard'
import { useAuth } from '../../auth/auth-context';


export default function Login(props){
	const auth = useAuth()
	return (<HostCard handleLogin={auth.thirdPartyLogin.spotify.login} {...props}/>)
}
