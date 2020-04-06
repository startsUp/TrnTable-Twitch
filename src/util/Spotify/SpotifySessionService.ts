import { Track } from "./Model/Track"
import { PubSubMessage, PubSubMessageType } from "../Twitch/Model/PubSubMessage"
import { SpotifyService } from "./SpotifyService"
import * as SpotifyWebApi from 'spotify-web-api-js'
import { UserSettings } from "../../components/ConfigPage/model/UserSettings"
import { debounce } from '../Misc/debounce'
import { VoteType, Vote } from "./Model/Vote"

export type PubsubSend = (target: string, contentType: string, message: (object | string)) => any
export type PubsubListener = (target: string, callback: PubsubSend) => void

export class SpotifySessionService{
    
    public pubSubCallback: PubsubSend
    public pubSubTopic: string
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
        this.pubSubTopic = `whisper-${id}`
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
                body: JSON.stringify(new PubSubMessage(track, PubSubMessageType.TRACK)) // body data type must match "Content-Type" header
            })
            .then(res => success(track))
            .catch(err => error(err))
        }
			
    }

    parsePubSubMessage = (target: string, contentType: string, message: (object | string)) : PubSubMessage => {
        let req = JSON.parse(message.toString())
        return new PubSubMessage(req.content, req.type)
    }   
     
    listenForPubSubMessages = (callback: (req: PubSubMessage) => any) => {
        var pubSubCallback = (t, c, m) => {
            callback(this.parsePubSubMessage(t, c, m))
        }
        this.twitch.listen(this.pubSubTopic, pubSubCallback)
        return () => this.twitch.unlisten(this.pubSubTopic, pubSubCallback)
    }

    listenForBroadcasts = (callback: (msg: PubSubMessage) => any) => {
        let cb: PubsubSend = (t, c, m) => {
            callback(this.parsePubSubMessage(t, c, m))
        }
        this.twitch.listen("broadcast", cb)
        return () => this.twitch.unlisten("broadcast", cb)
    }
    /**
     * Sends Pub sub message to the specified target or if target not specified, broadcasts it
     */
    sendPubSubMessage = (message: PubSubMessage, target?: string) => {
        if (target) {
            this.twitch.send(target, this.jsonType, JSON.stringify(message))
        }
        else
            this.twitch.send("broadcast", this.jsonType, JSON.stringify(message))
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

    sendVote = debounce((vote: Vote, onSuccess: Function, onError: Function) => {
        console.warn('Sending Vote:', vote)
        fetch(`${this.EBS_API}/vote/${this.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': this.jsonType,
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(new PubSubMessage(vote, PubSubMessageType.VOTE)) // body data type must match "Content-Type" header
        })
        .then(res => onSuccess())
        .catch(err => onError(err))
    },(Math.random()*500)+3000 /*Timeout*/, false)

    broadcastSettingsUpdate = (userSettings: UserSettings, updateTwice: boolean) => {
        this.sendPubSubMessage(new PubSubMessage(userSettings,PubSubMessageType.SETTINGS))
        if(updateTwice)
            setTimeout(() => this.broadcastSettingsUpdate(userSettings, false), 300)
    }
}