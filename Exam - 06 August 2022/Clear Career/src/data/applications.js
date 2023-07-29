import { post,get } from "./api.js";

const endpoint = {
    application: '/data/applications',
    byId: offerId => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    byIdAndUserId: (offerId,userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function apply(offerId) {
    return post(endpoint.application, { offerId })
}
export async function getApplication(offerID){
    return get(endpoint.byId(offerID))
}
export async function getUserApplication(offerID, userId){
    return get(endpoint.byIdAndUserId(offerID,userId))
}