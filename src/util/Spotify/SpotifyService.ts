import { Track } from "./Model/Track";

export class SpotifyService{
    readonly SPOTIFY_API_URL = 'https://jukebox-2952e.firebaseapp.com';

    constructor(){}

    getTrackObjects = (tracks: any[]) => {
        if(tracks){
            var trackObjs = tracks.map(track => {
                if (track){
                    return new Track(track.id, track.name, track.album, track.album.images[0].url, track.artists.map((artist: {name: string}) => artist.name).join(", "))
                }
                else{
                    return null
                }
            })
            return trackObjs
        }
    }

    getTrackObject = (track: {}) => {
        return this.getTrackObjects([track])[0]
    }

    getUserPlaylists = (makeCall: Function, userPlaylistCall: Function, options: any) => {
        return new Promise((resolve, reject) => {
            makeCall(userPlaylistCall, [options], 
                (data: any) => {
                    resolve(data)
                },
                (err: any) => {
                    reject({msg: 'Failed to fetch playlists'})
                })
        })
    }

    search = async (query: string) => {
        return fetch(`${this.SPOTIFY_API_URL}/search?q=${query}`)
                                .then(res => res.json())
                                .then(res => this.getTrackObjects(res.body.tracks.items))
    }

}