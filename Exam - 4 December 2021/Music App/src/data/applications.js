import { post,get } from "./api.js";

const endpoint = {
    application: '/data/donation',
    byId: petId => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    byIdAndUserId: (petId,userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function donate(petId) {
    return post(endpoint.application, { petId })
}
export async function getApplication(petId){
    return get(endpoint.byId(petId))
}
export async function getUserApplication(petId, userId){
    return get(endpoint.byIdAndUserId(petId,userId))
}