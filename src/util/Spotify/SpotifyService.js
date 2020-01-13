
const SPOTIFY_API_URL = 'https://jukebox-2952e.firebaseapp.com';
export default class SpotifyService{
    
    constructor(){}

    search(query){
        return fetch(`${SPOTIFY_API_URL}/search?q=${query}`)
								.then(res => res.json())
					
    }
}