export const REQUESTED_AMOUNT_KEY = 'reqA'

export const REQUESTED_SONGS_KEY = 'reqS'


export class StorageService {

  clear(){
    localStorage.clear()
  }

  save(key:string, value:object|string){
    let saveValue = typeof value === 'string' ? `"${value}"` : JSON.stringify(value) 
    localStorage.setItem(key, saveValue)
  }
  get(key:string){
    let res = localStorage.getItem(key)
    if (res)
      return JSON.parse(res)
    else return null
  }

  getOrDefault(key: string, defaultValue: any){
    let res = this.get(key)
    if (res) return res
    else return defaultValue
  }

  getRequestedAmount(channelId: string){
    var list = this.getRequestSongsList(channelId)
    return list.length
  }

  getRequestSongsList(channelId: string): any[]{
    return this.getOrDefault(REQUESTED_SONGS_KEY+channelId, [])
  }

  hasSongBeenRequested(trackId: string, channelId: string){
    var list = this.getRequestSongsList(channelId)
    return list.includes(trackId)
  }

  removeRequestedSong(trackId: string, channelId: string){
    var list = this.getRequestSongsList(channelId)
    var newList = list.filter(id => id !== trackId)
    this.save(REQUESTED_SONGS_KEY+channelId, newList)
  }

  addRequestedSong(trackId: string, channelId: string){
    var list = this.getRequestSongsList(channelId)
    list.push(trackId)
    this.save(REQUESTED_SONGS_KEY+channelId, list)
  }
}