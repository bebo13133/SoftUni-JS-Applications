import { get, post } from "./api.js";
const endpoint = {
    'login': '/users/login',
    'logout': '/users/logout',
    'register': '/users/register'
}

export async function login(email,password){
    const user  =await post(endpoint.login, {email,password})
    localStorage.setItem('user',JSON.stringify(user))

}
export async function logout(){
    get(endpoint.logout) // не await-ваме защото може да върне грешка  
    localStorage.removeItem('user') // задължително чистим за да забием приложнието 
    
}
export async function register(email,password){
    const user = await post(endpoint.register,{email, password})
    localStorage.setItem('user', JSON.stringify(user))
    
}