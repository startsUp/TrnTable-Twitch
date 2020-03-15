import { Track } from "./Model/Track"
import { Request, RequestType } from "./Model/Request"
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
                body: JSON.stringify(new Request(RequestType.TRACK, track)) // body data type must match "Content-Type" header
            })
            .then(res => success(track))
            .catch(err => error(err))
        }
			
    }

    parseRequest = (target: string, contentType: string, message: (object | string)) : Request => {
        let req = JSON.parse(message.toString())
        return new Request(req.type, req.content)
    }   
     
    listenForSongRequests = (callback: (req: Request) => any) => {
        console.warn('Listening to requests on --> ', this.songRequestTopic)
        if (!this.songRequestCallback){
            this.songRequestCallback = (t, c, m) => {
                callback(this.parseRequest(t, c, m))
            }
            this.twitch.listen(this.songRequestTopic, this.songRequestCallback)
        }
    }

    stopListeningForSongRequests = () => {
       if (this.songRequestCallback){
           this.twitch.unlisten(this.songRequestTopic, this.songRequestCallback)
       }
    }
}