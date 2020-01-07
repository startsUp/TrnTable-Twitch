import React, { Component } from 'react'
import '../App.css'

function Header(props){

return (
        <div className='header-container'>
            <div className='header-content'>
                {props.content}
            </div>        
        </div>
    )
}
export default Header
