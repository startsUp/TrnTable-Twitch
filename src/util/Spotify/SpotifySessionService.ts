type PubsubSend = (target: string, contentType: string, message: (object | string)) => any
type PubsubListener = (target: string, callback: PubsubSend) => void 

export class SpotifySessionService{
    
    public songRequestCallback: PubsubSend
    public songRequestTopic: string

    constructor(
        public twitch: {
            send: PubsubSend,
            listen: PubsubListener
            unlisten: PubsubListener
        },
        public channelId: string
     ){
        this.songRequestTopic = `whisper-${channelId}`
     }

    clearPlaylist = () => {
        
    }
     
    addTracks = () => {}
    
    listenForSongRequests = (callback: PubsubSend) => {
        if (!this.songRequestCallback){
            this.songRequestCallback = callback
            this.twitch.listen(this.songRequestTopic, callback)
        }
    }

    stopListeningForSongRequests = () => {
       if (this.songRequestCallback){
           this.twitch.unlisten(this.songRequestTopic, this.songRequestCallback)
       }
    }
}