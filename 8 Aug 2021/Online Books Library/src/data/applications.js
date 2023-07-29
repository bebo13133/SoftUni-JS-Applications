import { post,get } from "./api.js";

const endpoint = {
    application: '/data/likes',
    byId: bookId => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    byIdAndUserId: (bookId,userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function getBook(bookId) {
    return post(endpoint.application, { bookId })
}
export async function getApplication(bookId){
    return get(endpoint.byId(bookId))
}
export async function getUserApplication(bookId, userId){
    return get(endpoint.byIdAndUserId(bookId,userId))
}