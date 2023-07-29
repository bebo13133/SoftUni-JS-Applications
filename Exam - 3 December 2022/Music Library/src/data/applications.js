import { post,get } from "./api.js";

const endpoint = {
    application: '/data/likes',
    byId: albumId => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    byIdAndUserId: (albumId,userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function getBook(albumId) {
    return post(endpoint.application, { albumId })
}
export async function getApplication(albumId){
    return get(endpoint.byId(albumId))
}
export async function getUserApplication(albumId, userId){
    return get(endpoint.byIdAndUserId(albumId,userId))
}