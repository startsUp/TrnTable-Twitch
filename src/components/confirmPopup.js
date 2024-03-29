import React, { Component } from 'react'
import '../App.css'
import {ReactComponent as CloseIcon} from '../res/images/add.svg'

const Divider = props => {
    return(<div className='divider' style={props.customStyle}/>)
}

function ConfirmActionPopup(props){
    return (

        <div className='ca-popup-container'>
            <div className='ca-popup' id='ca-popup-card'>
                <div className='popup-title' id='ca-popup-title'>
                    <div> 
                        {props.popupInfo.title} 
                    </div>
                    <Divider customStyle={{width:'90%', margin:'0'}}/>
                    {!props.popupInfo.modal &&
                        <CloseIcon style={{transform: 'rotate(45deg)'}} 
                                onClick={props.popupInfo.close} 
                                className='popup-close-icon' 
                                id='ca-popup-close-icon'/> 
                    }
                </div>
                <div className='ca-popup-message'>
                    {props.popupInfo.message}
                </div>
                <div id='ca-popup-action'>
                    <div className='popup-button' id='ca-popup-button' onClick={props.popupInfo.onAccept}>{props.popupInfo.accept}</div>
                    {props.popupInfo.deny && <div className='popup-button' 
                        id='ca-popup-button' onClick={props.popupInfo.onDeny}>{props.popupInfo.deny}</div>}
                </div>
            </div>
            
        </div>
            
    )
}
export default ConfirmActionPopup
