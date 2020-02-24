import { Track } from "./Model/Track"

type PubsubSend = (target: string, contentType: string, message: (object | string)) => any
type PubsubListener = (target: string, callback: PubsubSend) => Promise<any>

export class SpotifySessionService{
    
    public songRequestCallback: PubsubSend
    public songRequestTopic: string

    constructor(
        public twitch: {
            send: PubsubSend,
            listen: PubsubListener
            unlisten: PubsubListener
        },
        public id: string // may be null for viewers that opt out of sharing identity
     ){
        console.warn('--> ID', id)
        this.songRequestTopic = `whisper-${id}`
     }

    clearPlaylist = () => {
        
    }
     
    addTracks = () => {}
    
    send = (track: Track) => {
        this.twitch.send(this.songRequestTopic, "application/json", JSON.stringify(track))
    }

    listenForSongRequests = (callback: PubsubSend) => {
        console.warn('Listening to requests on --> ', this.songRequestTopic)
        if (!this.songRequestCallback){
            this.songRequestCallback = callback
            try {
                this.twitch.listen(this.songRequestTopic, callback)
            } catch (error) {
                console.error(error)
            }
        }
    }

    stopListeningForSongRequests = () => {
       if (this.songRequestCallback){
           this.twitch.unlisten(this.songRequestTopic, this.songRequestCallback)
       }
    }
}