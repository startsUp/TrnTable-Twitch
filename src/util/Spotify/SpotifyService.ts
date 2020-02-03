
export class SpotifyService{
    readonly SPOTIFY_API_URL = 'https://jukebox-2952e.firebaseapp.com';
    tokens: {}
    constructor(){}

    handleLogin = () => {
        this.popupCenter(`${this.SPOTIFY_API_URL}/login`, 'Spotify Auth', 350, 550);
    }

    search = async (query: string) => {
        return fetch(`${this.SPOTIFY_API_URL}/search?q=${query}`)
								.then(res => res.json())
					
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
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
        
        // Puts focus on the newWindow
        //  if (window.focus) newWindow.focus();
        window.addEventListener('message', event => {
            // IMPORTANT: check the origin of the data! 
            if (event.origin.startsWith('https://trntable.live')) { 
                    // The data was sent from your site.
                    // Data sent with postMessage is stored in event.data:
                    newWindow.close()
                    this.tokens = event.data
            } else {
                    // The data was NOT sent from your site! 
                    // Be careful! Do not use it. This else branch is
                    // here just for clarity, you usually shouldn't need it.
                    return; 
            } 
        }); 
    }
}