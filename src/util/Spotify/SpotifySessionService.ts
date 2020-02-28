import { Track } from "./Model/Track"

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
        public id: string // may be null for viewers that opt out of sharing identity
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
					body: JSON.stringify(track) // body data type must match "Content-Type" header
				})
				.then(res => success(track))
				.catch(err => error(err))
			}
			
    }

    listenForSongRequests = (callback: PubsubSend) => {
        console.warn('Listening to requests on --> ', this.songRequestTopic)
        if (!this.songRequestCallback){
            this.songRequestCallback = callback
            try {
                this.twitch.listen(this.songRequestTopic, (e,c,t) => {
                    console.log(e,c,t)
                })
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