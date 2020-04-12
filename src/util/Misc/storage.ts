class StorageService {
  save(key:string, value:object|string){
    let saveValue = JSON.stringify(value) 
    localStorage.setItem(key, saveValue)
  }
  get(key:string){
    return localStorage.getItem(key)
  } 
}