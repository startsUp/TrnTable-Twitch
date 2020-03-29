import { Track } from "./Model/Track"
import { PubSubMessage } from "../Twitch/Model/PubSubMessage"
import { SpotifyService } from "./SpotifyService"
import * as SpotifyWebApi from 'spotify-web-api-js'
export type PubsubSend = (target: string, contentType: string, message: (object | string)) => any
export type PubsubListener = (target: string, callback: PubsubSend) => void

export class SpotifySessionService{
    
    public songRequestCallback: PubsubSend
    public songRequestTopic: string
    readonly EBS_API  =  'https://us-central1-trntable-twitch.cloudfunctions.net/api'
    readonly jsonType = 'application/json'
    constructor(
        public twitch: {
            send: PubsubSend,
            listen: PubsubListener
            unlisten: PubsubListener
        },
        public id: string,// may be null for viewers that opt out of sharing identity,
        public spotifyService: SpotifyService = new SpotifyService(),
     ){
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
                    'Content-Type': this.jsonType,
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(new PubSubMessage(track)) // body data type must match "Content-Type" header
            })
            .then(res => success(track))
            .catch(err => error(err))
        }
			
    }

    parsePubSubMessage = (target: string, contentType: string, message: (object | string)) : PubSubMessage<any> => {
        let req = JSON.parse(message.toString())
        return new PubSubMessage(req.content)
    }   
     
    listenForSongRequests = (callback: (req: PubSubMessage<any>) => any) => {
        if (!this.songRequestCallback){
            this.songRequestCallback = (t, c, m) => {
                callback(this.parsePubSubMessage(t, c, m))
            }
            this.twitch.listen(this.songRequestTopic, this.songRequestCallback)
        }
    }

    /**
     * Sends Pub sub message to the specified target or if target not specified, broadcasts it
     */
    sendPubSubMessage = (message: PubSubMessage<any>, target?: string) => {
        if (target) {
            this.twitch.send(target, this.jsonType, JSON.stringify(message.content))
        }
        else
            this.twitch.send("broadcast", this.jsonType, JSON.stringify(message.content))
    }
    
    pollApi = (call: () => Promise<any>, makeCall: ((apiCall: () => Promise<any>, args: Array<any>, onData: Function, onErr: Function) => void), callback: (track: (Track | null)) => any, errback: Function, timeout: number) => {
        var endTime = Number(new Date()) + (timeout || 2000);
        var t = null;
        var interval = 3000;
        var prevTrack: Track = null;
        var poll = (retries: number) => {
            makeCall(call, [], 
                (data: any) => {
                    
                    callback(data.item ? this.spotifyService.getTrackObject(data.item) : null)
                    if (!data || !data.is_playing ){
                        // delay poll
                        interval = Math.round(Math.random()*10000) + 5000
                        t = setTimeout(poll, interval)
                    }
                    else{
                        let curTrack = this.spotifyService.getTrackObject(data.item)
                        let interval = 3000
                        // increase interval if track is same (user isn't changing songs manually)
                        if (curTrack && prevTrack && curTrack.id === prevTrack.id)
                            interval = 5500
                        
                        // if (curTrack && prevTrack && curTrack.id !== prevTrack.id)    // decrease interval if data returned is different (user might be changing songs)
                        //     interval = 2000

                        prevTrack = curTrack
                        t = setTimeout(poll, interval)
                    }
                },
                (err: any) => {
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
        poll(1);
        // t = 
        return () => clearTimeout(t)
    }

    stopListeningForSongRequests = () => {
       if (this.songRequestCallback){
           this.twitch.unlisten(this.songRequestTopic, this.songRequestCallback)
       }
    }
}