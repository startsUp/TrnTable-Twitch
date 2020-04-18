import * as React from 'react'
import { Snackbar } from  '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
export class Toast {
   
    constructor(
        public severity: 'success' | 'info' | 'error' | 'warning',
        public message: string,
        public time: number = 2000,
        public show: boolean = true,
    ){}
}
export const HIDE_TOAST = new Toast('info', '', 0, false)

const Alert  = (props: any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
export const ToastNotification = (props: {toast: Toast, onClose: Function}) => {
    const toast = props.toast
    return(
        <Snackbar open={toast.show} autoHideDuration={toast.time} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity={toast.severity}>
                {toast.message}
            </Alert>
        </Snackbar>
    )
}