import { Track } from "./Model/Track";

export class SpotifyService{
    readonly SPOTIFY_API_URL = 'https://jukebox-2952e.firebaseapp.com';

    constructor(){}

    getTrackObjects = (tracks: any[]) => {
        console.log('Getting Track objects -->', tracks)
        if(tracks){
            var trackObjs = tracks.map(track => {
                return new Track(track.id, track.name, track.album, track.album.images[0].url, track.artists.map((artist: {name: string}) => artist.name).join(", "))
            })
            return trackObjs
        }
    }

    getTrackObject = (track: {}) => {
        return this.getTrackObjects([track])[0]
    }

    search = async (query: string) => {
        return fetch(`${this.SPOTIFY_API_URL}/search?q=${query}`)
                                .then(res => res.json())
                                .then(res => this.getTrackObjects(res.body.tracks.items))
    }

}