import { SpotifySessionService, PubsubSend } from "./SpotifySessionService"
import { SpotifyService } from "./SpotifyService"
const spotifyData = require('./spotify-data.test.json')
const sendMock = jest.fn((target: string, contentType: string, message: (object | string)) => {})
const listenMock = jest.fn((target: string, callback: PubsubSend) => {})
const unlistenMock = jest.fn((target: string, callback: PubsubSend) => {})
const twitch = {
    send: sendMock,
    listen: listenMock,
    unlisten: unlistenMock
}

const channelId = '90761526'
var sessionService = new SpotifySessionService(twitch, channelId)
const makeCallMock = jest.fn(async (f, args, onSuccess, onError) =>{
    f(...args)
    .then(
        (data: any) => {
            onSuccess(data)
        },
        (err: any) => {
            onError(err)
        }
    )
})
var apiMock = null;

beforeEach(() => {
    jest.useFakeTimers() // mock setTimeout to test poll
    apiMock = jest.fn()
        .mockImplementationOnce(() => { 
            return {
                then: (data, err) => {
                    data(spotifyData.now_playing_track_playing_first)
                }
            }
        })
        .mockImplementationOnce(() => {
            return {
                then: (data, err) => {
                    data(spotifyData.now_playing_track_playing_second)
                }
            }
        })
})

test('Should be able to create a session service instance', () => {
    expect(sessionService).toBeDefined()
})


test('Callback and timeouts should be called when polling', () => {
    // TODO: Test Polling Function - pollNowPlaying
    
    var callback = jest.fn((data) => console.log('Data Recieved'))
    var stop = sessionService.pollApi(apiMock, makeCallMock, callback, () => {}, 3000);
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledTimes(1)
})



test('Callback should receieve the correct data', () => {
    
    var callback = jest.fn((data) => console.log('Data Recieved'))
    var stop = sessionService.pollApi(apiMock, makeCallMock, callback, () => {}, 3000);
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0].id).toBe(spotifyData.now_playing_track_playing_first.item.id)
})

test('Polling should happen in intervals of 3000 for changing songs', () => {
    
    var callback = jest.fn((data) => console.log('Data Recieved'))
    var stop = sessionService.pollApi(apiMock, makeCallMock, callback, () => {}, 3000);
    
    jest.advanceTimersByTime(3000)
    expect(callback).toHaveBeenCalledTimes(2)
})