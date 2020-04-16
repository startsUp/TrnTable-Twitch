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

  getRequestedAmount(){
    var list = this.getRequestSongsList()
    return list.length
  }

  getRequestSongsList(): any[]{
    return this.getOrDefault(REQUESTED_SONGS_KEY, [])
  }

  hasSongBeenRequested(trackId: string){
    var list = this.getRequestSongsList()
    return list.includes(trackId)
  }

  removeRequestedSong(trackId: string){
    var list = this.getRequestSongsList()
    var newList = list.filter(id => id !== trackId)
    this.save(REQUESTED_SONGS_KEY, newList)
  }

  addRequestedSong(trackId: string){
    var list = this.getRequestSongsList()
    list.push(trackId)
    this.save(REQUESTED_SONGS_KEY, list)
  }
}