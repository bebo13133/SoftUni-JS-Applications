import { get, post } from "./api.js";
const endpoint = {
    'login': '/users/login',
    'logout': '/users/logout',
    'register': '/users/register',
   

}

export async function login(data){
    const user  =await post(endpoint.login, data)
    localStorage.setItem('user',JSON.stringify(user))

}
export async function logout(){
    get(endpoint.logout) // не await-ваме защото може да върне грешка  
    localStorage.removeItem('user') // задължително чистим за да нe забием приложнието 
    
}
export async function register(data){
    const user = await post(endpoint.register,data)
    localStorage.setItem('user', JSON.stringify(user))
    
}