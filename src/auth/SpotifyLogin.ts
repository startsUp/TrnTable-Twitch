
export class SpotifyLogin{
    readonly SPOTIFY_AUTH_URL = 'https://jukebox-2952e.firebaseapp.com';
    tokens: {}
    constructor(){}

    handleLogin = (callback: Function) => {
        var newWindow = this.popupCenter(`${this.SPOTIFY_AUTH_URL}/login?token=${localStorage.getItem('token')}`, 'Spotify Auth', 350, 550);
        var timer = setInterval(function() { 
            if(newWindow.closed) {
                clearInterval(timer);
                callback();
            }
        }, 1000);
    }

    logout = async () => {
        return fetch(`${this.SPOTIFY_AUTH_URL}/reset`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({}) // body data type must match "Content-Type" header
        })
    }
    
    popupCenter = (url: string, title: string, w: number, h: number) => {
        // Fixes dual-screen position  Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

        var systemZoom = width / window.screen.availWidth;
        var left = (width - w) / 2 / systemZoom + dualScreenLeft
        var top = (height - h) / 2 / systemZoom + dualScreenTop
        return window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
    }
}