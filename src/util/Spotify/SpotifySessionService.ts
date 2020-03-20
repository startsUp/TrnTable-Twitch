import { Track } from "./Model/Track"
import { Request, RequestType } from "./Model/Request"
import { SpotifyService } from "./SpotifyService"
import * as SpotifyWebApi from 'spotify-web-api-js'
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
        public spotifyService: SpotifyService,
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

    pollNowPlaying = (call: Function, makeCall: Function, callback: Function, errback: Function, timeout: number) => {
        var endTime = Number(new Date()) + (timeout || 2000);
        var t = null;
        var interval = 3000;
        var prevData = null;
        var checkNowPlaying = (retries: number) => {
            console.log('Making Call (Polling)')
            makeCall(call, [], 
                (data: any) => {
                    console.log('Got data -> ', data)
                    callback(data)
                    if (!data){
                        interval = Math.round(Math.random()*10000) + 5000
                        t = setTimeout(checkNowPlaying, interval)
                    }
                    else{
                        prevData = data;
                        
                        // TODO: increase interval if data returned is the same (user isn't changing songs manually)
                        // TODO: decrease interval if data returned is different (user might be changing songs)
                        interval = 3000
                        t = setTimeout(checkNowPlaying, interval)
                    }
                },
                (err: any) => {
                    console.log('Got error -> ', err)
                    console.log('clearing timeout')
                    clearTimeout(t)
                    if (Number(new Date()) > endTime){
                        errback(new Error('Timed Out'))
                    }
                    else{
                        errback(new Error(err))
                    }
                }
            )
        }
        console.log('Starting Poll, polling every 1 sec')
        checkNowPlaying(1);
        // t = 
        return () => clearTimeout(t)
    }

    stopListeningForSongRequests = () => {
       if (this.songRequestCallback){
           this.twitch.unlisten(this.songRequestTopic, this.songRequestCallback)
       }
    }
}