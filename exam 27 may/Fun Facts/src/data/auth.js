import { deleteUserData, setUserData } from '../util.js';
import { post, get } from './api.js'

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',

}

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    // console.log(result)
    setUserData(result)
}
export async function register(email, password) {
    const result = await post(endpoints.register, { email, password });
    setUserData(result)
}
export async function logOut() {
    get(endpoints.logout)
    deleteUserData()

}