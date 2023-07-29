
const dataName = 'userData'

export function getUserData(){
    return JSON.parse(sessionStorage.getItem(dataName))
}
export function setUserData(data){
    return sessionStorage.setItem(dataName,JSON.stringify(data))
    
}
export function deleteUserData(){
  sessionStorage.removeItem(dataName)
}
export function createSubmitHandler(callback){
  return function (event){
    event.preventDefault()
        const form= event.currentTarget
        const formData = new FormData(form)
        const data  = Object.fromEntries(formData.entries())
        callback(data,form)
  }

}