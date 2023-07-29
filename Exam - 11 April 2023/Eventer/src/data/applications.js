import { post,get } from "./api.js";

const endpoint = {
    application: '/data/going',
    byId: eventId => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    byIdAndUserId: (eventId,userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function getBook(eventId) {
    return post(endpoint.application, { eventId })
}
export async function getApplication(eventId){
    return get(endpoint.byId(eventId))
}
export async function getUserApplication(eventId, userId){
    return get(endpoint.byIdAndUserId(eventId,userId))
}