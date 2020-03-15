import { Track } from "./Model/Track"
import { Request } from "./Model/Request"
import { SpotifyService } from "./SpotifyService"

type PubsubSend = (target: string, contentType: string, message: (object | string)) => any
type PubsubListener = (target: string, callback: PubsubSend) => Promise<any>

export class SpotifySessionService{
    
    public songRequestCallback: PubsubSend
    public songRequestTopic: string
    readonly EBS_API  =  'https://us-central1-trntable-twitch.cloudfunctions.net/api'

    constructor(
        public twitch: {
            send: PubsubSend,
            listen: PubsubListener
            unlisten: PubsubListener
        },
        public id: string,// may be null for viewers that opt out of sharing identity,
        public spotifyService: SpotifyService
     ){
        console.warn('--> ID', id)
        this.songRequestTopic = `whisper-${id}`
     }

    clearPlaylist = () => {
        
    }
     
    addTracks = () => {}
    
    sendSongRequest = (track: Track, success: Function,  error: Function) => {
        if (track){
            console.warn('requesting track =', track)
            fetch(`${this.EBS_API}/request/${this.id}`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(new Request('track', track)) // body data type must match "Content-Type" header
            })
            .then(res => success(track))
            .catch(err => error(err))
        }
			
    }

    listenForSongRequests = (callback: PubsubSend) => {
        console.warn('Listening to requests on --> ', this.songRequestTopic)
        if (!this.songRequestCallback){
            this.songRequestCallback = callback
            this.twitch.listen(this.songRequestTopic, (t,c,m) => {
                this.songRequestCallback(t, c, m)
            })
        }
    }

    stopListeningForSongRequests = () => {
       if (this.songRequestCallback){
           this.twitch.unlisten(this.songRequestTopic, this.songRequestCallback)
       }
    }
}