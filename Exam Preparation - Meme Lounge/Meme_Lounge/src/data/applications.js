import { post,get } from "./api.js";

const endpoint = {
    application: '/data/donation',
    byId: userId => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    byIdAndUserId: (petId,userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function donate(petId) {
    return post(endpoint.application, { petId })
}
export async function getApplication(userId){
    return get(endpoint.byId(userId))
}
export async function getUserApplication(petId, userId){
    return get(endpoint.byIdAndUserId(petId,userId))
}