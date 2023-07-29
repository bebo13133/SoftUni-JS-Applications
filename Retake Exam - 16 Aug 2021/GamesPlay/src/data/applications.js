import { post,get } from "./api.js";

const endpoint = {
    post: '/data/comments',
    byId: gameId => `/data/comments?where=gameId%3D%22${gameId}%22`,
    // byIdAndUserId: (petId,userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}


export async function getByGameId(petId) {
    return get(endpoint.byId(petId))
}
export async function postComment(comment){
    return post(endpoint.byId(endpoint.post,comment))
}
// export async function getUserApplication(petId, userId){
//     return get(endpoint.byIdAndUserId(petId,userId))
// }