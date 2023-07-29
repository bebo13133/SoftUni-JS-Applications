import { post,get } from "./api.js";

const endpoint = {
    application: '/data/likes',
    byId: factId => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    byIdAndUserId: (factId,userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function getBook(factId) {
    return post(endpoint.application, { factId })
}
export async function getApplication(factId){
    return get(endpoint.byId(factId))
}
export async function getUserApplication(factId, userId){
    return get(endpoint.byIdAndUserId(factId,userId))
}